"use strict";
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    "List",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      group_id: DataTypes.INTEGER
    },
    {}
  );
  List.associate = function(models) {
    List.hasMany(models.Item, {
      foreignKey: "list_id",
      as: "items",
      onDelete: "CASCADE"
    });
    List.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE"
    });
  };
  return List;
};
