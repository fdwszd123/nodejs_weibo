/**
 * @description user 接口
 */
const router = require("koa-router")();
const { getFollowers } = require("../../controller/user_relation");
const {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout,
} = require("../../controller/user");
const { genValidator } = require("../../middleWares/validate");
const { loginCheck } = require("../../middlewares/loginChecks");
const userValidate = require("../../validator/user");
router.prefix("/api/user");
//注册
router.post("/register", genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  ctx.body = await register({ userName, password, gender });
});
//用户名是否存在
router.post("/isExist", async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
});
//登录
router.post("/login", async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, userName, password);
});

//修改个人信息
router.patch(
  "/changeInfo",
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body;
    ctx.body = await changeInfo(ctx, { nickName, city, picture });
  }
);
//修改密码
router.patch(
  "/changePassword",
  loginCheck,
  genValidator(userValidate),
  async (ctx, next) => {
    const { password, newPassword } = ctx.request.body;
    const { userName } = ctx.session.userInfo;
    ctx.body = await changePassword({ userName, password, newPassword });
  }
);
//获取at列表
router.get("/getAtList", loginCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  const result = await getFollowers(userId);
  let { list } = result.data;
  list = list.map((user) => {
    return `${user.nickName} - ${user.userName}`;
  });
  ctx.body = list;
});
router.post("/logout", loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx);
});
module.exports = router;
