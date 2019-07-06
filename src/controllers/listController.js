const listQueries = require("../db/queries.lists.js");
var cors = require("cors");

module.exports = {
  index(req, res, next) {
    listQueries.getAllLists((err, lists) => {
      if (err) {
        console.log(err);
      } else {
        res.json(lists);
      }
    });
  },

  create(req, res, next) {
    let newList = {
      name: req.body.name,
      user_id: req.body.user_id
    };
    listQueries.addList(newList, (err, list) => {
      if (err) {
        console.log(err);
        res.json({ message: "That didn't work. Please try again" });
      } else {
        res.json({ list, message: "List successfully created!" });
      }
    });
  },
  show(req, res, next) {
    listQueries.getList(req.params.id, (err, list) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ list });
      }
    });
  },
  destroy(req, res, next) {
    listQueries.deleteList(req.params.id, (err, list) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: "List successfully deleted!" });
      }
    });
  },
  update(req, res, next) {
    listQueries.editList(req, req.body, (err, list) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ list, message: "List successfully updated!" });
      }
    });
  }
};
