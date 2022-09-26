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
    errno: 10009,
    message: "数据格式校验失败",
  },
  loginFailInfo: {
    errno: 10004,
    message: "登录失败,用户名或者密码错误",
  },
  loginCheckFailInfo: {
    errno: 10005,
    message: "您尚未登录",
  },
  uploadSizeFailInfo: {
    errno: 10007,
    message: "文件不能超过1M",
  },
};
