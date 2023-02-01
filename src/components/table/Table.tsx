import React, { FC } from 'react';
import {
  Table as MuiTable,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  TableBody
} from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

const Table: FC = () => {
  return (
    <TableContainer sx={{ width: '99%', maxHeight: 'calc(100vh - 88px)' }}>
      <MuiTable>
        <TableHead>
          <TableRow sx={{ height: '41px' }}>
            <TableCell sx={{ paddingTop: '0', paddingBottom: '0' }}>
              Dessert (100g serving)
            </TableCell>
            <TableCell
              sx={{ paddingTop: '0', paddingBottom: '0' }}
              align="right"
            >
              Calories
            </TableCell>
            <TableCell
              align="right"
              sx={{ paddingTop: '0', paddingBottom: '0' }}
            >
              Fat&nbsp;(g)
            </TableCell>
            <TableCell
              align="right"
              sx={{ paddingTop: '0', paddingBottom: '0' }}
            >
              Carbs&nbsp;(g)
            </TableCell>
            <TableCell
              align="right"
              sx={{ paddingTop: '0', paddingBottom: '0' }}
            >
              Protein&nbsp;(g)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ color: '#fff' }}>
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{ color: '#fff' }}>
                {row.calories}
              </TableCell>
              <TableCell align="right" sx={{ color: '#fff' }}>
                {row.fat}
              </TableCell>
              <TableCell align="right" sx={{ color: '#fff' }}>
                {row.carbs}
              </TableCell>
              <TableCell align="right" sx={{ color: '#fff' }}>
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
