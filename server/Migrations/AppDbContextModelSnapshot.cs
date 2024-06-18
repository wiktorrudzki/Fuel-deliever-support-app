﻿// <auto-generated />
using System;
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Data.Entities.AuthEntity", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("Login")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Auth");
                });

            modelBuilder.Entity("Data.Entities.CurrentFuelVolumeEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Diesel")
                        .HasColumnType("int");

                    b.Property<int>("Pb95")
                        .HasColumnType("int");

                    b.Property<int>("Pb98")
                        .HasColumnType("int");

                    b.Property<int>("StationId")
                        .HasColumnType("int");

                    b.Property<int>("TurboDiesel")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StationId")
                        .IsUnique();

                    b.ToTable("CurrentFuelVolume");
                });

            modelBuilder.Entity("Data.Entities.DeliveryEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DepartureTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Diesel")
                        .HasColumnType("int");

                    b.Property<int>("DriverId")
                        .HasColumnType("int");

                    b.Property<int>("Pb95")
                        .HasColumnType("int");

                    b.Property<int>("Pb98")
                        .HasColumnType("int");

                    b.Property<int>("StationId")
                        .HasColumnType("int");

                    b.Property<int>("TurboDiesel")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DriverId");

                    b.HasIndex("StationId");

                    b.ToTable("Deliveries");
                });

            modelBuilder.Entity("Data.Entities.DeliveryPredictionEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DepartureTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Diesel")
                        .HasColumnType("int");

                    b.Property<int>("Pb95")
                        .HasColumnType("int");

                    b.Property<int>("Pb98")
                        .HasColumnType("int");

                    b.Property<int>("StationId")
                        .HasColumnType("int");

                    b.Property<int>("TurboDiesel")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StationId");

                    b.ToTable("DeliveriesPrediction");
                });

            modelBuilder.Entity("Data.Entities.DriverEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Station")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("Data.Entities.StationCapacityEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Diesel")
                        .HasColumnType("int");

                    b.Property<int>("Pb95")
                        .HasColumnType("int");

                    b.Property<int>("Pb98")
                        .HasColumnType("int");

                    b.Property<int>("StationId")
                        .HasColumnType("int");

                    b.Property<int>("TurboDiesel")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("StationId")
                        .IsUnique();

                    b.ToTable("StationsCapacity");
                });

            modelBuilder.Entity("Data.Entities.StationEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MapURL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Owner")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Stations");
                });

            modelBuilder.Entity("Data.Entities.UserEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Data.Entities.AuthEntity", b =>
                {
                    b.HasOne("Data.Entities.UserEntity", "User")
                        .WithOne("Auth")
                        .HasForeignKey("Data.Entities.AuthEntity", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Data.Entities.CurrentFuelVolumeEntity", b =>
                {
                    b.HasOne("Data.Entities.StationEntity", "Station")
                        .WithOne("CurrentFuelVolume")
                        .HasForeignKey("Data.Entities.CurrentFuelVolumeEntity", "StationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Station");
                });

            modelBuilder.Entity("Data.Entities.DeliveryEntity", b =>
                {
                    b.HasOne("Data.Entities.DriverEntity", "Driver")
                        .WithMany("Delivery")
                        .HasForeignKey("DriverId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Data.Entities.StationEntity", "Station")
                        .WithMany("Deliveries")
                        .HasForeignKey("StationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Driver");

                    b.Navigation("Station");
                });

            modelBuilder.Entity("Data.Entities.DeliveryPredictionEntity", b =>
                {
                    b.HasOne("Data.Entities.StationEntity", "Station")
                        .WithMany("DeliveryPrediction")
                        .HasForeignKey("StationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Station");
                });

            modelBuilder.Entity("Data.Entities.StationCapacityEntity", b =>
                {
                    b.HasOne("Data.Entities.StationEntity", "Station")
                        .WithOne("StationCapacity")
                        .HasForeignKey("Data.Entities.StationCapacityEntity", "StationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Station");
                });

            modelBuilder.Entity("Data.Entities.DriverEntity", b =>
                {
                    b.Navigation("Delivery");
                });

            modelBuilder.Entity("Data.Entities.StationEntity", b =>
                {
                    b.Navigation("CurrentFuelVolume");

                    b.Navigation("Deliveries");

                    b.Navigation("DeliveryPrediction");

                    b.Navigation("StationCapacity");
                });

            modelBuilder.Entity("Data.Entities.UserEntity", b =>
                {
                    b.Navigation("Auth");
                });
#pragma warning restore 612, 618
        }
    }
}
