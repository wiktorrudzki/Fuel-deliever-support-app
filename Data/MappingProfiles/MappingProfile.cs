using AutoMapper;
using Data.Entities;
using Data.Models;

namespace Data.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        { 
            CreateMap<UserEntity, UserDto>().ReverseMap();
            CreateMap<CurrentFuelVolumeEntity, CurrentFuelVolumeDto>().ReverseMap();
            CreateMap<DeliveryEntity, DeliveryDto>().ReverseMap();
            CreateMap<DeliveryEntity, CreateDeliveryDto>().ReverseMap();
            CreateMap<DeliveryEntity, UpdateDeliveryDto>().ReverseMap();
            CreateMap<DeliveryPredictionEntity, DeliveryPredictionDto>().ReverseMap();
            CreateMap<StationCapacityEntity, StationCapacityDto>().ReverseMap();
            CreateMap<StationEntity, StationDto>().ReverseMap();
            CreateMap<DriverEntity, DriverDto>().ReverseMap();
        }
    }
}