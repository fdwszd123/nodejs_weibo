/**
 * @description utils   api 路由
 */
const { loginCheck } = require("../../middlewares/loginChecks");
const { saveFile } = require("../../controller/utils");
const router = require("koa-router")();
const koaFrom = require("formidable-upload-koa");
router.prefix("/api/utils");
router.post("/upload", loginCheck, koaFrom(), async (ctx, next) => {
  const file = ctx.req.files["file"];
  const { size, path, name, type } = file;
  ctx.body = await saveFile({
    size,
    name,
    type,
    filePath: path,
  });
});
module.exports = router;
