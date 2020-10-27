import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { createMuiTheme } from '@material-ui/core/styles';

import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import AppScene from './Ui/AppScene';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: orange,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppScene />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
