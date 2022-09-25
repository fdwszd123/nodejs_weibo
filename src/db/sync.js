/**
 * @description sequelize 同步数据库
 */
const sequelize = require("./sequelize");
require("./model");
sequelize
  .authenticate()
  .then(() => {
    console.log("sql 连接成功");
  })
  .catch(() => {
    console.log("sql 连接失败");
  });
// 执行同步
sequelize.sync({ force: true }).then(() => {
  console.log("同步成功");
  process.exit();
});
