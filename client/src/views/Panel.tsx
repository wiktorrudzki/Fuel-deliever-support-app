import { Table } from '@/components/Table';

const Panel = () => {
  return (
    <div className="panel-container">
      <Table
        columns={['data', 'godz.', 'id', 'suma']}
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
      />
    </div>
  );
};

export default Panel;
