using Data.Models;
using Microsoft.AspNetCore.Mvc;
using server.Exceptions;
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

            return Ok(userDto);
        }

        [HttpPost]
        [Route("CreateUser")]
        public async Task<IActionResult> CreateUser(UserDto userDto)
        {
            if (userDto == null)
            {
                throw new BadRequest400Exception("User data cannot be null");
            }

            if (!await _userService.CreateUserAsync(userDto))
            {
                throw new InternalServerError500Exception("Something went wrong while saving");
            }

            return Ok("Successfully created");
        }
    }
}
