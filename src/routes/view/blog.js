const router = require("koa-router")();
const { loginRedirect } = require("../../middlewares/loginChecks");
const { getProfileBlogList } = require("../../controller/blog_profile");
const { getSquareBlogList } = require("../../controller/blog_square");
const { getFans, getFollowers } = require("../../controller/user_relation");
const { isExist } = require("../../controller/user");
const { getHomeBlogList } = require("../../controller/blog_home");
const { getAtMeCount } = require("../../controller/blog_at");
// 首页
router.get("/", loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo;
  const { id: userId } = userInfo;
  //获取粉丝
  const fansInfo = await getFans(userId);
  const fansData = fansInfo.data;
  //获取关注人
  const followersInfo = await getFollowers(userId);
  const followersData = followersInfo.data;
  //获取第一页数据
  const blogInfo = await getHomeBlogList(userId);
  const blogData = blogInfo.data;
  //获取at的数量
  const atInfo = await getAtMeCount(userId);
  const atCount = atInfo.data.count;
  await ctx.render("index", {
    userData: {
      userInfo,
      fansData,
      followersData,
      atCount,
    },
    blogData,
  });
});
router.get("/profile", loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  await ctx.redirect(`/profile/${userName}`);
});
router.get("/profile/:userName", loginRedirect, async (ctx, next) => {
  const { userName } = ctx.params;
  const result = await getProfileBlogList(userName);
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;

  let curUserInfo;
  const myUserInfo = ctx.session.userInfo;
  const myUserName = myUserInfo.userName;
  const { userName: curUserName } = ctx.params;
  const isMe = myUserName === curUserName;
  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo;
  } else {
    // 不是当前登录用户
    const existResult = await isExist(curUserName);
    if (existResult.errno !== 0) {
      // 用户名不存在
      return;
    }
    // 用户名存在
    curUserInfo = existResult.data;
  }

  //获取粉丝
  const fansInfo = await getFans(curUserInfo.id);
  const fansData = fansInfo.data;
  //获取关注人列表
  const followersInfo = await getFollowers(curUserInfo.id);
  const followersData = followersInfo.data;
  // 我是否关注此人
  const amIFollowed = fansData.list.some((item) => {
    return item.userName === myUserName;
  });
  //获取at的数量
  const atInfo = await getAtMeCount(curUserInfo.id);
  const atCount = atInfo.data.count;
  await ctx.render("profile", {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData,
      amIFollowed,
      followersData,
      atCount,
    },
  });
});

// 广场
router.get("/square", loginRedirect, async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0);
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {};

  await ctx.render("square", {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
    },
  });
});
module.exports = router;
