/**
 * @description 存储配置
 */
const { isProd } = require("../utils/env");
const REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
};
const MYSQL_CONF = {
  user: "root",
  password: "f11020304",
  database: "weibo_db",
  port: 3306,
  host: "localhost",
};
if (isProd) {
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1",
  };
  MYSQL_CONF = {
    user: "root",
    password: "f11020304",
    database: "weibo_db",
    port: 3306,
    host: "localhost",
  };
}
module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
};
