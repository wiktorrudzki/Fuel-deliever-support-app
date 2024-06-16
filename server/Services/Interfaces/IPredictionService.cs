using Data.Entities;
using Data.Models;

namespace server.Services.Interfaces
{
    public interface IPredictionService
    {
        Task<IEnumerable<DeliveryPredictionDto>> GetAllPredictionsAsync();
        Task <DeliveryPredictionDto> GetPredictionAsync(int id);
    }
}
