/**
 * @description 用户关注关系
 */
const sequelize = require("../sequelize");
const { INTEGER } = require("../types");
const UserRelation = sequelize.define("user_relation", {
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
  },
});
module.exports = UserRelation;
