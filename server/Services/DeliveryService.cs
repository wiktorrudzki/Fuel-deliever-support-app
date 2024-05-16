using AutoMapper;
using Data;
using Data.Entities;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using server.Services.Interfaces;

namespace server.Services
{
    public class DeliveryService : IDeliveryService
    {

        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public DeliveryService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DeliveryDto>> GetAllDeliveriesAsync()
        {
            var deliveries = await _dbContext.Deliveries
                .AsNoTracking()
                .ToListAsync();

            var deliveriesDto = _mapper.Map<List<DeliveryDto>>(deliveries);

            return deliveriesDto;
        }

        public async Task<DeliveryDto> GetDeliveryAsync(int id)
        {
            var delivery = await _dbContext.Deliveries
               .AsNoTracking()
               .FirstOrDefaultAsync(u => u.Id == id);

            var deliveryDto = _mapper.Map<DeliveryDto>(delivery);

            return deliveryDto;
        }

        public async Task<bool> UpdateDeliveryAsync(DeliveryDto deliveryDto)
        {
            var delivery = await _dbContext.Deliveries
                    .FirstOrDefaultAsync(i => i.Id == deliveryDto.Id);

            if (delivery == null)
                return false; 

            delivery.Pb95 = deliveryDto.Pb95;
            delivery.Diesel = deliveryDto.Diesel;
            delivery.Pb98 = deliveryDto.Pb98;
            delivery.TurboDiesel = deliveryDto.TurboDiesel;
            delivery.DepartureTime = deliveryDto.DepartureTime;
            delivery.DriverId = deliveryDto.DriverId;
            delivery.StationId = deliveryDto.StationId;

            return await Save();
        }
        public async Task<bool> CreateDeliveryAsync(DeliveryDto delivery)
        {

            var deliveryEntity = new DeliveryEntity
            {
                Pb95 = delivery.Pb95,
                Diesel = delivery.Diesel,
                Pb98 = delivery.Pb98,
                TurboDiesel = delivery.TurboDiesel,
                DepartureTime = delivery.DepartureTime,
                DriverId = delivery.DriverId,
                StationId = delivery.StationId
            };

            await _dbContext.AddAsync(deliveryEntity);

            return await Save();
        }

        public async Task<bool> DeleteDeliveryAsync(int id)
        {
            var delivery = await _dbContext.Deliveries
              .AsNoTracking()
              .FirstOrDefaultAsync(u => u.Id == id);

            if (delivery == null)
                return false;

            _dbContext.Remove(delivery);

            return await Save();
        }

        public async Task<bool> Save()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }
    }
}
