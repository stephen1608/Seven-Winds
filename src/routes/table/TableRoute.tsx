import React, { FC } from 'react';
import { Paper, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import Header from 'components/header';
import Table from 'components/table';
import MenuButton from 'components/menuButton';
import Sidebar from 'components/sidebar';

import classes from './tableRoute.module.scss';

const Main: FC = () => {
  return (
    <Grid2 container spacing={0} className={classes.container}>
      <Grid2 xs={12}>
        <Paper className={classes.element} square>
          <Header />
        </Paper>
      </Grid2>
      <Grid2 xs={2}>
        <Paper className={classes.element} square>
          <MenuButton />
        </Paper>
      </Grid2>
      <Grid2 xs={3}>
        <Paper className={classes.title} square>
          <Typography className={classes.text}>
            Строительно-монтажные работы
          </Typography>
        </Paper>
      </Grid2>
      <Grid2 xs={7}>
        <Paper className={classes.element} square></Paper>
      </Grid2>
      <Grid2 xs={2}>
        <Paper className={(classes.element, classes.sidebar)} square>
          <Sidebar />
        </Paper>
      </Grid2>
      <Grid2 xs={10}>
        <Paper className={(classes.element, classes.body)} square>
          <Table />
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default Main;
