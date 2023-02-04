import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Theme } from '@mui/system';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes
} from '@mui/material';
import Main from 'routes/main';

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
