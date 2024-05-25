using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Exceptions;
using server.Services;
using server.Services.Interfaces;

namespace server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DeliveryController : Controller
    {
        private readonly IDeliveryService _deliveryService;

        public DeliveryController(IDeliveryService deliveryService)
        {
            _deliveryService = deliveryService;
        }

        [HttpGet]
        [Authorize]
        [Route("GetAllDeliveries")]
        public async Task<IActionResult> GetAllDeliveries()
        {
            var deliveries = await _deliveryService.GetAllDeliveriesAsync();

            return Ok(deliveries);
        }

        [HttpGet]
        [Authorize]
        [Route("GetDeliveryById")]
        public async Task<IActionResult> GetDeliveryById(int id)
        {
            var delivery = await _deliveryService.GetDeliveryAsync(id);

            if (delivery == null)
            {
                throw new NotFound404Exception("No delivery by given Id");
            }

            return Ok(delivery);
        }

        [HttpPut]
        [Authorize]
        [Route("UpdateDelivery")]
        public async Task<IActionResult> UpdateDelivery(DeliveryDto deliveryDto)
        {
            if (deliveryDto == null)
            {
                throw new BadRequest400Exception("Delivery data cannot be null");
            }

            if (await _deliveryService.GetDeliveryAsync(deliveryDto.Id) == null)
            {
                throw new InternalServerError500Exception("No delivery by given Id");
            }

            if (!await _deliveryService.UpdateDeliveryAsync(deliveryDto))
            {
                throw new InternalServerError500Exception("Something went wrong while saving");
            }

            return Ok("Successfully updated");
        }

        [HttpPost]
        [Authorize]
        [Route("CreateDelivery")]
        public async Task<IActionResult> CreateDelivery(DeliveryDto deliveryDto)
        {
            if (deliveryDto == null)
            {
                throw new BadRequest400Exception("Delivery data cannot be null");
            }

            if (!await _deliveryService.CreateDeliveryAsync(deliveryDto))
            {
                throw new InternalServerError500Exception("Something went wrong while saving");
            }

            return Ok("Successfully created");
        }

        [HttpDelete]
        [Authorize]
        [Route("DeleteDelivery")]
        public async Task<IActionResult> DeleteDelivery(int id)
        {
            if (await _deliveryService.GetDeliveryAsync(id) == null)
            {
                throw new InternalServerError500Exception("No delivery with given Id");
            }
            if (!await _deliveryService.DeleteDeliveryAsync(id))
            {
                throw new NotFound404Exception("Something went wrong while saving");
            }

            return Ok("Successfully deleted");
        }
    }
}
