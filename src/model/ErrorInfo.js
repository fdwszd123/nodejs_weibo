/**
 * @description 失败信息集合
 */
module.exports = {
  registerUserNameNotExist: {
    errno: 10003,
    message: "用户名未存在",
  },
  registerUserNameExisted: {
    errno: 10001,
    message: "用户名已存在",
  },
  registerFailInfo: {
    errno: 10002,
    message: "注册失败",
  },
  jsonSchemaFailInfo: {
    errno: 1009,
    message: "数据格式校验失败",
  },
};
