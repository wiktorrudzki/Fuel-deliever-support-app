namespace Data.Models
{
    public class StationDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public StationCapacityDto? StationCapacity { get; set; }
        public CurrentFuelVolumeDto? CurrentFuelVolume { get; set; }
    }
}
