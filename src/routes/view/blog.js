const router = require("koa-router")();
const { loginRedirect } = require("../../middlewares/loginChecks");
const { getProfileBlogList } = require("../../controller/blog-profile");
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
module.exports = router;
