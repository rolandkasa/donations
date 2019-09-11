import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Contact from "./Components/ContactComponent";
import Donation from './Components/DonationComponent'
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Donations</h1>
          </header>
          <Donation/>
          <footer className="bottom">
            <hr></hr>
            <Contact />
          </footer>
        </div>
      </ReduxProvider>
    );
  }
}

export default App;