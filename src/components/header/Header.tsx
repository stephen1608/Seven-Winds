import React, { FC, useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Tabs, Tab } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import ReplyIcon from '@mui/icons-material/Reply';

import classes from './Header.module.scss';

const Header: FC = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <Box className={classes.header}>
      <IconButton size="small">
        <AppsIcon color="disabled" />
      </IconButton>
      <IconButton size="small">
        <ReplyIcon color="disabled" />
      </IconButton>
      <Tabs value={value} className={classes.tabs}>
        <Tab
          label="Просмотр"
          value={0}
          onClick={() => setValue(0)}
          className={classes.tab}
        />
        <Tab
          label="Управление"
          value={1}
          onClick={() => setValue(1)}
          className={classes.tab}
        />
      </Tabs>
    </Box>
  );
};

export default Header;
