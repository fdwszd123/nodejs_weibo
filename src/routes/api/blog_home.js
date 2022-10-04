/**
 * @description 微博首页路由
 */
const router = require("koa-router")();
const { create } = require("../../controller/blog_home");
const { loginCheck } = require("../../middlewares/loginChecks");
router.prefix("/api/blog");
router.post("/create", loginCheck, async (ctx, next) => {
  const { content, image } = ctx.request.body;
  const { id: userId } = ctx.session.userInfo;
  ctx.body = await create({ content, image, userId });
});
module.exports = router;
