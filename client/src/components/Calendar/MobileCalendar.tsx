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
  stationId?: number;
  highlightedDates?: Dayjs[];
}

function CustomDay(props: CustomDayProps) {
  const {
    stationId,
    highlightedDates = [],
    day,
    outsideCurrentMonth,
    ...other
  } = props;

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
        isSelected ? (
          <LocalGasStationIcon
            className="fuel-icon"
            style={{ color: getIconColor(stationId) }}
          />
        ) : undefined
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

const getIconColor = (stationId?: number): string => {
  switch (stationId) {
    case 1:
      return '#ff9800';
    case 2:
      return '#4caf50';
    case 3:
      return '#2196f3';
    default:
      return '#000';
  }
};

interface MobileCalendarProps {
  highlightedDates: Dayjs[];
  stationId?: number;
}

export default function MobileCalendar({
  highlightedDates,
  stationId,
}: MobileCalendarProps) {
  return (
    <div className="calendar-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          className="calendar"
          defaultValue={initialValue}
          readOnly
          slots={{
            day: CustomDay,
          }}
          slotProps={{
            day: {
              highlightedDates,
              stationId,
            } as CustomDayProps,
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
