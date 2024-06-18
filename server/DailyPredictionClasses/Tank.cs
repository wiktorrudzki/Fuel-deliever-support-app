using System.ComponentModel;

namespace server.DailyPredictionClasses
{
    public class Tank
    {
        public Tank()
        {
            this.containers = new List<Container>()
            {
                new Container() {maxValue=10000},
                new Container() {maxValue=8500},
                new Container() {maxValue=7400},
                new Container() {maxValue=6100},
                new Container() {maxValue=4000},

            };
        }
        public DateOnly DeliverDate { get; set; }
        public List<Container> containers;
        public int tankTotalLimit = 32000;

        public bool allContainersUsed => this.containers.All(c => c.FuelAmount != 0) ? true : false;

        public int howMuchPb95 => (int)(containers.Where(c => c.FuelType == "ULG95").Sum(c => c.FuelAmount));
        public int howMuchDiesel => (int)(containers.Where(c => c.FuelType == "DK").Sum(c => c.FuelAmount));
        public int howMuchTurboDiesel => (int)(containers.Where(c => c.FuelType == "ULTDK").Sum(c => c.FuelAmount));
        public int howMuchPb98 => (int)(containers.Where(c => c.FuelType == "ULTSU").Sum(c => c.FuelAmount));


    }
}
