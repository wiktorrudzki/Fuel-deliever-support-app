using Data.Models;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
        [Route("GetUserById")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var userDto = await _userService.GetUserAsync(id);

            if (userDto == null)
            {
                throw new NotFound404Exception("No user by given Id");
            }

            return Ok(userDto);
        }

        [HttpPost]
        [Authorize]
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
