import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import socketIOClient from "socket.io-client";

import "./App.css";
import Lists from "./components/lists";
import AddList from "./components/addlist";
import Header from "./components/header";
import Landing from "./components/landing";
import ListView from "./components/list-view";

// Making the App component
class App extends Component {
  // send = () => {
  //   const socket = socketIOClient(this.state.endpoint);
  //   socket.emit("change color", this.state.color);
  // };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <Route exact path="/" component={Landing} />
            <Route exact path="/lists" component={Lists} />
            <Route path="/lists/:id" exact component={ListView} />
            <Route exact path="/lists/new" component={AddList} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
