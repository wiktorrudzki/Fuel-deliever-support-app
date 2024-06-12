import { getDeliveryById } from '@/dao/delivery';
import { usePromise } from '@/hooks';

// project imports
import './Dashboard.css';
import Panel from './Panel';

export default function Dashboard() {
  // example
  const [get] = usePromise(getDeliveryById, (response) => {
    console.log(response.data);
  });

  return (
    <div className="container">
      <div className="data-side">
        <div className="dashboard-header">
          <h1 className="dashboard-title">PANEL</h1>
        </div>
        <div className="dashboard-outlet">
          <button onClick={() => get('1')}>dassda</button>
          <Panel />
        </div>
      </div>
    </div>
  );
}
