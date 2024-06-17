namespace Data.Models
{
    public class StationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Owner { get; set; }
        public string Address { get; set; }
        public string MapURL { get; set; }
        public StationCapacityDto? StationCapacity { get; set; }
        public CurrentFuelVolumeDto? CurrentFuelVolume { get; set; }
    }
}
