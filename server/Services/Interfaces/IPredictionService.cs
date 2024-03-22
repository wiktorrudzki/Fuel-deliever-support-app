using Data.Models;

namespace server.Services.Interfaces
{
    public interface IPredictionService
    {
        Task<IEnumerable<DeliveryPredictionDto>> GetAllPredictionsAsync();
    }
}
