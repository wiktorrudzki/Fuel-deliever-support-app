import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import './fuelLevelCard.css';

interface FuelLevelTableProps {
  name: string;
  capacity: number;
  maxCapacity: number;
}

const FuelLevelTable: React.FC<FuelLevelTableProps> = ({
  name,
  capacity,
  maxCapacity,
}) => {
  const percent = ((capacity / maxCapacity) * 100).toFixed(2);
  const rows = [
    { name: 'NAZWA PALIWA', value: name },
    { name: 'PROCENT PALIWA', value: `${percent}%` },
    { name: 'ILOŚĆ PALIWA', value: `${capacity}L` },
    { name: 'MAX POJEMNOŚĆ', value: `${maxCapacity}L` },
  ];

  return (
    <div className="table-level-container">
      <TableContainer component={Paper} className="tableContainer">
        <Table
          sx={{ minWidth: 200, borderCollapse: 'collapse' }}
          aria-label="simple table"
        >
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  component="th"
                  scope="row"
                  className="tableCell noPadding"
                >
                  {row.name}
                </TableCell>
                <TableCell align="right" className="tableCell noPadding">
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FuelLevelTable;
