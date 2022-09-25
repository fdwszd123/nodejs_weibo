/**
 * @description 用户模型
 */
const sequelize = require("../sequelize");
const { STRING, DECIMAL } = require("../types");
const User = sequelize.define("user", {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  nickName: {
    type: STRING,
    allowNull: false,
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: "1男 2女 3保密",
  },
  picture: {
    type: STRING,
  },
  city: {
    type: STRING,
  },
});

module.exports = User;
