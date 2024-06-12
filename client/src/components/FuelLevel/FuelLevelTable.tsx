import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import './fuelLevelCard.css';

function createData(name: string, value: string) {
  return { name, value };
}

const rows = [
  createData('NAZWA PALIWA:', 'PB95'),
  createData('PRODUCENT PALIWA:', '42%'),
  createData('ILOŚĆ PALIWA', '24002L'),
  createData('MAX POJEMNOŚĆ', '40566L'),
];

export default function FuelLevelTable() {
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
}
