using Data.Models;

namespace server.Services.Interfaces
{
    public interface IAuthService
    {
        public string GenerateToken(LoginUserDto loginUserDto);
    }
}