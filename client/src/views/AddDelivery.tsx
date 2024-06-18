import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Grid, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

import MobileCalendar from '@/components/Calendar/MobileCalendar';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { getAllDeliveries } from '@/dao/delivery';
import { getStationById } from '@/dao/station';
import { EditDelivery } from '@/features/AddDelivery';
import { usePromise } from '@/hooks';
import { Delivery } from '@/types/delivery';
import { Station } from '@/types/station';

import { Table } from '../components/Table';

export default function AddDelivery() {
  const params = useParams();
  const stationId = params.id;

  const [station, setStation] = useState<Station>();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);

  const [get, isLoading] = usePromise(
    getStationById,
    ({ data }) => {
      setStation(data);
    },
    (err) => {
      console.error(err);
      return backToDashboard();
    }
  );

  const [getAllDeliveriesData] = usePromise(
    getAllDeliveries,
    ({ data }) => {
      setDeliveries(data);
    },
    (err) => {
      console.error(err);
      return backToDashboard();
    }
  );

  useEffect(() => {
    if (stationId && parseInt(stationId)) {
      const parsedStationId = parseInt(stationId);

      get(parsedStationId);
      getAllDeliveriesData(parsedStationId);
    } else {
      backToDashboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId]);

  const backToDashboard = () => <Navigate to="/dashboard" />;

  const mappedDeliveries = deliveries.map((item) => {
    const departureTime = new Date(item.departureTime);
    const date = departureTime.toLocaleDateString('pl-PL');
    const time = departureTime.toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      data: date,
      'godz.': time,
      id: item.id.toString(),
      PB95: item.pb95,
      PB98: item.pb98,
      DIESEL: item.diesel,
      'TURBO DIESEL': item.turboDiesel,
      suma: item.pb95 + item.pb98 + item.diesel + item.turboDiesel,
    };
  });

  if (!stationId) {
    return backToDashboard();
  }

  console.log(deliveries);

  const highlightedDates = deliveries
    .filter((item) => item.stationId === station?.id)
    .map((item) => dayjs(item.departureTime));

  return (
    <Box>
      <Grid container spacing={4}>
        <LoadingOverlay isLoading={isLoading}>
          {station && <EditDelivery station={station} />}
        </LoadingOverlay>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              padding: '40px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          >
            <MobileCalendar highlightedDates={highlightedDates} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textTransform: 'uppercase',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            delivery history
          </Typography>
          <Table
            columns={[
              'data',
              'godz.',
              'id',
              'suma',
              'PB95',
              'PB98',
              'DIESEL',
              'TURBO DIESEL',
            ]}
            rows={mappedDeliveries}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
