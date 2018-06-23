import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Router from "./router/Router";
import configureStore from "./store/configureStore";

const store = configureStore();

render(
  <Provider store={store}>
    <Router store={store} />
  </Provider>,
  document.getElementById("root")
);
