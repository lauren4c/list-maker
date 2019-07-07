import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../Auth";
import "../App.css";
import axios from "axios";

class addList extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = { name: "" };

    this.handleName = this.handleName.bind(this);
    this.handleCreateList = this.handleCreateList.bind(this);
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleCreateList(event) {
    event.preventDefault();
    if (this.state.name === "") {
      alert("Please enter a name");
    }
    if (this.context.id === null) {
      alert("You must be signed in to do that");
    }
    const list = {
      name: this.state.name,
      user_id: this.context.id
    };
    console.log(list);
    axios.post("/api/lists/new", list).then(res => {
      if (JSON.stringify(res.data.message).includes("successfully") === true) {
        // this.props.history.push("/lists");
        // this.handleNewListCreated(res.data.list.id);
        // console.log("This is the ID" + res.data.list.id);
      }
    });
  }
  render() {
    return (
      <Router>
        <div className="new-list">
          <form onSubmit={this.handleCreateList}>
            <div className="form-group">
              <input
                type="list-name"
                name="list-name"
                value={this.state.value}
                placeholder="Create New List"
                onChange={this.handleName}
                className="form-control"
              />
              <input type="submit" value="Create" className="User-button" />
            </div>
          </form>
          <hr />
        </div>
      </Router>
    );
  }
}

export default addList;
