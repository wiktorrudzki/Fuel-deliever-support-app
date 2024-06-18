using Data;
using Data.Entities;
using System.Text.Json;

namespace server.DailyPredictionClasses
{
    public class Prediction
    {
        public static List<Raport> GetRaports()
        {
            var raporty = new List<Raport>()
            {
                new Raport
                {
                    stationID = 0,
                    means = new List<mean>(){
                        new mean(){ nazwa="DK", value=29572},
                        new mean(){ nazwa="ULG95", value=7093 },
                        new mean(){ nazwa="ULTDK", value=153 },
                        new mean(){ nazwa="ULTSU", value=3382}
                    },
                    forecasts = new List<Forecast>
                    {
                        new Forecast(){
                            Date = new DateOnly(2018,11,01),
                            fuels = new List<Fuel> {
                                new Fuel(){ fuelTape="DK",fuelValue=39572.750 },
                                new Fuel(){ fuelTape="ULG95",fuelValue=8093.6227 },
                                new Fuel(){ fuelTape="ULTDK",fuelValue=53.8767 },
                                new Fuel(){ fuelTape="ULTSU",fuelValue=382.8972 }
                                }
                        },
                        new Forecast(){
                            Date = new DateOnly(2018,11,02),
                            fuels = new List<Fuel> {
                                new Fuel(){ fuelTape="DK",fuelValue=49572.750 },
                                new Fuel(){ fuelTape="ULG95",fuelValue=9093.6227 },
                                new Fuel(){ fuelTape="ULTDK",fuelValue = 63.8767 },
                                new Fuel(){ fuelTape="ULTSU",fuelValue =282.8972 }
                                }
                        }

                    }

                },
                new Raport
                {
                    stationID = 1,
                    means = new List<mean>(){
                        new mean(){ nazwa="DK", value=29572},
                        new mean(){ nazwa="ULG95", value=7093 },
                        new mean(){ nazwa="ULTDK", value=153 },
                        new mean(){ nazwa="ULTSU", value=3382}
                    },
                    forecasts = new List<Forecast>
                    {
                        new Forecast(){
                            Date = new DateOnly(2018,11,01),
                            fuels = new List<Fuel> {
                                new Fuel(){ fuelTape="DK",fuelValue=49572.750 },
                                new Fuel(){ fuelTape="ULG95",fuelValue=9093.6227 },
                                new Fuel(){ fuelTape="ULTDK",fuelValue=163.8767 },
                                new Fuel(){ fuelTape="ULTSU",fuelValue=3482.8972 }
                                }
                        },
                        new Forecast(){
                            Date = new DateOnly(2018,11,02),
                            fuels = new List<Fuel> {
                                new Fuel(){ fuelTape="DK",fuelValue=9572.750 },
                                new Fuel(){ fuelTape="ULG95",fuelValue=9097.6227 },
                                new Fuel(){ fuelTape="ULTDK",fuelValue = 73.8767 },
                                new Fuel(){ fuelTape="ULTSU",fuelValue =3482.8972 }
                                }
                        }

                    }

                },

            };

            return raporty;
        }

        public static async Task<List<Raport>> GetRaportsFromAPIAsync(int x)
        {
            using var httpClient = new HttpClient();

            // Tworzenie adresu URL z parametrem x
            var url = $"http://127.0.0.1:5001/forecast/?steps={x}";

            var response = await httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true // Ignorowanie wielkości liter w nazwach pól
            };

            var jsonString = await response.Content.ReadAsStringAsync();

            var raports = new List<Raport>();
            var jsonDocument = JsonDocument.Parse(jsonString);

            foreach (var raportElement in jsonDocument.RootElement.EnumerateArray())
            {
                var raport = new Raport();

                raport.stationID = raportElement.GetProperty("StationId").GetInt32();

                raport.means = raportElement.GetProperty("LastQuarterlyAverages")
                    .EnumerateObject()
                    .Select(prop => new mean
                    {
                        nazwa = prop.Name,
                        value = (int)prop.Value.GetDouble()
                    })
                    .ToList();

                raport.forecasts = raportElement.GetProperty("Forecasts")
                    .EnumerateArray()
                    .Select(forecastElement => new Forecast
                    {
                        Date = DateOnly.Parse(forecastElement.GetProperty("Date").GetString()),
                        fuels = forecastElement.GetProperty("Forecast")
                            .EnumerateObject()
                            .Select(fuelElement => new Fuel
                            {
                                fuelTape = fuelElement.Name,
                                fuelValue = fuelElement.Value.GetDouble()
                            })
                            .ToList()
                    })
                    .ToList();

                raports.Add(raport);


            }

            raports = raports.Select(r =>
            {
                r.forecasts.ForEach(f =>
                {
                    f.fuels.ForEach(fuel =>
                    {
                        if (fuel.fuelValue < 0)
                            fuel.fuelValue = 0;
                    });
                });
                return r;
            }).ToList();


            return raports;



        }


        public static List<ChosenPetrolRaport> FindProperDays(List<Raport> raports)
        {
            var returnList = new List<ChosenPetrolRaport>();
            Forecast returnForecast;

            //należy znaleźć graniczne dni i raporty dla obu stacji
            foreach (var raport in raports)
            {
                var means = raport.means;
                var properForecast = raport.forecasts
                             .OrderBy(f => f.Date)
                              .FirstOrDefault(f => f.fuels.Any(fuel =>
                                means.Any(mean => mean.nazwa == fuel.fuelTape && fuel.fuelValue < mean.value)
                                ));


                var modifiedForecast = FindPetrolsByMeans(means, properForecast);



                if (modifiedForecast != null)
                {
                    returnList.Add(new ChosenPetrolRaport()
                    {
                        stationID = raport.stationID,
                        means = raport.means,
                        forecasts = raport.forecasts,
                        chosenForecast = modifiedForecast
                    });
                }

            }
            return returnList;
        }

        private static Forecast FindPetrolsByMeans(List<mean> means, Forecast? properForecast)
        {
            if (properForecast != null)
            {
                var filteredFuels = properForecast.fuels
                    .Where(fuel => means.Any(mean => mean.nazwa == fuel.fuelTape && fuel.fuelValue < mean.value))
                    .ToList();

                var newForecast = new Forecast
                {
                    Date = properForecast.Date,
                    fuels = filteredFuels
                };



                return newForecast;
            }
            else
            {
                Console.WriteLine("No forecast found with fuel value less than mean value.");
            }

            return null;
        }

        public static bool isOneEnough(Forecast choosenForecast, out Tank tank)
        {
            tank = new Tank() { };
            var magasineMax =
                new List<Fuel>(){
                        new Fuel(){ fuelTape="DK", fuelValue=47500},
                        new Fuel(){ fuelTape="ULG95", fuelValue=47500 },
                        new Fuel(){ fuelTape="ULTDK", fuelValue=19000 },
                        new Fuel(){ fuelTape="ULTSU", fuelValue=28500}
                    };

            //liczymy ile paliwa moglibyśmy wlać żeby zapełnić magazyn
            List<Fuel> doZuzycia = choosenForecast.fuels.Select(f => new Fuel() { fuelTape = f.fuelTape, fuelValue = 0.5 * magasineMax.First(m => m.fuelTape == f.fuelTape).fuelValue - f.fuelValue }).ToList();




            for (int i = 0; i < doZuzycia.Count; i++)
            {

                while (doZuzycia[i].fuelValue != 0 && !tank.allContainersUsed)
                {
                    //szukam najlepszego zbiornika w którym pomieści się paliwo
                    var bestFit = tank.containers.Where(k => k.FuelAmount == 0).Where(k => k.maxValue >= doZuzycia[i].fuelValue).MinBy(k => Math.Abs(k.maxValue - doZuzycia[i].fuelValue));

                    if (bestFit != null) //jeżeli jest takie dopasowanie
                    {

                        bestFit.FuelAmount = doZuzycia[i].fuelValue;//zalewam zbiornik
                        bestFit.FuelType = doZuzycia[i].fuelTape;//ustalam nazwę paliwa w zbiorniku
                        doZuzycia[i].fuelValue = 0;//zeruje paliwo które zostało już wlane

                    }
                    else
                    {
                        //dopasowanie bez konieczności podziału paliwa na kilka zbiorników nie istnieje
                        bestFit = tank.containers.Where(k => k.FuelAmount == 0).Where(k => k.maxValue < doZuzycia[i].fuelValue).MinBy(k => Math.Abs(k.maxValue - doZuzycia[i].fuelValue));
                        bestFit.FuelAmount = bestFit.maxValue; //zapełniam zbiornik na tyle ile mogę
                        bestFit.FuelType = doZuzycia[i].fuelTape;//ustalam nazwę paliwa w zbiorniku
                        doZuzycia[i].fuelValue -= bestFit.FuelAmount;//pomniejszam ilość paliwa konieczną do umieszczenia o umieszczone w zbiorniku paliwo

                    }
                }


                if (doZuzycia.All(f => f.fuelValue == 0) && tank.allContainersUsed)
                {
                    return true;
                }
                else if (!doZuzycia.All(f => f.fuelValue == 0) && tank.allContainersUsed)
                {
                    tank = null;
                    return false;
                }




            }


            if (doZuzycia.All(f => f.fuelValue == 0) && tank.allContainersUsed)
            {
                return true;
            }
            else if (!doZuzycia.All(f => f.fuelValue == 0) && tank.allContainersUsed)
            {
                tank = null;
                return false;
            }
            else if (doZuzycia.All(f => f.fuelValue == 0) && !tank.allContainersUsed)
            {
                return true;
            }


            tank = null;
            return false;

        }


        public static bool isTwoEnough(Forecast choosenForecast, out List<Tank> tank)
        {
            tank = new List<Tank> { new Tank() { } };
            int t = 0;
            var magasineMax =
                new List<Fuel>(){
                        new Fuel(){ fuelTape="DK", fuelValue=47500},
                        new Fuel(){ fuelTape="ULG95", fuelValue=47500 },
                        new Fuel(){ fuelTape="ULTDK", fuelValue=19000 },
                        new Fuel(){ fuelTape="ULTSU", fuelValue=28500}
                    };

            //liczymy ile paliwa moglibyśmy wlać żeby zapełnić magazyn
            List<Fuel> doZuzycia = choosenForecast.fuels.Select(f => new Fuel() { fuelTape = f.fuelTape, fuelValue = 0.5 * magasineMax.First(m => m.fuelTape == f.fuelTape).fuelValue - f.fuelValue }).ToList();




            for (int i = 0; i < doZuzycia.Count; i++)
            {

                while (doZuzycia[i].fuelValue != 0 && !tank[t].allContainersUsed)
                {
                    //szukam najlepszego zbiornika w którym pomieści się paliwo
                    var bestFit = tank[t].containers.Where(k => k.FuelAmount == 0).Where(k => k.maxValue >= doZuzycia[i].fuelValue).MinBy(k => Math.Abs(k.maxValue - doZuzycia[i].fuelValue));

                    if (bestFit != null) //jeżeli jest takie dopasowanie
                    {

                        bestFit.FuelAmount = doZuzycia[i].fuelValue;//zalewam zbiornik
                        bestFit.FuelType = doZuzycia[i].fuelTape;//ustalam nazwę paliwa w zbiorniku
                        doZuzycia[i].fuelValue = 0;//zeruje paliwo które zostało już wlane

                    }
                    else
                    {
                        //dopasowanie bez konieczności podziału paliwa na kilka zbiorników nie istnieje
                        bestFit = tank[t].containers.Where(k => k.FuelAmount == 0).Where(k => k.maxValue < doZuzycia[i].fuelValue).MinBy(k => Math.Abs(k.maxValue - doZuzycia[i].fuelValue));
                        bestFit.FuelAmount = bestFit.maxValue; //zapełniam zbiornik na tyle ile mogę
                        bestFit.FuelType = doZuzycia[i].fuelTape;//ustalam nazwę paliwa w zbiorniku
                        doZuzycia[i].fuelValue -= bestFit.FuelAmount;//pomniejszam ilość paliwa konieczną do umieszczenia o umieszczone w zbiorniku paliwo

                    }



                    if (tank.Count > 1 && tank[t].allContainersUsed)
                    {
                        break;
                    }
                    if (tank.Count == 1 && tank[t].allContainersUsed)
                    {
                        tank.Add(new Tank());
                        t++;
                    }
                }


                if (doZuzycia.All(f => f.fuelValue == 0) && tank.All(t => t.allContainersUsed))
                {
                    return true;
                }
                else if (!doZuzycia.All(f => f.fuelValue == 0) && tank.All(t => t.allContainersUsed))
                {
                    tank = null;
                    return false;
                }




            }


            if (doZuzycia.All(f => f.fuelValue == 0) && tank.All(t => t.allContainersUsed))
            {
                return true;
            }
            else if (!doZuzycia.All(f => f.fuelValue == 0) && tank.All(t => t.allContainersUsed))
            {
                tank = null;
                return false;
            }
            else if (doZuzycia.All(f => f.fuelValue == 0) && !tank.All(t => t.allContainersUsed))
            {
                return true;
            }


            tank = null;
            return false;

        }

        public static List<DeliveryPredictionEntity> PrepareDeliveryEntity(List<ChosenPetrolRaport> raports)
        {
            List<DeliveryPredictionEntity> entities = new List<DeliveryPredictionEntity>();

            for (int i = 0; i < raports.Count; i++)
            {
                var raport = raports[i];
                var chosenForecast = raport.chosenForecast;
                Tank tank = null;
                List<Tank> tanks = null;
                if (Prediction.isOneEnough(chosenForecast, out tank))
                {
                    entities.Add(new DeliveryPredictionEntity() { DepartureTime = chosenForecast.Date.ToDateTime(new TimeOnly(0, 0)), StationId = raport.stationID, Pb95 = tank.howMuchPb95, Diesel = tank.howMuchDiesel, Pb98 = tank.howMuchPb98, TurboDiesel = tank.howMuchTurboDiesel });
                }
                else if (Prediction.isTwoEnough(chosenForecast, out tanks))
                {
                    entities.Add(new DeliveryPredictionEntity() { DepartureTime = chosenForecast.Date.ToDateTime(new TimeOnly(0, 0)), StationId = raport.stationID, Pb95 = tanks[0].howMuchPb95, Diesel = tanks[0].howMuchDiesel, Pb98 = tanks[0].howMuchPb98, TurboDiesel = tanks[0].howMuchTurboDiesel });

                    entities.Add(new DeliveryPredictionEntity() { DepartureTime = chosenForecast.Date.ToDateTime(new TimeOnly(0, 0)), StationId = raport.stationID, Pb95 = tanks[1].howMuchPb95, Diesel = tanks[1].howMuchDiesel, Pb98 = tanks[1].howMuchPb98, TurboDiesel = tanks[1].howMuchTurboDiesel });
                }
                else if (Prediction.isTwoEnough(chosenForecast, out tanks) == false && Prediction.isOneEnough(chosenForecast, out tank) == false)
                {
                    var beginDate = chosenForecast.Date;
                    var firstDate = raport.forecasts.OrderBy(f => f.Date).First().Date;
                    var petrolTypes = chosenForecast.fuels.Select(f => f.fuelTape).ToList();

                    var modified = raport.forecasts.Select(forecast => new Forecast()
                    {
                        Date = forecast.Date,
                        fuels = forecast.fuels.Where(fuel => petrolTypes.Contains(fuel.fuelTape)).ToList()
                    }).ToList();

                    for (DateOnly date = beginDate.AddDays(-1); date <= firstDate; date.AddDays(1))
                    {

                        var forecast = modified.First(m => m.Date == date);

                        if (Prediction.isOneEnough(forecast, out tank))
                        {
                            entities.Add(new DeliveryPredictionEntity() { DepartureTime = chosenForecast.Date.ToDateTime(new TimeOnly(0, 0)), StationId = raport.stationID, Pb95 = tank.howMuchPb95, Diesel = tank.howMuchDiesel, Pb98 = tank.howMuchPb98, TurboDiesel = tank.howMuchTurboDiesel });
                        }
                        else if (Prediction.isTwoEnough(forecast, out tanks))
                        {
                            entities.Add(new DeliveryPredictionEntity() { DepartureTime = chosenForecast.Date.ToDateTime(new TimeOnly(0, 0)), StationId = raport.stationID, Pb95 = tanks[0].howMuchPb95, Diesel = tanks[0].howMuchDiesel, Pb98 = tanks[0].howMuchPb98, TurboDiesel = tanks[0].howMuchTurboDiesel });

                            entities.Add(new DeliveryPredictionEntity() { DepartureTime = chosenForecast.Date.ToDateTime(new TimeOnly(0, 0)), StationId = raport.stationID, Pb95 = tanks[1].howMuchPb95, Diesel = tanks[1].howMuchDiesel, Pb98 = tanks[1].howMuchPb98, TurboDiesel = tanks[1].howMuchTurboDiesel });
                        }



                    }
                    if (tank == null && tanks == null) return new List<DeliveryPredictionEntity>();
                }
            }

            return entities;



        }


    }
}
