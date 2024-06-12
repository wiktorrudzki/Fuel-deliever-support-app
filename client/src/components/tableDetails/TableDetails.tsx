import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(name: string, data: string, id: number) {
  return { name, data, id };
}

const rows = [
  createData('Frozen yoghurt', '20.04.2024', 100001),
  createData('Ice cream sandwich', '23.04.2024', 100002),
  createData('Eclair', '24.04.2024', 100003),
];
export default function TableDetails() {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 'auto', borderRadius: '3%', marginBottom: '70px' }}
    >
      <Table sx={{ minWidth: 200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ paddingLeft: '32px', fontWeight: 'bold' }}>
              DATA
            </TableCell>
            <TableCell
              align="right"
              style={{ paddingRight: '32px', fontWeight: 'bold' }}
            >
              ID
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{backgroundColor: 'white'}}>
                {row.data}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
