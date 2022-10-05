/**
 * @description 用户关系
 */
const { SuccessModel } = require("../model/ResModel");

const { getUsersByFollower } = require("../services/user_relation");
/**
 * 获取粉丝列表
 */
async function getFans(userId) {
  const result = await getUsersByFollower(userId);
  return new SuccessModel(result);
}
module.exports = {
  getFans,
};
