/**
 * @description 微博缓存层
 */
const { get, set } = require("./_redis");
const { getBlogListByUser } = require("../services/blog");
//redis前缀
const KEY_PREFIX = "weibo:square";
//获取广场页面缓存
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;
  const cacheList = await get(key);
  if (cacheList != null) {
    return cacheList;
  }
  //没缓存读取数据库
  const result = await getBlogListByUser(null, pageIndex, pageSize);
  set(key, result, 60);
  return result;
}
module.exports = {
  getSquareCacheList,
};
