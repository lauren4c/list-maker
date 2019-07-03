import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";

// Making the App component
class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "localhost:4001",

      ///
      color: "white"
      ///
    };
  }

  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit("change color", this.state.color);
  };

  // render method that renders in code if the state is updated
  render() {
    return (
      <div>
        <p>Making sure this works</p>
      </div>
    );
  }
}

export default App;
