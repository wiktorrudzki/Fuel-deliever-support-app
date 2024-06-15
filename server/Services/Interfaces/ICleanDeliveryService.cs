using Data.Entities;
using Data.Models;

namespace server.Services.Interfaces
{
    public interface ICleanDeliveryService
    {
        Task<DeliveryEntity> CreateAsync(CreateDeliveryDto dto);
        Task<List<DeliveryEntity>> GetAllAsync();
        Task<DeliveryEntity> GetOneAsync(int id);
        Task<DeliveryEntity> UpdateAsync(int id, UpdateDeliveryDto dto);
        Task DeleteAsync(int id);
    }
}