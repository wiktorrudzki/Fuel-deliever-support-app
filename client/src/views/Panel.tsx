import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FuelLevelCard from '@/components/FuelLevel';
import { Table } from '@/components/Table';
import { Card } from '@/components/card';
import Station1chart from '@/components/charts/Station1chart';
import { getAllPredictions } from '@/dao/prediction';
import { usePromise } from '@/hooks';

import './Panel.css';

const Panel = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  const [predictions, setPredictions] = useState<unknown[]>([]);

  const [getPrediction] = usePromise(getAllPredictions, (response) => {
    setPredictions(response.data);
  });

  useEffect(() => {
    getPrediction();
  }, []);

  const prediction = predictions[id];
  const date = prediction.departureTime.toISOString().split('T')[0];
  const time = prediction.departureTime
    .toISOString()
    .split('T')[1]
    .split('.')[0];

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
            data: date,
            'godz.': time,
            id: id,
            suma: '22222 L',
            pb95: prediction.pb95 + ' L',
            pb98: prediction.pb98 + ' L',
            diesel: prediction.diesel + ' L',
            lpg: prediction.turboDiesel + ' L',
          },
        ]}
      />
    </div>
  );
};

export default Panel;
