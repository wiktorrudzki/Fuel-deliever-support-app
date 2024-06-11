import { Grid, Box, Button } from '@mui/material';

// import { styled } from '@mui/material/styles';
import MobileCalendar from '@/components/Calendar/MobileCalendar';
import TableDetails from '@/components/tableDetails/TableDetails';

import { Table } from '../components/Table';

export default function DeliveryDetails() {
  const buttonStyles = {
    margin: '10px',
    color: 'black',
    border: '1px solid #B3B3B3',
    padding: '10px 20px',
    fontSize: '20px',
    textTransform: 'none',
    width: '100%',
    height: '40px',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TableDetails />
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'space-between' } }}
            >
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button sx={buttonStyles}>Edytuj dostawę</Button>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  sx={{
                    ...buttonStyles,
                    backgroundColor: '#2665D2',
                    color: 'white',
                  }}
                >
                  Zatwierdź
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                padding: '20px', 
                borderRadius: '8px', 
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
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
