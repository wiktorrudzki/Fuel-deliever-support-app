using Data.Models;

namespace server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> LoginAsync(UserDto userDto); // Is it correct?
    }
}
