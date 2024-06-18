namespace server.Services
{
    using Cronos;
    using Data;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Hosting;
    using server.DailyPredictionClasses;
    using System.Threading.Tasks;

    public class BackgroundTaskService : IHostedService, IDisposable
    {
        private Timer _timer;
        private readonly CronExpression _cronExpression = CronExpression.Parse("*/1 * * * *"); // Codziennie o północy (w utc to 22:00 - czas letni czy coś tam)

        public Task StartAsync(CancellationToken cancellationToken)
        {
            ScheduleNextRun(); // Zaplanuj pierwsze uruchomienie
            return Task.CompletedTask;
        }

        private void ScheduleNextRun()
        {
            var utcNow = DateTime.UtcNow; // Pobranie czasu UTC
            var nextOccurrence = _cronExpression.GetNextOccurrence(utcNow);
            if (nextOccurrence.HasValue)
            {
                var delay = nextOccurrence.Value - utcNow;
                _timer = new Timer(DoWork, null, delay, Timeout.InfiniteTimeSpan);
            }
        }

        private async void DoWork(object state)
        {
            Console.WriteLine("Aktualna data i godzina (UTC): " + DateTime.UtcNow); // Wypisanie czasu UTC
            var raports = await Prediction.GetRaportsFromAPIAsync(10);
            //raports.ForEach(r => r.forecasts = r.forecasts.Skip(2).ToList());
            var raportsForChosenDays = Prediction.FindProperDays(raports);
            var entties = Prediction.PrepareDeliveryEntity(raportsForChosenDays);
            foreach ( var e in entties )
            {
                Console.WriteLine(e.StationId+ " " + e.DepartureTime + " " + e.Diesel + " " + e.TurboDiesel + " " + e.Pb95 + " " + e.Pb98);
            }

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseSqlServer("Server=localhost,1433;Database=master;User Id=sa;Password=Password123@!;TrustServerCertificate=True;");
            using (var _dbContext = new AppDbContext(optionsBuilder.Options))
            {
                if (_dbContext.Database.CanConnect())
                {
                    Console.WriteLine("Udało się połączyć z bazą");
                    _dbContext.AddRange(entties);
                    _dbContext.SaveChanges();
                    Console.WriteLine("Dodano rekordy do bazy danych");
                }
                else
                {
                    Console.WriteLine("Nie udało się połączyć z bazą");
                }
            }
            
            ScheduleNextRun();
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0); // Zatrzymanie timera
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose(); // Zwolnienie zasobów timera
        }
    }
}
