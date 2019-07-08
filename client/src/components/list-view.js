import React, { Component } from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import Lists from "./lists";
import { AuthContext } from "../Auth";

import "../App.css";
import axios from "axios";

class ListView extends Component {
  static contextType = AuthContext;
  // state = {
  //   description: "",
  //   listName: "",
  //   items: [],
  //   list_id: ""
  // };
  constructor(props) {
    super(props);

    this.handleDescription = this.handleDescription.bind(this);
    this.handleMaxBudget = this.handleMaxBudget.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }
  //
  // getActiveList(id) {
  //   axios.get(`/api/lists/${id}`).then(res => {
  //     this.setState({
  //       listName: res.data.list.name,
  //       items: res.data.list.items,
  //       list_id: this.props.match.params.id
  //     });
  //   });
  // }

  handleDescription(event) {
    this.setState({ description: event.target.value });
    console.log(this.state.description);
  }
  handleMaxBudget(event) {
    this.setState({ max_budget: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newItem = {
      description: this.state.description,
      list_id: this.state.list_id
    };
    axios
      .post(`/api/lists/${this.state.list_id}/items/new`, newItem)
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
    // eslint-disable-next-line
    if (this.state.items == "") {
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
        </div>
      );
    }
  }
  handleCheckbox(id, purchaseStatus) {
    const updatedItem = {
      purchased: purchaseStatus
    };
    axios
      .post(`/api/lists/${this.state.list_id}/items/${id}/edit`, updatedItem)
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
      axios
        .post(`/api/lists/${this.props.match.params.id}/delete`)
        .then(res => {
          if (JSON.stringify(res.data.message).includes("successfully")) {
            this.props.history.push("/lists");
          }
        });
    }
  }
  handleListRename() {
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
  handleItemRename(id) {
    let newName = { description: window.prompt("Enter new item name:") };
    axios
      .post(`/api/lists/${this.state.list_id}/items/${id}/edit`, newName)
      .then(res => {
        if (JSON.stringify(res.data.message).includes("successfully")) {
          console.log("Item Name Updated");
        }
      });
  }
  handleItemDelete(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .post(`/api/lists/${this.state.list_id}/items/${id}/delete`)
        .then(res => {
          if (JSON.stringify(res.data.message).includes("successfully")) {
            console.log("Item has been deleted)");
          }
        });
    }
  }

  render(props) {
    if (this.context.id === null) {
      return <p>You must be logged in the view your lists</p>;
    } else
      return (
        <div className="list-view">
          <Lists />
          <div className="list-heading">
            <h2>{props.listName}</h2>
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
          <form className="add-item" onSubmit={e => this.handleSubmit(e)}>
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
      );
  }
}

export default withRouter(ListView);
