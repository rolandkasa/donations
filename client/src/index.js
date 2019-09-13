import React from 'react'
import ReactDOM from 'react-dom';
import RouterComponent from './Components/RouterComponent'
import configureStore from "./store";
import { Provider as ReduxProvider } from "react-redux";
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const router = (
  <ReduxProvider store={reduxStore}>
    <RouterComponent />
  </ReduxProvider>
)

ReactDOM.render(
  router,
  document.getElementById('root')
);
