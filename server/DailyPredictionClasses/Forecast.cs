using System.Text.Json.Serialization;

namespace server.DailyPredictionClasses
{
    public class Forecast
    {
        [JsonPropertyName("Date")]
        public DateOnly Date { get; set; }
        [JsonPropertyName("Forecast")]
        public List<Fuel> fuels { get; set; }

    }
}
