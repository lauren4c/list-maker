const Item = require("./models").Item;

module.exports = {
  addItem(newItem, callback) {
    return Item.create({
      description: newList.description,
      list_id: newList.list_id
    })
      .then(item => {
        callback(null, item);
      })
      .catch(err => {
        callback(err);
      });
  }
};
