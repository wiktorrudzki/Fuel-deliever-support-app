using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<AuthEntity> Auth {  get; set; }
        public DbSet<CurrentFuelVolumeEntity> CurrentFuelVolume { get; set; }
        public DbSet<DeliveryEntity> Deliveries { get; set; }
        public DbSet<DeliveryPredictionEntity> DeliveriesPrediction { get; set; }
        public DbSet<DriverEntity> Drivers { get; set; }
        public DbSet<StationCapacityEntity> StationsCapacity { get; set; }
        public DbSet<StationEntity> Stations { get; set; }
        public DbSet<UserEntity> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            CreateStations(modelBuilder);
            CreateDrivers(modelBuilder);
            CreateUsers(modelBuilder);
            //CreateAuths(modelBuilder);
            CreateCurrentFuelVolume(modelBuilder);
            CreateDeliveries(modelBuilder);
            CreateDeliveryPredictions(modelBuilder);
            CreateStationsCapacity(modelBuilder);
           
        }

        private static void CreateUsers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEntity>(e =>
            {
                e.Property(u => u.Id)
                    .ValueGeneratedOnAdd();
            });
            modelBuilder.Entity<UserEntity>()
               .HasOne(u => u.Auth)       
               .WithOne(a => a.User)      
               .HasForeignKey<AuthEntity>(a => a.UserId);
        }

        private static void CreateCurrentFuelVolume(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CurrentFuelVolumeEntity>(e =>
            {
                e.Property(cf => cf.Id)
                    .ValueGeneratedOnAdd();
            });
        }

        private static void CreateDeliveries(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DeliveryEntity>(e =>
            {
                e.Property(d => d.Id)
                    .ValueGeneratedOnAdd();
            });
        }

        private static void CreateDeliveryPredictions(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DeliveryPredictionEntity>(e =>
            {
                e.Property(dp => dp.Id)
                    .ValueGeneratedOnAdd();
            });
        }

        private static void CreateDrivers(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DriverEntity>(e =>
            {

                e.Property(d => d.Id)
                .UseIdentityColumn();
            });
            
        }

        private static void CreateStationsCapacity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StationCapacityEntity>(e =>
            {
                e.Property(s => s.Id)
                    .ValueGeneratedOnAdd();
            });
        }

        private static void CreateStations(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StationEntity>(e =>
            {
                e.Property(s => s.Id).UseIdentityColumn();
            });
        }

    }
}
