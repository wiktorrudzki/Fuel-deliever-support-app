import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { Table } from '@/components/Table';

import './App.css';

import { LoginPage } from './views';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
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
        <Route path="/old-about" element={<Navigate to="/about" />} />
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </Router>

  );
}

export default App;
