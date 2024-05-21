import { Button } from '@/components/button';
import { TextInput } from '@/components/input';
import Station1chart from './components/charts/Station1chart';
import TableDetails from './components/tableDetails/TableDetails';
import FuelLevelCard from './components/fuelLevelCard/fuelLevelChart';
import FuelLevelTable from './components/fuelLevelCard/fuelLevelTable';
import './App.css';

function App() {
  return (
    <div>
      <Button />
      <TextInput />
      <Station1chart />
      <TableDetails />
      <FuelLevelCard />
      <FuelLevelTable /> 
    </div>
  );
}

export default App;
