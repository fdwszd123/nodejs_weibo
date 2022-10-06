/**
 * @description 微博首页路由
 */
const router = require("koa-router")();
const { create, getHomeBlogList } = require("../../controller/blog_home");
const { loginCheck } = require("../../middlewares/loginChecks");
const { genValidator } = require("../../middleWares/validate");
const blogValidate = require("../../validator/blog");
const { getBlogListStr } = require("../../utils/blog");

router.prefix("/api/blog");
router.post(
  "/create",
  loginCheck,
  genValidator(blogValidate),
  async (ctx, next) => {
    const { content, image } = ctx.request.body;
    const { id: userId } = ctx.session.userInfo;
    ctx.body = await create({ content, image, userId });
  }
);

// 加载更多
router.get("/loadMore/:pageIndex", loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const { id: userId } = ctx.session.userInfo;
  const result = await getHomeBlogList(userId, pageIndex);
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList);

  ctx.body = result;
});
module.exports = router;
