import React, { Component } from "react";
export const AuthContext = React.createContext();

export default class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      email: null,
      group_id: null
    };
  }

  logIn = (id, email, group_id) => {
    this.setState({
      id: id,
      email: email,
      group_id: group_id
    });
  };

  logOut = () => {
    this.setState({
      id: null,
      email: null,
      group_id: null
    });
    alert("You are now signed-out");
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          logIn: this.logIn,
          logOut: this.logOut
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const Consumer = AuthContext.Consumer;
export const Provider = AuthProvider;
