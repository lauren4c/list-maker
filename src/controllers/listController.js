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
  }
};
