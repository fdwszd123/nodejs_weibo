/**
 * @description sequlelize实例
 */
const { MYSQL_CONF } = require("../conf/db");
const { user, password, host, database } = MYSQL_CONF;
const { isProd, isTest } = require("../utils/env");
const Sequelize = require("sequelize");
const conf = {
  host: host,
  dialect: "mysql",
};
if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000,
  };
}
if (isTest) {
  conf.logging = () => {};
}
const sequelize = new Sequelize(database, user, password, conf);

module.exports = sequelize;
