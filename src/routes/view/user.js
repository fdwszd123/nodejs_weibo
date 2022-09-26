/**
 * @description 用户相关页面
 */

const { loginRedirect } = require("../../middlewares/loginChecks");
function getUserInfo(ctx) {
  let data = {
    isLogin: false,
  };
  const userInfo = ctx.session.userInfo;
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName,
    };
  }
  return data;
}
const router = require("koa-router")();
router.get("/login", async (ctx, next) => {
  await ctx.render("login", getUserInfo(ctx));
});
router.get("/register", async (ctx, next) => {
  await ctx.render("register", getUserInfo(ctx));
});
router.get("/setting", loginRedirect, async (ctx, next) => {
  await ctx.render("setting", ctx.session.userInfo);
});
module.exports = router;
