namespace Data.Models;

public record CreateDeliveryDto(int Pb95, int Diesel, int Pb98, int TurboDiesel, DateTime DepartureTime, int DriverId, int StationId);