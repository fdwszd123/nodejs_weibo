/**
 * @description 首页controller
 */
const { createBlog } = require("../services/blog");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlogFailInfo } = require("../model/ErrorInfo");
async function create({ userId, content, image }) {
  try {
    const blog = createBlog({ userId, content, image });
    return new SuccessModel(blog);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createBlogFailInfo);
  }
}
module.exports = {
  create,
};
