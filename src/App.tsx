import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Theme } from '@mui/system';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Paper
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import Main from 'routes/main';
import Header from 'components/header';

const darkTheme: Theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#ffffff'
      },
      secondary: {
        main: '#ffffff'
      },
      background: {
        default: '#202124',
        paper: '#27272A'
      },
      error: {
        main: '#f44336'
      },
      text: {
        primary: '#A1A1AA'
      }
    }
  })
);

const App: FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
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
              sx={{ height: 'calc(100vh - 88px)', border: '1px solid #414144' }}
              square
            ></Paper>
          </Grid2>
        </Grid2>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default observer(App);
