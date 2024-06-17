import { useState, useEffect } from 'react';

import dayjs from 'dayjs';

import MobileCalendar from '@/components/Calendar/MobileCalendar';
import { getAllDeliveries } from '@/dao/delivery';
import { usePromise } from '@/hooks';
import { Delivery } from '@/types/delivery';

import './Calendar.css';

export default function Calendar() {
  const [delivery, setDelivery] = useState<Delivery[]>([]);

  const [getAllDeliveriesData] = usePromise(
    getAllDeliveries,
    ({ data }) => {
      setDelivery(data); // Ustawienie wszystkich dostaw w stanie delivery
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
      <h1> Terminarz</h1>
      <div style={{ marginTop: '40px' }}>
        <MobileCalendar highlightedDates={highlightedDates} />
      </div>
    </div>
  );
}
