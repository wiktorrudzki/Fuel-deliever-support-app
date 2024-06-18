using System.Runtime.CompilerServices;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Data
{
    public class Seed
    {
        private readonly AppDbContext _dbContext;
        public Seed(AppDbContext context)
        {
            _dbContext = context;
        }
        public void SeedDataContext()
        {
            //ClearDatabase();
            if (!_dbContext.Stations.Any())
            {
                var stations = new[]
                {
                    CreateStation("Station A","000 000 000", "Jan Kowalski","Sympatyczna 51, 15-686 Białystok", "https://maps.app.goo.gl/bSW9mY4pofVxELM97"),
                    CreateStation("Station B", "111 111 111", "Anna Nowak", "Łączna 43, 68-213 Lipinki Łużyckie", "https://maps.app.goo.gl/yWFJ56YgkgqQyuts5"),
                };
                _dbContext.Stations.AddRange(stations);
                _dbContext.SaveChanges();
            }

            if (!_dbContext.Drivers.Any())
            {
                var drivers = new[]
                {
                    CreateDriver("John", "Station A"),
                    CreateDriver("Alice", "Station B"),
                };
                _dbContext.Drivers.AddRange(drivers);
                _dbContext.SaveChanges();
            }
            
            if (!_dbContext.Users.Any())
            {
                var users = new List<UserEntity>
                {
                    CreateUser( "John", "Doe", "john.doe@example.com", "password123"),
                    CreateUser( "Alice", "Smith", "alice.smith@example.com", "qwerty456"),
                };

                _dbContext.Users.AddRange(users);
                _dbContext.SaveChanges();
            }

            var driversFromDb = _dbContext.Drivers.ToList();
            var stationsFromDb = _dbContext.Stations.ToList();
            
            if (!_dbContext.DeliveriesPrediction.Any())
            {
                var deliveryPredictions = new[]
                {
                    CreateDeliveryPrediction(DateTime.Now.AddHours(3), 2000, 2500, 1800, 2200,  stationsFromDb[0].Id),
                    CreateDeliveryPrediction(DateTime.Now.AddHours(3), 2000, 2500, 1800, 2200,  stationsFromDb[1].Id),
                };
                _dbContext.DeliveriesPrediction.AddRange(deliveryPredictions);

            }
            if (!_dbContext.StationsCapacity.Any())
            {
                var stationCapacities = new[]
                {
                    CreateStationCapacity(5000, 6000, 4000, 5500, stationsFromDb[0].Id),
                    CreateStationCapacity(5000, 6000, 4000, 5500, stationsFromDb[1].Id),
                };
                _dbContext.StationsCapacity.AddRange(stationCapacities);
            }
            if (!_dbContext.CurrentFuelVolume.Any())
            {
                var currentFuelVolumes = new[]
                {
                    CreateCurrentFuelVolume(3000, 3500, 2500, 3200, stationsFromDb[0].Id),
                    CreateCurrentFuelVolume(3000, 3500, 2500, 3200, stationsFromDb[1].Id),
                };
                _dbContext.CurrentFuelVolume.AddRange(currentFuelVolumes);
            }
            _dbContext.SaveChanges();

            if (!_dbContext.Deliveries.Any())
            {
                _dbContext.Database.ExecuteSql(FormattableStringFactory.Create(DeliveriesSeed.InsertStatement));
            }
        }
        private void ClearDatabase()
        {
            _dbContext.Users.RemoveRange(_dbContext.Users);
            _dbContext.Auth.RemoveRange(_dbContext.Auth);
            _dbContext.Stations.RemoveRange(_dbContext.Stations);
            _dbContext.Drivers.RemoveRange(_dbContext.Drivers);
            _dbContext.Deliveries.RemoveRange(_dbContext.Deliveries);
            _dbContext.DeliveriesPrediction.RemoveRange(_dbContext.DeliveriesPrediction);
            _dbContext.StationsCapacity.RemoveRange(_dbContext.StationsCapacity);
            _dbContext.CurrentFuelVolume.RemoveRange(_dbContext.CurrentFuelVolume);
            _dbContext.SaveChanges();
        }
        private UserEntity CreateUser( string name, string lastName, string login, string password)
        {
            return new UserEntity
            {
                Name = name,
                LastName = lastName,
                Auth = new AuthEntity
                {
                    Login = login,
                    Password = password,
                }
            };
        }
        private StationEntity CreateStation(string name, string phoneNumber, string owner, string address, string mapURL)
        {
            return new StationEntity {Name = name , PhoneNumber = phoneNumber, Owner = owner, Address = address, MapURL = mapURL};
        }
        private DriverEntity CreateDriver(string name, string station)
        {
            return new DriverEntity {Name = name, Station = station };
        }

        private DeliveryEntity CreateDelivery(int pb95, int diesel, int pb98, int turboDiesel, DateTime departureTime, int driverId, int stationId)
        {
            return new DeliveryEntity { Pb95 = pb95, Diesel = diesel, Pb98 = pb98, TurboDiesel = turboDiesel, DepartureTime = departureTime, DriverId = driverId, StationId = stationId };
        }

        private DeliveryPredictionEntity CreateDeliveryPrediction(DateTime departureTime, int pb95, int diesel, int pb98, int turboDiesel, int stationId)
        {
            return new DeliveryPredictionEntity { DepartureTime = departureTime, Pb95 = pb95, Diesel = diesel, Pb98 = pb98, TurboDiesel = turboDiesel, StationId = stationId };
        }

        private StationCapacityEntity CreateStationCapacity(int pb95, int diesel, int pb98, int turboDiesel, int stationId)
        {
            return new StationCapacityEntity { Pb95 = pb95, Diesel = diesel, Pb98 = pb98, TurboDiesel = turboDiesel, StationId = stationId };
        }

        private CurrentFuelVolumeEntity CreateCurrentFuelVolume(int pb95, int diesel, int pb98, int turboDiesel, int stationId)
        {
            return new CurrentFuelVolumeEntity { Pb95 = pb95, Diesel = diesel, Pb98 = pb98, TurboDiesel = turboDiesel, StationId = stationId };
        }
    }
}

