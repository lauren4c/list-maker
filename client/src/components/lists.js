import React, { Component } from "react";
import { Link, withRouter, BrowserRouter as Router } from "react-router-dom";

import { AuthContext } from "../Auth";
import AddList from "./addlist";
import "../App.css";
import axios from "axios";

class Lists extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    axios.get(`/api/lists/user/${this.context.id}`).then(res => {
      this.setState({ lists: res.data });
    });
  }

  // send = () => {
  //   const socket = socketIOClient(this.state.endpoint);
  //   socket.emit("change color", this.state.color);
  // };
  handleListViewChange(id) {
    this.props.history.push(`/lists/${id}`);
  }

  results() {
    if (this.context.id === null) {
      return <p>Please create an account or sign in to create a list.</p>;
    } else {
      if (this.state.lists === "") {
        return <h3>No Lists here. Create a new one!</h3>;
      } else
        return (
          <Router>
            <div className="all-lists">
              {this.state.lists.map(list => (
                <div className="list-name" key={list.id}>
                  <button className="list-button">
                    <Link
                      to={`/lists/${list.id}`}
                      onClick={() => this.handleListViewChange(list.id)}
                    >
                      {list.name}
                    </Link>
                  </button>
                </div>
              ))}
            </div>
          </Router>
        );
    }
  }

  render() {
    return (
      <Router>
        <div>{this.results()}</div>
        <AddList />
      </Router>
    );
  }
}

export default withRouter(Lists);
