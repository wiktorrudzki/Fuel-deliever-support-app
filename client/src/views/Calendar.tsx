import { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import dayjs from 'dayjs';

import MobileCalendar from '@/components/Calendar/MobileCalendar';
import { getAllDeliveries } from '@/dao/delivery';
import { usePromise } from '@/hooks';
import { Delivery } from '@/types/delivery';

import './Calendar.css';

export default function Calendar() {
  const [delivery, setDelivery] = useState<Delivery[]>([]);
  console.log(delivery);

  const [getAllDeliveriesData] = usePromise(
    getAllDeliveries,
    ({ data }) => {
      setDelivery(data);
    },
    (err) => {
      console.error(err);
    }
  );

  useEffect(() => {
    getAllDeliveriesData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const highlightedDates = delivery.map((item) => dayjs(item.departureTime));
  return (
    <div className="all-calendar-container">
      <div style={{ marginTop: '40px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            flexDirection: 'column'
          }}
        >
          <h1 style={{marginBottom: '40px'}}> Terminarz</h1>
          <MobileCalendar highlightedDates={highlightedDates} />
        </Box>
      </div>
    </div>
  );
}
