import React, { FC } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import classes from './menuButton.module.scss';

const MenuButton: FC = () => {
  return (
    <Box className={classes.container}>
      <Box className={classes.title}>
        <Typography className={classes.mainTitle}>Название проекта</Typography>
        <Typography className={classes.subTitle}>Аббревиатура</Typography>
      </Box>
      <Box>
        <IconButton size="small">
          <ExpandMoreIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MenuButton;
