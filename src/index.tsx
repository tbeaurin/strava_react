import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import { AuthProvider } from './Store/AuthContext';
import RouterComponent from './Components/Router/RouterComponent';

const theme = createMuiTheme({
  palette: {
    // primary: orange,
    primary: {
      light: orange[300],
      main: orange[900],
      dark: orange[600],
      contrastText: grey[300],
    },
    secondary: green,
    type: 'dark',
    background: {
      // default: grey[900],
      default: '#121211',
      paper: grey[900],
    },
    text: {
      primary: grey[300],
      secondary: grey[500],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterComponent />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
