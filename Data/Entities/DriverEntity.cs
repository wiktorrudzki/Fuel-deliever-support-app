namespace Data.Entities
{
    public class DriverEntity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Station { get; set; }
        public DeliveryEntity? Delivery { get; set; }
    }
}
