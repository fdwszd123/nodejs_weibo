/**
 * @description 微博service
 */
const { Blog, User } = require("../db/model/index");
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
    return blogItem;
  });
  return {
    count: result.count,
    blogList,
  };
}
module.exports = {
  createBlog,
  getBlogListByUser,
};
