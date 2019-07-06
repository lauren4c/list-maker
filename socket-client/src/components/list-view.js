import React, { Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import Lists from "./lists";

// import { AuthContext } from "../Auth";

import "../App.css";
import axios from "axios";

class ListView extends Component {
  state = {
    listName: "",
    items: []
  };

  componentDidMount() {
    axios.get(`/api/lists/${this.props.match.params.id}`).then(res => {
      console.log(res.data);
      this.setState({
        listName: res.data.list.name,
        items: res.data.list.items
      });
    });
  }

  // send = () => {
  //   const socket = socketIOClient(this.state.endpoint);
  //   socket.emit("change color", this.state.color);
  // };

  showListItems() {
    // eslint-disable-next-line
    if (this.state.items == "") {
      return <h3>No Items here. Let's add some!</h3>;
    } else {
      return (
        <div className="all-items">
          {this.state.items.map(item => (
            <div key={item.id}>
              <label>
                <input
                  type="checkbox"
                  value={this.state.item.purchased}
                  onChange={() => this.handleCheckbox()}
                />
                {item.description}
              </label>
            </div>
          ))}
        </div>
      );
    }
  }
  // checkboxes: https://stackoverflow.com/questions/40359800/how-to-toggle-boolean-state-of-react-component

  handleDelete() {
    if (window.confirm("Are you sure you want to delete this list?")) {
      axios
        .post(`/api/lists/${this.props.match.params.id}/delete`)
        .then(res => {
          if (JSON.stringify(res.data.message).includes("successfully")) {
            this.props.history.push("/lists");
          }
        });
    }
  }
  handleRename() {
    let newName = window.prompt("Enter new list name:");
    axios
      .post(`/api/lists/${this.props.match.params.id}/edit`, newName)
      .then(res => {
        if (JSON.stringify(res.data.message).includes("successfully")) {
          this.setState({ listName: res.data.list.name });
          console.log("Success!");
        }
      });
  }

  render() {
    return (
      <Router>
        <div className="list-view">
          <Lists />
          <div className="list-heading">
            <h2>{this.state.listName}</h2>
            <div className="delete-rename">
              <p>
                <a onClick={() => this.handleDelete()}>Delete List</a>
              </p>
              <p>
                <a onClick={() => this.handleRename()}>Rename List</a>
              </p>
            </div>
          </div>
          {this.showListItems()}
        </div>
      </Router>
    );
  }
}

export default ListView;
