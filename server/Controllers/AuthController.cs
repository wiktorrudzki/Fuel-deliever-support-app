using Data.Models;
using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;

namespace server.Controllers
{
    public class AuthController:ControllerBase
    {
        public readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
                _authService = authService;
        }
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginUserDto loginUserDto)
        {
            var token = _authService.GenerateToken(loginUserDto);
            return Ok(token);

        }
    }
}
