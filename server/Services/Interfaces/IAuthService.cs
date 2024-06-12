using Data.Models;

namespace server.Services.Interfaces
{
    public interface IAuthService
    {
        public UserWithTokenDto GenerateToken(LoginUserDto loginUserDto);
    }
}