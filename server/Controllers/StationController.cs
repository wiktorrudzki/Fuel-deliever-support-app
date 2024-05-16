using Data.Models;
using Microsoft.AspNetCore.Mvc;
using server.Exceptions;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StationController : Controller
    {
        private readonly IStationService _stationService;

        public StationController(IStationService stationService)
        {
            _stationService = stationService;
        }

        [HttpGet]
        [Route("GetAllStations")]
        public async Task<IActionResult> GetAllStations()
        {
            var stations = await _stationService.GetAllStationsAsync();

            return Ok(stations);
        }

        [HttpGet]
        [Route("GetStationById")]
        public async Task<IActionResult> GetStationById(int id)
        {
            var station = await _stationService.GetStationAsync(id);

            if (station == null)
            {
                throw new NotFound404Exception("No station by given Id");
            }

            return Ok(station);
        }

    }
}

