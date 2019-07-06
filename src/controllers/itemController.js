const listQueries = require("../db/queries.items.js");
var cors = require("cors");

module.exports = {
  create(req, res, next) {
    let newItem = {
      description: req.body.description,
      list_id: req.params.list_id,
      max_budget: req.body.max_budget
    };
    itemQueries.addItem(newItem, (err, item) => {
      if (err) {
        console.log(err);
        res.json({ message: "That didn't work. Please try again" });
      } else {
        res.json({ item, message: "Item successfully added!" });
      }
    });
  }
};
