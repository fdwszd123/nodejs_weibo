/**
 * @description 首页controller
 */
const { createBlog, getFollowersBlogList } = require("../services/blog");
const xss = require("xss");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlogFailInfo } = require("../model/ErrorInfo");
async function create({ userId, content, image }) {
  try {
    const blog = createBlog({ userId, content: xss(content), image });
    return new SuccessModel(blog);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createBlogFailInfo);
  }
}
//获取首页微博列表
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList(userId, pageIndex, 5);
  const { count, blogList } = result;
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageIndex,
    count,
    pageSize: 5,
  });
}
module.exports = {
  create,
  getHomeBlogList,
};
