using System.Text.Json.Serialization;

namespace server.DailyPredictionClasses
{
    public class Raport
    {
        [JsonPropertyName("StationId")]
        public int stationID;
        [JsonPropertyName("LastQuarterlyAverages")]
        public List<mean> means;
        [JsonPropertyName("Forecasts")]
        public List<Forecast> forecasts;



    }
}
