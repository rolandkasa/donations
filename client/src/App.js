import React, { Component } from "react";

import "./App.css";
import Donation from './Components/DonationComponent'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Donations</h1>
        </header>
        <br />
        <Donation />
      </div>
    );
  }
}

export default App;