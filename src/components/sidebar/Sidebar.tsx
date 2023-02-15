import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

import classes from './Sidebar.module.scss';

import sidebarData from 'mocks/sidebarData';

const Sidebar: FC = () => {
  return (
    <Box className={classes.container}>
      {sidebarData.map((title) => (
        <Box className={classes.item} key={title}>
          <DashboardIcon color="primary" />
          <Typography className={classes.text} color="primary">
            {title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default Sidebar;
