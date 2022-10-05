const router = require("koa-router")();
const { loginRedirect } = require("../../middlewares/loginChecks");
const { getProfileBlogList } = require("../../controller/blog_profile");
const { getSquareBlogList } = require("../../controller/blog_square");
const { getFans } = require("../../controller/user_relation");
const { isExist } = require("../../controller/user");
// 首页
router.get("/", loginRedirect, async (ctx, next) => {
  await ctx.render("index");
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

  // 我是否关注此人
  const amIFollowed = fansData.list.some((item) => {
    return item.userName === myUserName;
  });
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
