import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Grid, Box } from '@mui/material';

// import { styled } from '@mui/material/styles';
import MobileCalendar from '@/components/Calendar/MobileCalendar';
import { getDeliveryById } from '@/dao/delivery';
import { EditDelivery } from '@/features/AddDelivery';
import { usePromise } from '@/hooks';

// import TableDetails from '@/components/tableDetails/TableDetails';
import { Table } from '../components/Table';

export default function AddDelivery() {
  const params = useParams();
  const deliveryId = params.id;

  const backToDashboard = () => <Navigate to="/dashboard" />;

  const [get] = usePromise(
    getDeliveryById,
    (data) => {
      console.log(data);
    },
    (err) => {
      console.error(err);
      return backToDashboard();
    }
  );

  useEffect(() => {
    if (deliveryId) {
      get(deliveryId);
    } else {
      backToDashboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deliveryId]);

  if (!deliveryId) {
    return backToDashboard();
  }

  return (
    <Box>
      <Grid container spacing={4}>
        <EditDelivery id={parseInt(deliveryId)} />
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
