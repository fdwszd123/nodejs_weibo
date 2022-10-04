/**
 * @description 微博数据模型
 */
const sequelize = require("../sequelize");
const { STRING, INTEGER, TEXT } = require("../types");
const Blog = sequelize.define("blog", {
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  content: {
    type: TEXT,
    allowNull: false,
  },
  image: {
    type: STRING,
  },
});
module.exports = Blog;
