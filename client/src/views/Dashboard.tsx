import { Outlet } from 'react-router-dom';

import { getAllDeliveries } from '@/dao/delivery';
import { usePromise } from '@/hooks';

// project imports
import './Dashboard.css';

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
          <Outlet />
        </div>
      </div>
    </div>
  );
}
