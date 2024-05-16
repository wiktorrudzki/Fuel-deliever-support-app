using Data.Models;

namespace server.Services.Interfaces
{
    public interface IDeliveryService
    {
        Task<DeliveryDto> GetDeliveryAsync(int id);
        Task<IEnumerable<DeliveryDto>> GetAllDeliveriesAsync();
        Task<bool> UpdateDeliveryAsync(DeliveryDto delivery);
        Task<bool> CreateDeliveryAsync(DeliveryDto delivery);
        Task<bool> DeleteDeliveryAsync(int id);

    }
}
