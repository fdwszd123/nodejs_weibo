const Koa = require("koa");
const app = new Koa();
const path = require("path");
const koaStatic = require("koa-static");
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");

const userViewRouter = require("./routes/view/user");
const userApiRouter = require("./routes/api/user");
const utilsApiRouter = require("./routes/api/utils");
const blogViewRouter = require("./routes/view/blog");
const blogHomeApiRouter = require("./routes/api/blog_home");
const blogProfileApiRouter = require("./routes/api/blog_profile");
const errorViews = require("./routes/view/error");
const { REDIS_CONF } = require("./conf/db");
// error handler
const onerrorConf = {
  redirect: "/error",
};
onerror(app, onerrorConf);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(koaStatic(__dirname + "/public"));
app.use(koaStatic(path.join(__dirname, "..", "uploadFiles")));
//注册ejs的路径
app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
//session 配置

app.keys = ["Fanagudh_49494#$%"];
app.use(
  session({
    key: "weibo.sid", //cookie name
    prefix: "weibo:sess:", //redis key的前缀
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);
// routes
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods());

app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods());
app.use(blogHomeApiRouter.routes(), blogHomeApiRouter.allowedMethods());
app.use(blogProfileApiRouter.routes(), blogProfileApiRouter.allowedMethods());
app.use(errorViews.routes(), errorViews.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
