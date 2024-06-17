import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Grid, Box } from '@mui/material';

// import { styled } from '@mui/material/styles';
import MobileCalendar from '@/components/Calendar/MobileCalendar';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { getStationById } from '@/dao/station';
import { EditDelivery } from '@/features/AddDelivery';
import { usePromise } from '@/hooks';
import { Station } from '@/types/station';

// import TableDetails from '@/components/tableDetails/TableDetails';
import { Table } from '../components/Table';

export default function AddDelivery() {
  const params = useParams();
  const stationId = params.id;

  const [station, setStation] = useState<Station>();

  const backToDashboard = () => <Navigate to="/dashboard" />;

  const [get, isLoading] = usePromise(
    getStationById,
    ({ data }) => {
      console.log(data);
      setStation(data);
    },
    (err) => {
      console.error(err);
      return backToDashboard();
    }
  );

  useEffect(() => {
    if (stationId && parseInt(stationId)) {
      get(parseInt(stationId));
    } else {
      backToDashboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationId]);

  if (!stationId) {
    return backToDashboard();
  }

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
            <MobileCalendar />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Table
            columns={
              [
                'data',
                'godz.',
                'id',
                'suma',
                'PB95',
                'PB98',
                'DIESEL',
                'LPG',
              ] as const
            }
            rows={[
              {
                data: '22.05.2024',
                'godz.': '21:48',
                id: '1',
                suma: '22222 L',
                PB95: '40003 L',
                PB98: '443555 L',
                DIESEL: '4355553 L',
                LPG: '3532 L',
              },
              {
                data: '22.05.2024',
                'godz.': '21:48',
                id: '2',
                suma: '22222 L',
                PB95: '40003 L',
                PB98: '443555 L',
                DIESEL: '4355553 L',
                LPG: '3532 L',
              },
              {
                data: '22.05.2024',
                'godz.': '21:48',
                id: '3',
                suma: '22222 L',
                PB95: '40003 L',
                PB98: '443555 L',
                DIESEL: '4355553 L',
                LPG: '3532 L',
              },
              {
                data: '22.05.2024',
                'godz.': '21:48',
                id: '2',
                suma: '22222 L',
                PB95: '40003 L',
                PB98: '443555 L',
                DIESEL: '4355553 L',
                LPG: '3532 L',
              },
              {
                data: '22.05.2024',
                'godz.': '21:48',
                id: '2',
                suma: '22222 L',
                PB95: '40003 L',
                PB98: '443555 L',
                DIESEL: '4355553 L',
                LPG: '3532 L',
              },
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
