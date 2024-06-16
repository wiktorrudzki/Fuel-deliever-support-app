import { TextField } from '@mui/material';

import { Prediction, PredictionCreate } from '@/types/prediction';

import './DeliveryTable.css';

type Props = {
  values: PredictionCreate;
  prediction: Prediction | null;
  disabled: boolean;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
};

const DeliveryTable = ({
  prediction,
  disabled,
  values,
  handleChange,
}: Props) => (
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
              placeholder={prediction?.departureTime}
              type="text"
              name="departureTime"
              className="delivery-input"
              onChange={handleChange}
            />
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
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DeliveryTable;
