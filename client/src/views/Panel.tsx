import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FuelLevelCard from '@/components/FuelLevel';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { Table } from '@/components/Table';
import { Card } from '@/components/card';
import Station1chart from '@/components/Charts/Station1chart';
import { getPredictionById } from '@/dao/prediction';
import { getStationById } from '@/dao/station';
import { usePromise } from '@/hooks';
import { Prediction } from '@/types/prediction';
import { Station } from '@/types/station';

import './Panel.css';

const Panel: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [station, setStation] = useState<Station | null>(null);

  const [getPredictions] = usePromise(getPredictionById, (response) => {
    if (Array.isArray(response.data)) {
      setPredictions(response.data);
    } else if (typeof response.data === 'object' && response.data !== null) {
      setPredictions([response.data]);
    } else {
      console.error(
        'Expected an array or single prediction object, but received:',
        response.data
      );
    }
  });

  const [getStation, isLoadingStation] = usePromise(
    getStationById,
    (response) => {
      setStation(response.data);
    }
  );

  useEffect(() => {
    if (id !== undefined) {
      const parsedId = parseInt(id, 10);
      if (!isNaN(parsedId)) {
        getPredictions(parsedId);
        getStation(parsedId);
      } else {
        console.error(`Id: ${id} is not a valid number`);
      }
    } else {
      console.error('Id is undefined');
    }
  }, [id]);

  const capacity95 = station?.currentFuelVolume?.pb95 ?? 0;
  const maxCapacity95 = station?.stationCapacity?.pb95 ?? 0;
  const capacity98 = station?.currentFuelVolume?.pb98 ?? 0;
  const maxCapacity98 = station?.stationCapacity?.pb98 ?? 0;
  const capacityDiesel = station?.currentFuelVolume?.diesel ?? 0;
  const maxCapacityDiesel = station?.stationCapacity?.diesel ?? 0;
  const capacityTurboDiesel = station?.currentFuelVolume?.turboDiesel ?? 0;
  const maxCapacityTurboDiesel = station?.stationCapacity?.turboDiesel ?? 0;

  const percent95 = parseFloat(((capacity95 / maxCapacity95) * 100).toFixed(2));
  const percent98 = parseFloat(((capacity98 / maxCapacity98) * 100).toFixed(2));
  const percentDiesel = parseFloat(
    ((capacityDiesel / maxCapacityDiesel) * 100).toFixed(2)
  );
  const percentTurboDiesel = parseFloat(
    ((capacityTurboDiesel / maxCapacityTurboDiesel) * 100).toFixed(2)
  );

  let rows: {
    data: string;
    'godz.': string;
    id: string;
    pb95: string;
    pb98: string;
    diesel: string;
    'turbo diesel': string;
    suma: string;
  }[] = [];

  if (predictions.length > 0) {
    rows = predictions.map((prediction) => ({
      data: prediction.departureTime.split('T')[0],
      'godz.': new Date(prediction.departureTime).toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      id: prediction.id.toString(),
      pb95: `${prediction.pb95} L`,
      pb98: `${prediction.pb98} L`,
      diesel: `${prediction.diesel} L`,
      'turbo diesel': `${prediction.turboDiesel} L`,
      suma: `${prediction.pb95 + prediction.pb98 + prediction.diesel + prediction.turboDiesel} L`,
    }));
  } else if (predictions.length === 1) {
    const prediction = predictions[0];
    rows = [
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
    ];
  }

  return (
    <LoadingOverlay isLoading={isLoadingStation}>
      {station && (
        <div className="panel-container">
          <div className="chart-info">
            <Station1chart
              percent95={percent95}
              percent98={percent98}
              percentDiesel={percentDiesel}
              percentTurboDiesel={percentTurboDiesel}
            />
            <Card station={station} />
          </div>
          <div className="fuelLevel">
            <FuelLevelCard
              name="PB95"
              capacity={capacity95}
              maxCapacity={maxCapacity95}
            />
            <FuelLevelCard
              name="PB98"
              capacity={capacity98}
              maxCapacity={maxCapacity98}
            />
            <FuelLevelCard
              name="DIESEL"
              capacity={capacityDiesel}
              maxCapacity={maxCapacityDiesel}
            />
            <FuelLevelCard
              name="TURBO D"
              capacity={capacityTurboDiesel}
              maxCapacity={maxCapacityTurboDiesel}
            />
          </div>
          <h2 className="prediction-title">predykcje</h2>
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
      )}
    </LoadingOverlay>
  );
};

export default Panel;
