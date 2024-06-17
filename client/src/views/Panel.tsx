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

  console.log(id);

  const [predictions, setPredictions] = useState<Prediction | null>(null);

  const [getPrediction] = usePromise(getPredictionById, (response) => {
    setPredictions(response.data);
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
  }, [id, getPrediction]);

  const rows = predictions
    ? [
        {
          data: predictions.departureTime.split('T')[0],
          'godz.': new Date(predictions.departureTime).toLocaleTimeString(
            'pl-PL',
            {
              hour: '2-digit',
              minute: '2-digit',
            }
          ),
          id: predictions.id.toString(),
          pb95: `${predictions.pb95} L`,
          pb98: `${predictions.pb98} L`,
          diesel: `${predictions.diesel} L`,
          lpg: `${predictions.turboDiesel} L`,
          suma: `${predictions.pb95 + predictions.pb98 + predictions.diesel + predictions.turboDiesel} L`,
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
          'lpg',
          'suma',
        ]}
        rows={rows}
      />
    </div>
  );
};

export default Panel;
