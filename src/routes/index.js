const router = require("koa-router")();
const { loginRedirect, loginCheck } = require("../middleWares/loginChecks");
router.get("/", loginRedirect, async (ctx, next) => {
  //ejs渲染
  await ctx.render("index", {
    title: "Hello Koa 2!",
    name: "fantasy",
    isMe: true,
    blogList: [
      {
        id: 1,
        title: "aaa",
      },
      {
        id: 2,
        title: "aaa",
      },
      {
        id: 3,
        title: "aaa",
      },
    ],
  });
});

router.get("/string", loginCheck, async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", loginCheck, async (ctx, next) => {
  const session = ctx.session;
  if (session.count === null) {
    session.count = 0;
  }
  session.count++;
  ctx.body = {
    title: "koa2 json",
    count: session.count,
  };
});
router.get("/profile/:userName", async (ctx, next) => {
  const { userName } = ctx.params;
  ctx.body = {
    title: "this is a profile page",
    userName,
  };
});
router.get("/loadMore/:userName/:pageIndex", async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    title: "this is a loadMore page",
    userName,
    pageIndex,
  };
});
module.exports = router;
