/**
 * @description 连接redis的方法
 */
const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");
const { port, host } = REDIS_CONF;
//创建客户端
const redisClient = redis.createClient(port, host);
redisClient.on("error", (err) => {
  console.error("redis error", err);
});
/**
 * redis set
 * @param {string} key
 * @param {string} val
 * @param {number} timeout
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (err) {
        resolve(val);
      }
    });
  });
  return promise;
}
module.exports = {
  get,
  set,
};
