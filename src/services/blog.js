/**
 * @description 微博service
 */
const { Blog } = require("../db/model/index");
async function createBlog({ userId, image, content }) {
  const result = await Blog.create({
    image,
    userId,
    content,
  });
  return result.dataValues;
}
module.exports = {
  createBlog,
};
