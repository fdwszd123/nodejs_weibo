/**
 * @description jsonSchema 验证中间件
 */

const { ErrorModel } = require("../model/ResModel");
const { jsonSchemaFailInfo } = require("../model/ErrorInfo");
function genValidator(validatorFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body;
    const error = validatorFn(data);
    if (error) {
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFailInfo);
      return;
    }
    await next();
  }
  return validator;
}
module.exports = { genValidator };
