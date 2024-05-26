import { Outlet } from 'react-router-dom';

// project imports
import Sidebar from '@/layout/Sidebar';

import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="container">
      <Sidebar />
      <div className="data-side">
        <div className="dashboard-header">
          <h1 className="dashboard-title">PANEL</h1>
        </div>
        <div className="dashboard-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
