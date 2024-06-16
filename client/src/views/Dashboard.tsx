import { Outlet } from 'react-router-dom';

// project imports
import './Dashboard.css';

type Props = {
  title: string;
};

export default function Dashboard({ title }: Props) {
  // example

  return (
    <div className="container">
      <div className="data-side">
        <div className="dashboard-header">
          <h1 className="dashboard-title">{title}</h1>
        </div>
        <div className="dashboard-outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
