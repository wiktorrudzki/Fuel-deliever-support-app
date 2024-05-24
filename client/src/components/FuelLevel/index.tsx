import FuelLevelChart from "./FuelLevelChart"
import FuelLevelTable from "./FuelLevelTable"
export default function FuelLevelCard(){
    return(
        <div className="mainContainer">
           <FuelLevelChart />
           <FuelLevelTable />
        </div>
    )
}