import React from 'react';

import FuelLevelChart from './FuelLevelChart';
import FuelLevelTable from './FuelLevelTable';

interface FuelLevelCardProps {
  name: string;
  capacity: number;
  maxCapacity: number;
}

const FuelLevelCard: React.FC<FuelLevelCardProps> = ({
  name,
  capacity,
  maxCapacity,
}) => {
  return (
    <div className="mainContainer">
      <FuelLevelChart capacity={capacity} maxCapacity={maxCapacity} />
      <FuelLevelTable
        name={name}
        capacity={capacity}
        maxCapacity={maxCapacity}
      />
    </div>
  );
};

export default FuelLevelCard;
