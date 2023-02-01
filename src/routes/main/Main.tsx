import React, { FC } from 'react';
import { Paper } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import Header from 'components/header';
import Table from 'components/table';

const Main: FC = () => {
  return (
    <Grid2 container spacing={0}>
      <Grid2 xs={12}>
        <Paper sx={{ height: '44px', border: '1px solid #414144' }} square>
          <Header />
        </Paper>
      </Grid2>
      <Grid2 xs={2}>
        <Paper
          sx={{ height: '44px', border: '1px solid #414144' }}
          square
        ></Paper>
      </Grid2>
      <Grid2 xs={10}>
        <Paper
          sx={{ height: '44px', border: '1px solid #414144' }}
          square
        ></Paper>
      </Grid2>
      <Grid2 xs={2}>
        <Paper
          sx={{ height: 'calc(100vh - 88px)', border: '1px solid #414144' }}
          square
        ></Paper>
      </Grid2>
      <Grid2 xs={10}>
        <Paper
          sx={{
            height: 'calc(100vh - 88px)',
            border: '1px solid #414144',
            backgroundColor: '#202124'
          }}
          square
        >
          <Table />
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Main;
