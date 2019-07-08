const listQueries = require("../db/queries.lists.js");
var cors = require("cors");

module.exports = {
  index(req, res, next) {
    listQueries.getAllLists(req.params.id, (err, lists) => {
      if (err) {
        console.log(err);
      } else {
        res.json(lists);
      }
      //adding server-sent-events to get all lists for user

      res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
      });
      setTimeout(() => {
        res.write("data:" + "this is the event source");
        res.write("\n\n");
      }, 10000);
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
