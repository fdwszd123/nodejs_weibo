/**
 * @description 个人主页
 */
/**
 * @description 微博首页路由
 */
const router = require("koa-router")();
const { loginCheck } = require("../../middlewares/loginChecks");
const { getProfileBlogList } = require("../../controller/blog_profile");
const { getBlogListStr } = require("../../utils/blog");
const { follow, unFollow } = require("../../controller/user_relation");
router.prefix("/api/profile");
router.get("/loadMore/:userName/:pageIndex", loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const result = await getProfileBlogList(userName, pageIndex);
  //渲染成html
  result.data.blogListTpl = getBlogListStr(result.data.blogList);
  ctx.body = result;
});

router.post("/follow", loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo;
  const { userId: curUserId } = ctx.request.body;
  ctx.body = await follow(myUserId, curUserId);
});

router.post("/unFollow", loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo;
  const { userId: curUserId } = ctx.request.body;
  ctx.body = await unFollow(myUserId, curUserId);
});
module.exports = router;
