using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("GetAsync")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var userDto = await _userService.GetUserAsync(id);

            return StatusCode(StatusCodes.Status200OK, userDto);
        }
    }
}
