import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../Auth";
import AddList from "./addlist";
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
    this.handleItemRename = this.handleItemRename.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/lists/user/${this.context.id}`).then(res => {
      this.setState({ lists: res.data });
    });
    this.userListGetter();
  }

  userListGetter() {
    let that = this;
    (function listLoop() {
      setTimeout(function() {
        axios.get(`/api/lists/user/${that.context.id}`).then(res => {
          that.setState({ lists: res.data });
          listLoop();
        });
      }, 1000);
    })();
  }

  setActiveList(id) {
    this.setState({ activeList: id }, () => this.listItemGetter());
  }

  listItemGetter() {
    axios.get(`/api/lists/${this.state.activeList}`).then(res => {
      this.setState({
        listName: res.data.list.name,
        items: res.data.list.items
      });
    });
    let that = this;
    (function itemLoop() {
      setTimeout(function() {
        axios.get(`/api/lists/${that.state.activeList}`).then(res => {
          that.setState({
            listName: res.data.list.name,
            items: res.data.list.items
          });
          itemLoop();
        });
      }, 1000);
    })();
  }
  handleDescription(event) {
    this.setState({ itemDescription: event.target.value });
  }

  handleAddItem(event) {
    event.preventDefault();
    event.target.reset();

    const newItem = {
      description: this.state.itemDescription,
      list_id: this.state.activeList
    };
    axios
      .post(`/api/lists/${this.state.activeList}/items/new`, newItem)
      .then(res => {
        if (
          JSON.stringify(res.data.message).includes("successfully") === true
        ) {
          console.log("item added!");
        }
      });
  }

  showListItems() {
    if (this.state.activeList === "") {
      return;
    } else if (this.state.activeList !== "" && this.state.items === []) {
      return <h3>No Items here. Let's add some!</h3>;
    } else {
      return (
        <div className="all-items">
          {this.state.items.map(item => (
            <div className="item">
              <label className="check-container" key={item.id}>
                {item.description}
                <input
                  type="checkbox"
                  checked={item.purchased}
                  onChange={this.handleCheckbox.bind(
                    this,
                    item.id,
                    !item.purchased
                  )}
                />
                <span class="checkmark" />
              </label>
              <div className="item-edit-delete">
                <span onClick={this.handleItemRename.bind(this, item.id)}>
                  Edit
                </span>
                /
                <span onClick={this.handleItemDelete.bind(this, item.id)}>
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
              <input type="submit" value="+" className="add-button" />
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
        if (
          JSON.stringify(res.data.message).includes("successfully") === true
        ) {
          console.log("item updated!");
        }
      });
  }
  handleListDelete() {
    if (window.confirm("Are you sure you want to delete this list?")) {
      this.setState({ activeList: "", listName: "", items: [] });
      axios.post(`/api/lists/${this.state.activeList}/delete`).then(res => {
        if (JSON.stringify(res.data.message).includes("successfully")) {
          console.log("list deleted!");
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
    if (this.state.lists.length === 0) {
      return <h3>No Lists here. Create a new one!</h3>;
    } else
      return (
        <div className="all-lists">
          {this.state.lists.map(list => (
            <div className="list-name" key={list.id}>
              <button
                className="list-button"
                id={list.id === this.state.activeList ? "selected" : ""}
                onClick={this.setActiveList.bind(this, list.id)}
              >
                {list.name}
              </button>
            </div>
          ))}
        </div>
      );
  }

  showBasedOnActiveList() {
    if (this.state.activeList === "" && this.state.lists.length !== 0) {
      return <h4>Select a list from above to add or check-off items</h4>;
    } else if (this.state.activeList !== "") {
      return (
        <div className="delete-rename">
          <p onClick={() => this.handleListRename()}>Rename List</p>
          <p> / </p>
          <p onClick={() => this.handleListDelete()}>Delete List</p>
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
          <div>{this.listResults()}</div>
          <AddList />
          <div className="list-view">
            <div className="list-heading">
              <h2>{this.state.listName}</h2>
              {this.showBasedOnActiveList()}
            </div>
            {this.showListItems()}
          </div>
        </Router>
      );
  }
}

export default Lists;
