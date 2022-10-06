/**
 * @description 微博service
 */
const { timeFormat, contentFormat } = require("../utils/format");
const { Blog, User, UserRelation } = require("../db/model/index");
async function createBlog({ userId, image, content }) {
  const result = await Blog.create({
    image,
    userId,
    content,
  });
  return result.dataValues;
}
async function getBlogListByUser(userName, pageIndex = 0, pageSize = 10) {
  let whereOpts = {};
  if (userName) {
    whereOpts.userName = userName;
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
        where: whereOpts,
      },
    ],
  });
  let blogList = result.rows.map((row) => {
    return row.dataValues;
  });
  blogList = blogList.map((blogItem) => {
    let user = blogItem.user.dataValues;
    blogItem.user = user;
    blogItem.createdAtFormat = timeFormat(blogItem.createdAt);
    blogItem.contentFormat = contentFormat(blogItem.content);

    return blogItem;
  });
  return {
    count: result.count,
    blogList,
  };
}

//获取关注者的微博列表
async function getFollowersBlogList(userId, pageIndex = 0, pageSize = 10) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName", "picture"],
      },
      {
        model: UserRelation,
        attributes: ["userId", "followerId"],
        where: {
          userId,
        },
      },
    ],
  });

  let blogList = result.rows.map((row) => {
    return row.dataValues;
  });
  blogList = blogList.map((item) => {
    item.user = item.user.dataValues;
    item.createdAtFormat = timeFormat(item.createdAt);
    item.contentFormat = contentFormat(item.content);
    return item;
  });
  return {
    count: result.count,
    blogList,
  };
}
module.exports = {
  createBlog,
  getFollowersBlogList,
  getBlogListByUser,
};
