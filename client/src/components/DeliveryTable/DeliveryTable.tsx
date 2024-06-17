import { MenuItem, Select, TextField } from '@mui/material';

import { formatDateTimeLocal } from '@/helpers';
import { Driver } from '@/types/driver';
import { Prediction, PredictionCreate } from '@/types/prediction';

import { LoadingOverlay } from '../LoadingOverlay';
import './DeliveryTable.css';

type Props = {
  values: PredictionCreate;
  drivers: Driver[];
  prediction: Prediction | null;
  disabled: boolean;
  isLoadingDrivers: boolean;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
};

const DeliveryTable = ({
  prediction,
  disabled,
  values,
  drivers,
  isLoadingDrivers,
  handleChange,
}: Props) => {
  return (
    <div>
      <div className="delivery-table-title">
        <h2>Przewidywana dostawa</h2>
      </div>
      <div className="delivery-container">
        <div className="delivery-column">
          <div>
            <div className="delivery-row">
              <div className="delivery-label">DATA</div>
              <TextField
                value={values.departureTime}
                disabled={disabled}
                placeholder={
                  prediction?.departureTime
                    ? formatDateTimeLocal(prediction.departureTime)
                    : undefined
                }
                type="datetime-local"
                name="departureTime"
                className="delivery-input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="delivery-row">
              <div className="delivery-label">KIEROWCA</div>
              <LoadingOverlay isLoading={isLoadingDrivers}>
                {drivers.length && (
                  <Select
                    name="driverId"
                    value={values.driverId}
                    defaultValue={drivers[0].id}
                    disabled={disabled}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e) => handleChange(e as any)}
                    required
                  >
                    {drivers.map((driver) => (
                      <MenuItem key={driver.id} value={driver.id}>
                        {driver.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </LoadingOverlay>
            </div>
          </div>
        </div>
        <div className="delivery-column">
          <div>
            <div className="delivery-row">
              <div className="delivery-label">PB95</div>
              <TextField
                value={values.pb95}
                disabled={disabled}
                placeholder={prediction?.pb95?.toString()}
                type="number"
                name="pb95"
                className="delivery-input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="delivery-row">
              <div className="delivery-label">PB98</div>
              <TextField
                value={values.pb98}
                disabled={disabled}
                placeholder={prediction?.pb98?.toString()}
                type="number"
                name="pb98"
                className="delivery-input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="delivery-row">
              <div className="delivery-label">DIESEL</div>
              <TextField
                value={values.diesel}
                disabled={disabled}
                placeholder={prediction?.diesel?.toString()}
                type="number"
                name="diesel"
                className="delivery-input"
                onChange={handleChange}
                required
              />
            </div>
            <div className="delivery-row">
              <div className="delivery-label">TURBO DIESEL</div>
              <TextField
                value={values.turboDiesel}
                disabled={disabled}
                placeholder={prediction?.turboDiesel?.toString()}
                type="number"
                name="turboDiesel"
                className="delivery-input"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTable;
