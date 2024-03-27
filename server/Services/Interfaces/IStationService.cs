using Data.Models;

namespace server.Services.Interfaces
{
    public interface IStationService
    {
        Task<StationDto> GetStationAsync(int id);
        Task<IEnumerable<StationDto>> GetAllStationsAsync();
    }
}
