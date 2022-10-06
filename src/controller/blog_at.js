/**
 * @description at controller
 */
const {
  getAtRelationCount,
  getAtUserBlogList,
} = require("../services/at_relation");
const { SuccessModel } = require("../model/ResModel");
//获取艾特我的次数
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId);
  return new SuccessModel({ count });
}
//获取at用户的微博列表
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList(userId, pageIndex);
  return new SuccessModel(result);
}
module.exports = {
  getAtMeBlogList,
  getAtMeCount,
};
