import React, { Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import AddList from "./addlist";
// import { AuthContext } from "../Auth";
import "../App.css";
import axios from "axios";

class Lists extends Component {
  state = {
    lists: []
  };

  componentDidMount() {
    axios.get(`/api/lists`).then(res => {
      this.setState({ lists: res.data });
    });
  }

  // send = () => {
  //   const socket = socketIOClient(this.state.endpoint);
  //   socket.emit("change color", this.state.color);
  // };
  handleListViewChange(id) {
    this.props.history.push("/lists/id");
  }

  results() {
    // eslint-disable-next-line
    if (this.state.lists == "") {
      return <h3>No Lists here. Create a new one!</h3>;
    } else {
      return (
        <Router>
          <div className="all-lists">
            {this.state.lists.map(list => (
              <div className="list-name" key={list.id}>
                <button className="list-button">
                  <Link
                    to={`/lists/${list.id}`}
                    onClick={() => this.props.history.push(`/lists/${list.id}`)}
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
        <div>
          {this.results()}
          <AddList />
        </div>
      </Router>
    );
  }
}

export default Lists;
