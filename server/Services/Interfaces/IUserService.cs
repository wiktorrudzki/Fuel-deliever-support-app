using Data.Models;

namespace server.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUserAsync(int id);
        Task<bool> CreateUserAsync(UserDto userDto);
    }
}
