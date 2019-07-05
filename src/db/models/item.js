"use strict";
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "Lists",
          key: "id",
          as: "list_id"
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      purchased: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      max_budget: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  Item.associate = function(models) {
    Item.belongsTo(models.List, {
      foreignKey: "list_id",
      onDelete: "CASCADE"
    });
  };
  return Item;
};
