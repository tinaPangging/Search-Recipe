import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

import history from "./utilities/History";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Store from "./stateManagement/Store";

ReactDOM.render(
  // <React.StrictMode>
  //   <Home />
  // </React.StrictMode>,
  // document.getElementById('root')
  <Store>
    <BrowserRouter>
      <App history={history} />
    </BrowserRouter>
  </Store>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
