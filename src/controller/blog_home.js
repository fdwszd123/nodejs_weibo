/**
 * @description 首页controller
 */
const { createBlog, getFollowersBlogList } = require("../services/blog");
const xss = require("xss");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { createBlogFailInfo } = require("../model/ErrorInfo");
const { getUserInfo } = require("../services/user");
const { createAtRelation } = require("../services/at_relation");
async function create({ userId, content, image }) {
  //content中是否有@相关的内容
  const userNameList = [];
  const REG = /@(.+?)\s-\s(\w+?)\b/g;
  content = content.replace(REG, (matchStr, nickName, userName) => {
    userNameList.push(userName);
    return matchStr; //不改变content
  });
  // 根据用户名查询用户信息
  const atUserList = await Promise.all(
    userNameList.map((userName) => {
      return getUserInfo(userName);
    })
  );
  // 获取用户ID
  const atUserIdList = atUserList.map((user) => {
    return user.id;
  });

  try {
    const blog = await createBlog({ userId, content: xss(content), image });
    // 创建@的关系
    await Promise.all(
      atUserIdList.map((userId) => {
        return createAtRelation(blog.id, userId);
      })
    );
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
