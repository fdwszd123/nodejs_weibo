/**
 * @description 广场页
 */
const { SuccessModel } = require("../model/ResModel");
const { getSquareCacheList } = require("../cache/blog");
async function getSquareBlogList(pageIndex = 0) {
  const result = await getSquareCacheList(pageIndex, 5);
  const blogList = result.blogList;
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: 5,
    pageIndex,
    count: result.count,
  });
}
module.exports = {
  getSquareBlogList,
};
