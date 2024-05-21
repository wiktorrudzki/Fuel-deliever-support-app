import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './fuelLevelCard.css'

function createData(
  name: string,
  value: string
) {
  return { name, value };
}

const rows = [
  createData('NAZWA PALIWA:', 'PB95'),
  createData('PRODUCENT PALIWA:', '42%'),
  createData('ILOŚĆ PALIWA', '24002L'),
  createData('MAX POJEMNOŚĆ', '40566L')
];

export default function FuelLevelTable() {
  return (
    <TableContainer component={Paper} className='tableContainer'>
      <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: '1px solid black' } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}