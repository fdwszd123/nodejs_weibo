/**
 * @description 微博 @ 关系
 */
const { AtRelation } = require("../db/model");
async function createAtRelation(blogId, userId) {
  debugger;
  const result = AtRelation.create({
    blogId,
    userId,
  });
  return result.dataValues;
}
//获取用户未读的@数量
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false,
    },
  });
  return result.count;
}
module.exports = {
  getAtRelationCount,
  createAtRelation,
};
