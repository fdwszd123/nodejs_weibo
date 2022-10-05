/**
 * @description 用户关系
 */
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo,
} = require("../model/ErrorInfo");
const {
  getUsersByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUserId,
} = require("../services/user_relation");
/**
 * 获取粉丝列表
 */
async function getFans(userId) {
  const result = await getUsersByFollower(userId);
  return new SuccessModel(result);
}
/**
 * 获取关注列表
 */
async function getFollowers(userId) {
  const result = await getFollowersByUserId(userId);
  return new SuccessModel(result);
}
/**
 * 关注
 * @param {*} myUserId  当前要关注的
 * @param {*} curUserId
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId);
    return new SuccessModel();
  } catch (ex) {
    return new ErrorModel(addFollowerFailInfo);
  }
}
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId);
  if (result) {
    return new SuccessModel();
  }
  return new ErrorModel(deleteFollowerFailInfo);
}
module.exports = {
  getFans,
  getFollowers,
  follow,
  unFollow,
};
