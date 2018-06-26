import React, {Fragment} from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Router from "./router/Router";
import configureStore from "./store/configureStore";
import DevTools from './components/DevTools'

const store = configureStore();

render(
  <Provider store={store}>
    <Fragment>
      <Router store={store} />
      <DevTools />
    </Fragment>
  </Provider>,
  document.getElementById("root")
);
