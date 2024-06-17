import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FuelLevelCard from '@/components/FuelLevel';
import { Table } from '@/components/Table';
import { Card } from '@/components/card';
import Station1chart from '@/components/charts/Station1chart';
import { getPredictionById } from '@/dao/prediction';
import { usePromise } from '@/hooks';

import './Panel.css';

interface Prediction {
  id: number;
  departureTime: string;
  pb95: number;
  pb98: number;
  diesel: number;
  turboDiesel: number;
}

const Panel = () => {
  const { id } = useParams<{ id: string }>();

  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const [getPrediction] = usePromise(getPredictionById, (response) => {
    setPrediction(response.data);
  });

  useEffect(() => {
    if (id !== undefined) {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        getPrediction(parsedId);
      } else {
        console.error(`Id: ${id} is not a valid number`);
      }
    } else {
      console.error('Id is undefined');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = prediction
    ? [
        {
          data: prediction.departureTime.split('T')[0],
          'godz.': new Date(prediction.departureTime).toLocaleTimeString(
            'pl-PL',
            {
              hour: '2-digit',
              minute: '2-digit',
            }
          ),
          id: prediction.id.toString(),
          pb95: `${prediction.pb95} L`,
          pb98: `${prediction.pb98} L`,
          diesel: `${prediction.diesel} L`,
          'turbo diesel': `${prediction.turboDiesel} L`,
          suma: `${prediction.pb95 + prediction.pb98 + prediction.diesel + prediction.turboDiesel} L`,
        },
      ]
    : [];

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
          'turbo diesel',
          'suma',
        ]}
        rows={rows}
      />
    </div>
  );
};

export default Panel;
