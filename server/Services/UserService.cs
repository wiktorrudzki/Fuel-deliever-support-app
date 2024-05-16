using AutoMapper;
using Data;
using Data.Entities;
using Data.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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

        public async Task<bool> CreateUserAsync(UserDto userDto)
        {
            var userEntity = _mapper.Map<UserEntity>(userDto);
            await _dbContext.AddAsync(userEntity);
            
            return await Save();
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

        public async Task<bool> Save()
        {
            var saved = await _dbContext.SaveChangesAsync();
            return saved > 0 ? true : false;
        }
    }
}
