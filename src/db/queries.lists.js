const List = require("./models").List;
const Item = require("./models").Item;

module.exports = {
  getAllLists(id, callback) {
    return List.findAll({ where: { user_id: id }, order: [["name", "ASC"]] })
      .then(lists => {
        callback(null, lists);
      })
      .catch(err => {
        callback(err);
      });
  },
  addList(newList, callback) {
    return List.create({
      name: newList.name,
      user_id: newList.user_id
    })
      .then(list => {
        callback(null, list);
      })
      .catch(err => {
        callback(err);
      });
  },
  getList(id, callback) {
    return List.findByPk(id, {
      include: [
        {
          model: Item,
          as: "items"
        }
      ],
      order: [[{ model: Item, as: "items" }, "createdAt", "ASC"]]
    })
      .then(list => {
        callback(null, list);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteList(id, callback) {
    return List.findByPk(id)
      .then(list => {
        list.destroy().then(res => {
          callback(null, list);
        });
      })

      .catch(err => {
        callback(err);
      });
  },
  editList(req, newName, callback) {
    return List.findByPk(req.params.id).then(list => {
      let updatedName = Object.keys(newName).toString();
      if (!list) {
        return callback("List does not exist");
      } else {
        list
          .update({
            name: updatedName
          })
          .then(() => {
            callback(null, list);
          })
          .catch(err => {
            callback(err);
          });
      }
    });
  }
};
