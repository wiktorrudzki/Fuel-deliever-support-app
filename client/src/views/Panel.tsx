import FuelLevelCard from '@/components/FuelLevel';
import { Table } from '@/components/Table';
import { Card } from '@/components/card';
import Station1chart from '@/components/charts/Station1chart';

import './Panel.css';

const Panel = () => {
  return (
    <div className="panel-container">
      <div className="chart-info">
        <Station1chart />
        <Card />
      </div>
      <div className="fuelLevel">
        <FuelLevelCard />
        <FuelLevelCard />
        <FuelLevelCard />
        <FuelLevelCard />
      </div>
      <Table
        columns={[
          'data',
          'godz.',
          'id',
          'pb95',
          'pb98',
          'diesel',
          'lpg',
          'suma',
        ]}
        rows={[
          {
            data: '22.05.2024',
            'godz.': '21:48',
            id: '1',
            suma: '22222 L',
            pb95: '20102 L',
            pb98: '20102 L',
            diesel: '20102 L',
            lpg: '20102 L',
          },
          {
            data: '22.05.2024',
            'godz.': '21:48',
            id: '2',
            suma: '22222 L',
            pb95: '20102 L',
            pb98: '20102 L',
            diesel: '20102 L',
            lpg: '20102 L',
          },
          {
            data: '22.05.2024',
            'godz.': '21:48',
            id: '3',
            suma: '22222 L',
            pb95: '20102 L',
            pb98: '20102 L',
            diesel: '20102 L',
            lpg: '20102 L',
          },
          {
            data: '22.05.2024',
            'godz.': '21:48',
            id: '3',
            suma: '22222 L',
            pb95: '20102 L',
            pb98: '20102 L',
            diesel: '20102 L',
            lpg: '20102 L',
          },
          {
            data: '22.05.2024',
            'godz.': '21:48',
            id: '3',
            suma: '22222 L',
            pb95: '20102 L',
            pb98: '20102 L',
            diesel: '20102 L',
            lpg: '20102 L',
          },
          {
            data: '22.05.2024',
            'godz.': '21:48',
            id: '3',
            suma: '22222 L',
            pb95: '20102 L',
            pb98: '20102 L',
            diesel: '20102 L',
            lpg: '20102 L',
          },
          {
            data: '22.05.2024',
            'godz.': '21:48',
            id: '3',
            suma: '22222 L',
            pb95: '20102 L',
            pb98: '20102 L',
            diesel: '20102 L',
            lpg: '20102 L',
          },
          {
            data: '22.05.2024',
            'godz.': '21:48',
            id: '3',
            suma: '22222 L',
            pb95: '20102 L',
            pb98: '20102 L',
            diesel: '20102 L',
            lpg: '20102 L',
          },
        ]}
      />
    </div>
  );
};

export default Panel;
