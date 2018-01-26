import React from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";


import "./style.css";
import "./css/font-awesome.css";
import Workspace from "./components/workspace";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { DialogContainer } from "./components/dialog-container";
import {StoreService} from './reducers/index';

let s = StoreService.ins();

const App = () => (
  <Provider store={s}>
    <MuiThemeProvider>
      <Workspace />
      <DialogContainer />
    </MuiThemeProvider>
  </Provider>
);

render(<App />, document.getElementById("root"));
