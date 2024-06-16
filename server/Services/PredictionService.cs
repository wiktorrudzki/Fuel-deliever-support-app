using AutoMapper;
using Data;
using Data.Entities;
using Data.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using server.Exceptions;
using server.Services.Interfaces;

namespace server.Services
{
    public class PredictionService : IPredictionService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;

        public PredictionService(AppDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DeliveryPredictionDto>> GetAllPredictionsAsync()
        {
            var predictions = await _dbContext.DeliveriesPrediction
                 .AsNoTracking()
                 .ToListAsync();

            var predictionsDto = _mapper.Map<List<DeliveryPredictionDto>>(predictions);

            return predictionsDto;
        }

        public async Task<DeliveryPredictionDto> GetPredictionAsync(int id)
        {
            var prediction = await _dbContext.DeliveriesPrediction
                .AsNoTracking()
                .FirstOrDefaultAsync(dp => dp.StationId == id);

            if (prediction is null)
            {
                throw new NotFound404Exception("Prediction not found!");
            }

            var predictionDto = _mapper.Map<DeliveryPredictionDto>(prediction);

            return predictionDto;
        }

        public async Task<List<DeliveryPredictionEntity>> GetAll(GetDeliveryPredictionQuery queryParams)
        {
            var query = _dbContext.DeliveriesPrediction.AsQueryable();

            if (queryParams.StationId != null)
            {
                query = query.Where(e => e.StationId == queryParams.StationId);
            }

            var predictions = await query.OrderByDescending(e => e.Id).AsNoTracking().ToListAsync();

            return predictions;
        }
    }
}
