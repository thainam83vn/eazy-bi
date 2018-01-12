import React from 'react';
import { render } from 'react-dom';
import {Main} from './components/main';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>
);

render(<App />, document.getElementById('root')); 
