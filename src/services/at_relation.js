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

module.exports = {
  createAtRelation,
};
