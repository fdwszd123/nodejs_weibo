/**
 * @description at数据模型
 */
const sequelize = require("../sequelize");
const { BOOLEAN, INTEGER } = require("../types");
const AtRelation = sequelize.define("at_relation", {
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
  },
  isRead: {
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});
module.exports = AtRelation;
