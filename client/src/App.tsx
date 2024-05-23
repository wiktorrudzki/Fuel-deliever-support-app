// import { Button } from '@/components/button';
// import { TextInput } from '@/components/input';
// import { LoginPage } from '@/views';
import './App.css';
import { Table } from './components/Table';

// import { PrimaryButton } from './components/button';

function App() {
  return (
    // <div>
    //   <Button />
    //   <TextInput />
    // </div>
    // <LoginPage />
    <div className="container">
      {/* <PrimaryButton text="text" /> */}
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
      <Table
        width="20%"
        columns={['data', 'id'] as const}
        rows={[
          {
            data: '22.05.2024',
            id: '1',
          },
          {
            data: '22.05.2024',
            id: '2',
          },
          {
            data: '22.05.2024',
            id: '3',
          },
        ]}
      />
    </div>
  );
}

export default App;
