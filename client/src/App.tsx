import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { Table } from '@/components/Table';

import './App.css';
import { useUser } from './hooks';
import Layout from './layout/Layout';
import { LoginPage, Panel } from './views';
import Dashboard from './views/Dashboard';
import DeliveryDetails from './views/DeliveryDetails';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route
              path="/table"
              element={
                <Table
                  columns={['data', 'godz.', 'id', 'suma'] as const}
                  rows={[
                    {
                      data: '22.05.2024',
                      'godz.': '21:48',
                      id: '1',
                      suma: '22222 L',
                    },
                    {
                      data: '22.05.2024',
                      'godz.': '21:48',
                      id: '2',
                      suma: '22222 L',
                    },
                    {
                      data: '22.05.2024',
                      'godz.': '21:48',
                      id: '3',
                      suma: '22222 L',
                    },
                  ]}
                  extend
                  extendedRows={[
                    {
                      id: '1',
                      pb95: '5000 L',
                      pb98: '5000 L',
                      diesel: '5000 L',
                      ud: '7222 L',
                    },
                    {
                      id: '2',
                      pb95: '5000 L',
                      pb98: '5000 L',
                      diesel: '5000 L',
                      ud: '7222 L',
                    },
                    {
                      id: '3',
                      pb95: '5000 L',
                      pb98: '5000 L',
                      diesel: '5000 L',
                      ud: '7222 L',
                    },
                  ]}
                  extendedColumns={['pb95', 'pb98', 'diesel', 'ud'] as const}
                />
              }
            />

            <Route path="/old-about" element={<Navigate to="/about" />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="" element={<Panel />} />
              <Route path="delivery-details" element={<DeliveryDetails />} />
            </Route>
            <Route path="*" element={<h2>404 Not Found</h2>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

const ProtectedRoutes = () => {
  const { isLogged } = useUser();

  return isLogged ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
