using AutoMapper;
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
        private readonly IDeliveryService _obsoleteDeliveryService;
        private readonly ICleanDeliveryService _deliveryService;
        private readonly IMapper _mapper;

        public DeliveryController(IDeliveryService obsoleteDeliveryService, ICleanDeliveryService deliveryService, IMapper mapper)
        {
            _obsoleteDeliveryService = obsoleteDeliveryService;
            _deliveryService = deliveryService;
            _mapper = mapper;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(CreateDeliveryDto dto)
        {
            var delivery = await _deliveryService.CreateAsync(dto);

            var res = _mapper.Map<DeliveryDto>(delivery);

            return Created(nameof(GetOne), res);
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            var deliveries = await _deliveryService.GetAllAsync();

            var res = _mapper.Map<List<DeliveryDto>>(deliveries);

            return Ok(res);
        }

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var delivery = await _deliveryService.GetOneAsync(id);

            var res = _mapper.Map<DeliveryDto>(delivery);

            return Ok(res);
        }

        [HttpPatch]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Update(int id, UpdateDeliveryDto dto)
        {
            var delivery = await _deliveryService.UpdateAsync(id, dto);

            var res = _mapper.Map<DeliveryDto>(delivery);

            return Ok(res);
        }

        [HttpDelete]
        [Authorize]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _deliveryService.DeleteAsync(id);

            return NoContent();
        }
        
        #region Obsolete endpoints
        [HttpGet]
        [Authorize]
        [Route("GetAllDeliveries")]
        [Obsolete]
        public async Task<IActionResult> GetAllDeliveries()
        {
            var deliveries = await _obsoleteDeliveryService.GetAllDeliveriesAsync();

            return Ok(deliveries);
        }

        [HttpGet]
        [Authorize]
        [Route("GetDeliveryById")]
        [Obsolete]
        public async Task<IActionResult> GetDeliveryById(int id)
        {
            var delivery = await _obsoleteDeliveryService.GetDeliveryAsync(id);

            if (delivery == null)
            {
                throw new NotFound404Exception("No delivery by given Id");
            }

            return Ok(delivery);
        }

        [HttpPut]
        [Authorize]
        [Route("UpdateDelivery")]
        [Obsolete]
        public async Task<IActionResult> UpdateDelivery(DeliveryDto deliveryDto)
        {
            if (deliveryDto == null)
            {
                throw new BadRequest400Exception("Delivery data cannot be null");
            }

            if (await _obsoleteDeliveryService.GetDeliveryAsync(deliveryDto.Id) == null)
            {
                throw new InternalServerError500Exception("No delivery by given Id");
            }

            if (!await _obsoleteDeliveryService.UpdateDeliveryAsync(deliveryDto))
            {
                throw new InternalServerError500Exception("Something went wrong while saving");
            }

            return Ok("Successfully updated");
        }

        [HttpPost]
        [Authorize]
        [Route("CreateDelivery")]
        [Obsolete]
        public async Task<IActionResult> CreateDelivery(DeliveryDto deliveryDto)
        {
            if (deliveryDto == null)
            {
                throw new BadRequest400Exception("Delivery data cannot be null");
            }

            if (!await _obsoleteDeliveryService.CreateDeliveryAsync(deliveryDto))
            {
                throw new InternalServerError500Exception("Something went wrong while saving");
            }

            return Ok("Successfully created");
        }

        [HttpDelete]
        [Authorize]
        [Route("DeleteDelivery")]
        [Obsolete]
        public async Task<IActionResult> DeleteDelivery(int id)
        {
            if (await _obsoleteDeliveryService.GetDeliveryAsync(id) == null)
            {
                throw new InternalServerError500Exception("No delivery with given Id");
            }
            if (!await _obsoleteDeliveryService.DeleteDeliveryAsync(id))
            {
                throw new NotFound404Exception("Something went wrong while saving");
            }

            return Ok("Successfully deleted");
        }
        #endregion
    }
}
