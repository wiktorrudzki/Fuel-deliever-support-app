import { useState } from 'react';

import './DeliveryTable.css';

const DeliveryTable = () => {
  interface deliveryData {
    data: string;
    id: string;
    driverId: string;
    fuel1: number;
    fuel2: number;
    fuel3: number;
    fuel4: number;
  }

  const [deliveryData, setDeliveryData] = useState({
    data: '23-06-2024',
    id: '100001',
    driverId: '100001',
    fuel1: 10001,
    fuel2: 1000001,
    fuel3: 10000001,
    fuel4: 1000001,
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDeliveryData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div>
      <div className='delivery-table-title'>
        <h2>Przewidywana dostawa</h2>
      </div>
      <div className="delivery-container">
        <div className="delivery-column">
          <div>
            <div className="delivery-row">
              <div className="delivery-label">DATA</div>
              <input
                type="text"
                name="data"
                value={deliveryData.data}
                onChange={handleInputChange}
                className="delivery-input"
              />
            </div>
            <div className="delivery-row">
              <div className="delivery-label">ID</div>
              <input
                type="text"
                name="id"
                value={deliveryData.id}
                onChange={handleInputChange}
                className="delivery-input"
              />
            </div>
            <div className="delivery-row">
              <div className="delivery-label">Driver ID</div>
              <input
                type="text"
                name="driverId"
                value={deliveryData.driverId}
                onChange={handleInputChange}
                className="delivery-input"
              />
            </div>
          </div>
        </div>
        <div className="delivery-column">
          <div>
            <div className="delivery-row">
              <div className="delivery-label">Fuel_1</div>
              <input
                type="text"
                name="fuel1"
                value={deliveryData.fuel1}
                onChange={handleInputChange}
                className="delivery-input"
              />
            </div>
            <div className="delivery-row">
              <div className="delivery-label">Fuel_2</div>
              <input
                type="text"
                name="fuel2"
                value={deliveryData.fuel2}
                onChange={handleInputChange}
                className="delivery-input"
              />
            </div>
            <div className="delivery-row">
              <div className="delivery-label">Fuel_3</div>
              <input
                type="text"
                name="fuel3"
                value={deliveryData.fuel3}
                onChange={handleInputChange}
                className="delivery-input"
              />
            </div>
            <div className="delivery-row">
              <div className="delivery-label">Fuel_4</div>
              <input
                type="text"
                name="fuel4"
                value={deliveryData.fuel4}
                onChange={handleInputChange}
                className="delivery-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTable;
