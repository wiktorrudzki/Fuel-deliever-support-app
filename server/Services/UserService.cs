using AutoMapper;
using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using server.Services.Interfaces;

namespace server.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public UserService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Task<UserDto> CreateUserAsync(UserDto userDto)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDto> GetUserAsync(int id)
        {
            var user = await _dbContext
                .Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }
    }
}
