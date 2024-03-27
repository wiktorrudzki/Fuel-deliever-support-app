namespace Data.Entities
{
    public class StationEntity
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<DeliveryEntity>? Deliveries { get; set; }
        public DeliveryPredictionEntity? DeliveryPrediction { get; set; }
        public StationCapacityEntity? StationCapacity { get; set; }
        public CurrentFuelVolumeEntity? CurrentFuelVolume { get; set; }
    }
}
