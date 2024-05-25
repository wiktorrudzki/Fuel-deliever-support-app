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

        public PredictionController(IPredictionService predictionService)
        {
            _predictionService = predictionService;
        }

        [HttpGet]
        [Authorize]
        [Route("GetAllPredictions")]
        public async Task<IActionResult> GetAllPredictions()
        {
            var predictions = await _predictionService.GetAllPredictionsAsync();

            return Ok(predictions);
        }
    }
}
