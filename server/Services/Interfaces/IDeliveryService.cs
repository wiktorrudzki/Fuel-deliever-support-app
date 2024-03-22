using Data.Models;

namespace server.Services.Interfaces
{
    public interface IDeliveryService
    {
        Task<DeliveryDto> GetDeliveryAsync(int id);
        Task<IEnumerable<DeliveryDto>> GetAllDeliveriesAsync();
        Task<DeliveryDto> UpdateDeliveryAsync(DeliveryDto delivery);
        Task<DeliveryDto> CreateDeliveryAsync(DeliveryDto delivery);
        Task<DeliveryDto> DeleteDeliveryAsync(int id);

    }
}
