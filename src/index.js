import React from 'react';
import { render } from 'react-dom';
import './style.css';
import { Main } from './components/main';
import { TestProperty} from './components/test-property';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
  padding:"0px"
};

const App = () => (
  <MuiThemeProvider>
    <Main  />
  </MuiThemeProvider>
);

render(<App />, document.getElementById('root')); 
