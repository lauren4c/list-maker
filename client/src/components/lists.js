import React, { Component } from "react";
import { Link, withRouter, BrowserRouter as Router } from "react-router-dom";

import { AuthContext } from "../Auth";
import AddList from "./addlist";
import ListView from "./list-view";
import "../App.css";
import axios from "axios";

class Lists extends Component {
  static contextType = AuthContext;
  state = {
    lists: [],
    itemDescription: "",
    listName: "",
    items: [],
    activeList: ""
  };
  constructor(props) {
    super(props);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  getUserLists() {
    this.eventSourch = null;
    axios.get(`/api/lists/user/${this.context.id}`).then(res => {
      this.setState({ lists: res.data });
    });
    this.eventSource = new EventSource(
      `/api/listswithSSE/user/${this.context.id}`
    );
    this.eventSource.onmessage = e => {
      console.log(e.data);
    };
  }

  componentWillUnmount() {
    return this.context.logOut;
  }

  setActiveList(id) {
    this.setState({ activeList: id });
    console.log("This is the active List Id" + this.state.activeList);
    axios.get(`/api/lists/${id}`).then(res => {
      this.setState({
        listName: res.data.list.name,
        items: res.data.list.items
      });
    });
  }
  handleDescription(event) {
    this.setState({ itemDescription: event.target.value });
    console.log(this.state.itemDescription);
  }

  handleAddItem(event) {
    event.preventDefault();
    const newItem = {
      description: this.state.itemDescription,
      list_id: this.state.activeList
    };
    axios
      .post(`/api/lists/${this.state.activeList}/items/new`, newItem)
      .then(res => {
        console.log(JSON.stringify(res.data.message));
        if (
          JSON.stringify(res.data.message).includes("successfully") === true
        ) {
          console.log("item added!");
        }
      });
  }

  showListItems() {
    if (this.state.activeList == "") {
      return <h3>No Items here. Let's add some!</h3>;
    } else {
      return (
        <div className="all-items">
          {this.state.items.map(item => (
            <div key={item.id}>
              <input
                type="checkbox"
                checked={item.purchased}
                onChange={() => this.handleCheckbox(item.id, !item.purchased)}
              />
              {item.description}{" "}
              <div className="item-edit-delete">
                <span onClick={() => this.handleItemRename(item.id)}>Edit</span>
                /
                <span onClick={() => this.handleItemDelete(item.id)}>
                  Delete
                </span>
              </div>
              <hr />
            </div>
          ))}
          <div className="add-item">
            <form className="add-item" onSubmit={e => this.handleAddItem(e)}>
              <input
                type="text"
                name="description"
                placeholder="Add Item"
                value={this.state.value}
                onChange={this.handleDescription}
                className="form-control"
                required
              />
              <input type="submit" value="Add Item" className="User-button" />
            </form>
          </div>
        </div>
      );
    }
  }
  handleCheckbox(id, purchaseStatus) {
    const updatedItem = {
      purchased: purchaseStatus
    };
    axios
      .post(`/api/lists/${this.state.activeList}/items/${id}/edit`, updatedItem)
      .then(res => {
        console.log(JSON.stringify(res.data.message));
        if (
          JSON.stringify(res.data.message).includes("successfully") === true
        ) {
          console.log("item updated!");
        }
      });
  }
  handleListDelete() {
    if (window.confirm("Are you sure you want to delete this list?")) {
      axios.post(`/api/lists/${this.state.activeList}/delete`).then(res => {
        if (JSON.stringify(res.data.message).includes("successfully")) {
          this.props.history.push("/lists");
        }
      });
    }
  }
  handleListRename() {
    let newName = window.prompt("Enter new list name:");
    axios
      .post(`/api/lists/${this.state.activeList}/edit`, newName)
      .then(res => {
        if (JSON.stringify(res.data.message).includes("successfully")) {
          this.setState({ listName: res.data.list.name });
          console.log("Success!");
        }
      });
  }
  handleItemRename(id) {
    let newName = { description: window.prompt("Enter new item name:") };
    axios
      .post(`/api/lists/${this.state.activeList}/items/${id}/edit`, newName)
      .then(res => {
        if (JSON.stringify(res.data.message).includes("successfully")) {
          console.log("Item Name Updated");
        }
      });
  }
  handleItemDelete(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .post(`/api/lists/${this.state.activeList}/items/${id}/delete`)
        .then(res => {
          if (JSON.stringify(res.data.message).includes("successfully")) {
            console.log("Item has been deleted)");
          }
        });
    }
  }

  listResults() {
    if (this.context.id === null) {
      return <p>Please create an account or sign in to create a list.</p>;
    } else {
      if (this.state.lists === "") {
        return <h3>No Lists here. Create a new one!</h3>;
      } else
        return (
          <div className="all-lists">
            {this.state.lists.map(list => (
              <div className="list-name" key={list.id}>
                <button
                  className="list-button"
                  onClick={() => this.setActiveList(list.id)}
                >
                  {list.name}
                </button>
              </div>
            ))}
          </div>
        );
    }
  }

  render() {
    if (this.context.id === null) {
      return <p>You must be logged in the view your lists</p>;
    } else
      return (
        <Router>
          <div>
            {this.getUserLists()}
            {this.listResults()}
          </div>
          <AddList />
          <div className="list-view">
            <div className="list-heading">
              <h2>{this.state.listName}</h2>
              <div className="delete-rename">
                <p>
                  <a onClick={() => this.handleListDelete()}>Delete List</a>
                </p>
                <p>
                  <a onClick={() => this.handleListRename()}>Rename List</a>
                </p>
              </div>
            </div>
            {this.showListItems()}
          </div>
        </Router>
      );
  }
}

export default Lists;
