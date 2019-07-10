import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Lists from "./components/lists";
import AddList from "./components/addlist";
import Header from "./components/header";
import Landing from "./components/landing";
import SignIn from "./components/signin";

import { AuthContext } from "./Auth";

class App extends Component {
  static contextType = AuthContext;

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <main>
            <Route exact path="/" component={Landing} />
            <Route exact path="/lists" component={Lists} />
            <Route path="/lists/new" component={AddList} />
            <Route exact path="/user" component={SignIn} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
