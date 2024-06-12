import { getAllDeliveries } from '@/dao/delivery';
import { usePromise } from '@/hooks';

// project imports
import './Dashboard.css';
import Panel from './Panel';

export default function Dashboard() {
  // example
  const [get] = usePromise(getAllDeliveries, (d) => {
    console.log(d);
  });

  return (
    <div className="container">
      <div className="data-side">
        <div className="dashboard-header">
          <h1 className="dashboard-title">PANEL</h1>
        </div>
        <div className="dashboard-outlet">
          <button onClick={get}>dassda</button>
          <Panel />
        </div>
      </div>
    </div>
  );
}
