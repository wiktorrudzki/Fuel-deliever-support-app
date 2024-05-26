import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';

import './MobileCalendar.css';

const initialValue = dayjs();

interface CustomDayProps extends PickersDayProps<Dayjs> {
  highlightedDates?: Dayjs[];
}

function CustomDay(props: CustomDayProps) {
  const { highlightedDates = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth &&
    highlightedDates.some((highlightedDate) =>
      highlightedDate.isSame(day, 'day')
    );

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? <LocalGasStationIcon className="fuel-icon" /> : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function MobileCalendar() {
  const highlightedDates = [
    dayjs('2024-05-29'),
    dayjs('2024-05-26'),
    dayjs('2024-05-23'),
    dayjs('2024-04-23'),
  ];

  return (
    <div className="calendar-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          defaultValue={initialValue}
          readOnly
          slots={{
            day: CustomDay,
          }}
          slotProps={{
            day: {
              highlightedDates,
            } as CustomDayProps,
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
