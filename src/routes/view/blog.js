const router = require("koa-router")();
const { loginRedirect } = require("../../middlewares/loginChecks");
const { getProfileBlogList } = require("../../controller/blog-profile");
const { getSquareBlogList } = require("../../controller/blog_square");
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

  await ctx.render("profile", {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count,
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
