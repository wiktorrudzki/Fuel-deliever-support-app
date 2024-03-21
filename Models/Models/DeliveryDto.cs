namespace Data.Models
{
    public class DeliveryDto
    {
        public int Id { get; set; }
        public int Pb95 { get; set; }
        public int Diesel { get; set; }
        public int Pb98 { get; set; }
        public int TurboDiesel { get; set; }
        public DateTime DepartureTime { get; set; }
        public int DriverId { get; set; }
        public int StationId { get; set; }
    }
}
