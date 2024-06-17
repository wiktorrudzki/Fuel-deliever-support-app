using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entities
{
    public class StationEntity
    {
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Owner { get; set; }
        public string Address { get; set; }
        public string MapURL { get; set; }
        public List<DeliveryEntity>? Deliveries { get; set; }
        public DeliveryPredictionEntity? DeliveryPrediction { get; set; }
        public StationCapacityEntity? StationCapacity { get; set; }
        public CurrentFuelVolumeEntity? CurrentFuelVolume { get; set; }
    }
}
