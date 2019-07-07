import React, { Component } from "react";
import { Link, BrowserRouter as Router, withRouter } from "react-router-dom";
import { AuthContext } from "../Auth";
import "../App.css";

class Header extends Component {
  static contextType = AuthContext;

  showSignInOut(id) {
    if (id === null || id === undefined) {
      return (
        <li>
          <Link className="nav-link" to="/user">
            Sign In/Up
          </Link>
        </li>
      );
    } else {
      return (
        <section className="user-header">
          <li>
            <a className="nav-link" onClick={this.context.logOut}>
              Sign Out
            </a>
          </li>
        </section>
      );
    }
  }
  render() {
    return (
      <div className="Nav">
        <h3>
          Everybody Loves a
          <br />
          <a href="/lists">List maker!</a>
        </h3>
        <ul className="Nav-Links">{this.showSignInOut(this.context.id)}</ul>
      </div>
    );
  }
}
export default withRouter(Header);
