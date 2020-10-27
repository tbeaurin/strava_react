import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router
} from "react-router-dom";
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import RouterComponent from './Components/Router/RouterComponent';
import LoginScene from './Ui/LoginScene';

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: orange,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <RouterComponent />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
