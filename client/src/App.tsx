import { Button } from '@/components/button';
import { TextInput } from '@/components/input';

import './App.css';
import MobileCalendar from './components/Calendar/MobileCalendar';
import Station1chart from './components/Charts/Station1chart';
import FuelLevelCard from './components/FuelLevel';

function App() {
  return (
    <div>
      <Button />
      <TextInput />
      <Station1chart />
      <FuelLevelCard />
      <MobileCalendar />
    </div>
  );
}

export default App;
