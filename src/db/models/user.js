"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { msg: "must be a valid email" }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      group_id: DataTypes.INTEGER
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.List, {
      foreignKey: "user_id",
      as: "lists"
    });
  };
  return User;
};
