using AutoMapper;
using Data;
using Data.Entities;
using Data.Models;
using server.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using server.Exceptions;

namespace server.Services;

public class CleanDeliveryService : ICleanDeliveryService
{
    private readonly AppDbContext _dbContext;
    private readonly IMapper _mapper;
    private readonly IDriverService _driverService;
    private readonly IStationService _stationService;

    public CleanDeliveryService(AppDbContext dbContext, IMapper mapper, IDriverService driverService, IStationService stationService)
    {
        _dbContext = dbContext;
        _mapper = mapper;
        _driverService = driverService;
        _stationService = stationService;
    }
    
    public async Task<DeliveryEntity> CreateAsync(CreateDeliveryDto dto)
    {
        await CheckCreation(dto);

        var deliveryEntity = _mapper.Map<DeliveryEntity>(dto);
        var res = await _dbContext.AddAsync(deliveryEntity);
        await _dbContext.SaveChangesAsync();

        return res.Entity;
    }

    public async Task<List<DeliveryEntity>> GetAllAsync()
    {
        var deliveries = await _dbContext.Deliveries
            .AsNoTracking()
            .ToListAsync();

        return deliveries;
    }

    public async Task<DeliveryEntity> GetOneAsync(int id)
    {
        var delivery = await _dbContext.Deliveries
            .FirstOrDefaultAsync(u => u.Id == id);

        if (delivery is null)
        {
            throw new NotFound404Exception("Delivery not found!");
        }

        return delivery;
    }

    public async Task<DeliveryEntity> UpdateAsync(int id, UpdateDeliveryDto dto)
    {
        var delivery = await GetOneAsync(id);

        await CheckRelationsInUpdateAsync(dto);

        Merge(delivery, dto);

        if (dto.DriverId.HasValue || dto.DepartureTime.HasValue)
        {
            await CheckForDeliveryConflictAsync(delivery.DriverId, delivery.DepartureTime);
        }
        
        _dbContext.Update(delivery);
        await _dbContext.SaveChangesAsync();

        return await GetOneAsync(id);
    }

    public async Task DeleteAsync(int id)
    {
        var delivery = await _dbContext.Deliveries
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);

        if (delivery is null)
            return;

        _dbContext.Remove(delivery);
        await _dbContext.SaveChangesAsync();
    }
    
    //IDK why AutoMapper is not working
    private void Merge(DeliveryEntity delivery, UpdateDeliveryDto dto)
    {
        var dtoProperties = dto.GetType().GetProperties();
        var deliveryProperties = delivery.GetType().GetProperties();

        foreach (var dtoProp in dtoProperties)
        {
            var value = dtoProp.GetValue(dto);
            if (value == null) continue;
            
            var deliveryProp = deliveryProperties.FirstOrDefault(p => p.Name == dtoProp.Name);
            if (deliveryProp != null)
            {
                deliveryProp.SetValue(delivery, value);
            }
        }
    }

    private async Task CheckRelationsInUpdateAsync(UpdateDeliveryDto dto)
    {
        if (dto.DriverId.HasValue)
        {
            await _driverService.GetOneAsync(dto.DriverId.Value);
        }
        
        if (dto.StationId.HasValue)
        {
            await _driverService.GetOneAsync(dto.StationId.Value);
        }
    }

    private async Task CheckForDeliveryConflictAsync(int driverId, DateTime dateTime)
    {
        var collision =
            await _dbContext.Deliveries.Where(e => e.DriverId == driverId && e.DepartureTime.Date == dateTime.Date)
                .AnyAsync();

        if (collision)
        {
            throw new Conflict409Exception("The driver runs that day!");
        }
    }

    private async Task CheckCreation(CreateDeliveryDto dto)
    {
        await _driverService.GetOneAsync(dto.DriverId);
        await _stationService.GetOneAsync(dto.StationId);
        await CheckForDeliveryConflictAsync(dto.DriverId, dto.DepartureTime);
    }
}