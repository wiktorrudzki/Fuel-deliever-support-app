using Data.Models;

namespace server.Services.Interfaces
{
    public interface IDriverService
    {
        Task<DriverDto> GetDriverAsync(int id);
        Task<IEnumerable<DriverDto>> GetAllDriversAsync();
    }
}
