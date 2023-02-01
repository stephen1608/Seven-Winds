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
        <Main />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default observer(App);
