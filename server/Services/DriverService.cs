using AutoMapper;
using Data;
using Data.Entities;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using server.Exceptions;
using server.Services.Interfaces;

namespace server.Services
{
    public class DriverService : IDriverService
    {
        public readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        public DriverService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<DriverDto>> GetAllDriversAsync()
        {
            if (_dbContext == null) throw new InternalServerError500Exception("Database instance is not available");
            if (!await _dbContext.Database.CanConnectAsync()) throw new InternalServerError500Exception("Database Connection is not possible");
            var drivers = await _dbContext.Drivers.ToListAsync();
            var driversReturn = _mapper.Map<List<DriverDto>>(drivers);
            return driversReturn;

        }

        public async Task<DriverDto> GetDriverAsync(int id)
        {
            if (_dbContext == null) throw new InternalServerError500Exception("Database instance is not available");
            if (!await _dbContext.Database.CanConnectAsync()) throw new InternalServerError500Exception("Database Connection is not possible");
            var driver = _dbContext.Drivers.FirstOrDefault(d => d.Id == id);
            var driverReturn = _mapper.Map<DriverDto>(driver);
            return driverReturn;

        }


    }
}
