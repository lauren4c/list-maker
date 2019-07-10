const Item = require("./models").Item;

module.exports = {
  addItem(newItem, callback) {
    return Item.create({
      description: newItem.description,
      list_id: newItem.list_id,
      max_budget: newItem.max_budget
    })
      .then(item => {
        callback(null, item);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteItem(id, callback) {
    return Item.findByPk(id)
      .then(item => {
        item.destroy().then(res => {
          callback(null, item);
        });
      })

      .catch(err => {
        callback(err);
      });
  },
  editItem(req, updatedItem, callback) {
    return Item.findByPk(req.params.id).then(item => {
      if (!item) {
        return callback("Item does not exist");
      } else {
        item
          .update(updatedItem, {
            fields: Object.keys(updatedItem)
          })
          .then(() => {
            callback(null, item);
          })
          .catch(err => {
            callback(err);
          });
      }
    });
  }
};
