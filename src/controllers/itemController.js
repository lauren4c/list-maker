const itemQueries = require("../db/queries.items.js");
var cors = require("cors");

module.exports = {
  create(req, res, next) {
    let newItem = {
      description: req.body.description,
      list_id: req.body.list_id,
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
  },
  destroy(req, res, next) {
    itemQueries.deleteItem(req.params.id, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: "Item successfully deleted!" });
      }
    });
  },
  update(req, res, next) {
    itemQueries.editItem(req, req.body, (err, item) => {
      console.log(req.body);
      if (err) {
        console.log(err);
      } else {
        res.json({ item, message: "Item successfully updated!" });
      }
    });
  }
};
