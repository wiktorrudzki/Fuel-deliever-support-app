using AutoMapper;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PredictionController : Controller
    {
        private readonly IPredictionService _predictionService;
        private readonly IMapper _mapper; 

        public PredictionController(IPredictionService predictionService, IMapper mapper)
        {
            _predictionService = predictionService;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] GetDeliveryPredictionQuery queryParams)
        {
            var predictions = await _predictionService.GetAll(queryParams);

            var res = _mapper.Map<List<DeliveryPredictionDto>>(predictions);

            return Ok(res);
        }
        
        [HttpGet]
        [Authorize]
        [Obsolete]
        [Route("GetAllPredictions")]
        public async Task<IActionResult> GetAllPredictions()
        {
            var predictions = await _predictionService.GetAllPredictionsAsync();

            return Ok(predictions);
        }
    }
}
