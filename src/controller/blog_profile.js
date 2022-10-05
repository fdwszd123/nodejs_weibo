/**
 * @description 个人主页
 */
const { getBlogListByUser } = require("../services/blog");
const { SuccessModel, ErrorModel } = require("../model/ResModel");

//获取个人主页微博列表
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser(userName, pageIndex);
  const { count, blogList } = result;
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    count,
    pageSize: 10,
    pageIndex,
  });
}
module.exports = {
  getProfileBlogList,
};
