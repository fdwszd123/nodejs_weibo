/**
 * @description at controller
 */
const { getAtRelationCount } = require("../services/at_relation");
const { SuccessModel } = require("../model/ResModel");
//获取艾特我的次数
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId);
  return new SuccessModel({ count });
}
module.exports = {
  getAtMeCount,
};
