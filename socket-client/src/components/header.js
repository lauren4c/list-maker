import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "../App.css";

class Header extends Component {
  render() {
    return (
      <Router>
        <div className="Nav">
          <h3>
            Everybody Loves a
            <br />
            <a href="/lists">List maker!</a>
          </h3>
          <h3>Your Lists:</h3>
          <ul className="Nav-Links">
            <li>Log In/out</li>
          </ul>
        </div>
      </Router>
    );
  }
}
export default Header;
