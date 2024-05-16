using AutoMapper;
using Data;
using Data.Entities;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using server.Services.Interfaces;

namespace server.Services
{
    public class StationService : IStationService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public StationService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<StationDto>> GetAllStationsAsync()
        {
            var stations = await _dbContext.Stations
                .AsNoTracking()
                .ToListAsync();

            var stationsDto = _mapper.Map<List<StationDto>>(stations);

            return stationsDto;
        }

        public async Task<StationDto> GetStationAsync(int id)
        {
            var station = await _dbContext.Stations
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id);
            var stationDto = _mapper.Map<StationDto>(station);
            return stationDto;
        }
    }
}
