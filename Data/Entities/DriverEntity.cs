using Microsoft.EntityFrameworkCore;

namespace Data.Entities
{
    public class DriverEntity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Station { get; set; }
        public List<DeliveryEntity>? Delivery { get; set; }
    }
}
