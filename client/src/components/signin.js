import React, { Component } from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { AuthContext } from "../Auth";

class SignIn extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { email: "" };
    this.state = { password: "" };

    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleClientLogIn(res) {
    console.log(JSON.stringify(res.data));
    this.context.logIn(
      res.data.user.id,
      res.data.user.email,
      res.data.user.group_id
    );
    this.props.history.push("/lists");
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }
  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSignIn(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post("/api/users/sign_in", user).then(res => {
      alert(JSON.stringify(res.data.message));
      if (JSON.stringify(res.data.message).includes("successfully") === true) {
        this.handleClientLogIn(res);
        console.log("user is signged in");
      }
    });
  }
  handleSignUp(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post("/api/users", user).then(res => {
      alert(JSON.stringify(res.data.message));
      if (JSON.stringify(res.data.message).includes("successfully") === true) {
        this.handleClientLogIn(res);
        console.log("user is signed up");
      }
    });
  }
  render() {
    return (
      <Router>
        <div className="Sign-In">
          <h1>Sign in to your account or create a new one!</h1>

          <div className="Sign-in-form">
            <form>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.value}
                  placeholder="Enter Email"
                  onChange={this.handleEmail}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.value}
                  className="form-control"
                  onChange={this.handlePassword}
                />
              </div>

              <br />
              <input
                type="submit"
                value="Sign In"
                className="User-button"
                onClick={this.handleSignIn}
              />
              <input
                type="submit"
                value="Sign Up"
                className="User-button"
                onClick={this.handleSignUp}
              />
            </form>
          </div>
        </div>
      </Router>
    );
  }
}

export default withRouter(SignIn);
