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
                    CreateStation("Station A"),
                    CreateStation("Station B"),
                    CreateStation("Station C")
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
                    CreateDriver("Bob", "Station C")
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
                    CreateUser( "Bob", "Johnson", "bob.johnson@example.com", "securepass789")
                };

                _dbContext.Users.AddRange(users);
                _dbContext.SaveChanges();
            }

            var driversFromDb = _dbContext.Drivers.ToList();
            var stationsFromDb = _dbContext.Stations.ToList();

            if (!_dbContext.Deliveries.Any())
            {
                var deliveries = new[]
                {
                    CreateDelivery(1000, 1500, 800, 1200, DateTime.Now, driversFromDb[0].Id, stationsFromDb[0].Id),
                    CreateDelivery(1000, 1500, 800, 1200, DateTime.Now, driversFromDb[1].Id, stationsFromDb[1].Id),
                    CreateDelivery(1000, 1500, 800, 1200, DateTime.Now, driversFromDb[2].Id, stationsFromDb[2].Id)
                };
                _dbContext.Deliveries.AddRange(deliveries);
            }
            if (!_dbContext.DeliveriesPrediction.Any())
            {
                var deliveryPredictions = new[]
                {
                    CreateDeliveryPrediction(DateTime.Now.AddHours(3), 2000, 2500, 1800, 2200,  stationsFromDb[0].Id),
                    CreateDeliveryPrediction(DateTime.Now.AddHours(3), 2000, 2500, 1800, 2200,  stationsFromDb[1].Id),
                    CreateDeliveryPrediction(DateTime.Now.AddHours(3), 2000, 2500, 1800, 2200,  stationsFromDb[2].Id)
                };
                _dbContext.DeliveriesPrediction.AddRange(deliveryPredictions);

            }
            if (!_dbContext.StationsCapacity.Any())
            {
                var stationCapacities = new[]
                {
                    CreateStationCapacity(5000, 6000, 4000, 5500, stationsFromDb[0].Id),
                    CreateStationCapacity(5000, 6000, 4000, 5500, stationsFromDb[1].Id),
                    CreateStationCapacity(5000, 6000, 4000, 5500, stationsFromDb[2].Id)
                };
                _dbContext.StationsCapacity.AddRange(stationCapacities);
            }
            if (!_dbContext.CurrentFuelVolume.Any())
            {
                var currentFuelVolumes = new[]
                {
                    CreateCurrentFuelVolume(3000, 3500, 2500, 3200, stationsFromDb[0].Id),
                    CreateCurrentFuelVolume(3000, 3500, 2500, 3200, stationsFromDb[1].Id),
                    CreateCurrentFuelVolume(3000, 3500, 2500, 3200, stationsFromDb[2].Id)
                };
                _dbContext.CurrentFuelVolume.AddRange(currentFuelVolumes);
            }
            _dbContext.SaveChanges();

            
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
        private StationEntity CreateStation(string name)
        {
            return new StationEntity {Name = name };
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

