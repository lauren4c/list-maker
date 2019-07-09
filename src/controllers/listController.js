const listQueries = require("../db/queries.lists.js");
var cors = require("cors");
const List = require("../db/models").List;

module.exports = {
  index(req, res, next) {
    listQueries.getAllLists(req.params.id, (err, lists) => {
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
    List.findOne({
      where: { name: newList.name, user_id: newList.user_id }
    }).then(list => {
      if (list) {
        res.json({
          message: "That list already exists. Please choose a new name"
        });
      } else {
        listQueries.addList(newList, (err, list) => {
          if (err) {
            console.log(err);
            res.json({ message: "That didn't work. Please try again" });
          } else {
            res.json({ list, message: "List successfully created!" });
          }
        });
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
