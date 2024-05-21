import { Button } from '@/components/button';
import { TextInput } from '@/components/input';
import Station1chart from './components/charts/Station1chart';
import TableDetails from './components/tableDetails/TableDetails';
import './App.css';
import FuelLevelCard from './components/FuelLevel/FuelLevelCard';

function App() {
  return (
    <div>
      <Button />
      <TextInput />
      <Station1chart />
      <TableDetails />
      <FuelLevelCard />

    </div>
  );
}

export default App;
