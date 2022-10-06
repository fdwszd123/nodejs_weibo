/**
 * @description 微博 @ 关系
 */
const { timeFormat, contentFormat } = require("../utils/format");

const { Blog, AtRelation, User } = require("../db/model");
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
//获取@用户的微博列表
async function getAtUserBlogList(userId, pageIndex = 0, pageSize = 5) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [["id", "desc"]],
    include: [
      {
        model: AtRelation,
        attributes: ["userId", "blogId"],
        where: {
          userId,
        },
      },
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
      },
    ],
  });
  let blogList = result.rows.map((row) => {
    return row.dataValues;
  });
  blogList.map((blog) => {
    blog.createdAtFormat = timeFormat(blog.createdAt);
    blog.contentFormat = contentFormat(blog.content);
    blog.user = blog.user.dataValues;
    return blog;
  });
  return {
    count: result.count,
    blogList,
  };
}
module.exports = {
  getAtUserBlogList,
  getAtRelationCount,
  createAtRelation,
};
