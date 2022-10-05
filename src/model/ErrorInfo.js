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
  changePasswordFailInfo: {
    errno: 10006,
    message: "修改密码失败",
  },
  uploadSizeFailInfo: {
    errno: 10007,
    message: "文件不能超过1M",
  },
  changeInfoFailInfo: {
    errno: 10008,
    message: "修改信息基本信息失败",
  },
  createBlogFailInfo: {
    errno: 11001,
    message: "创建微博失败",
  },
  addFollowerFailInfo: {
    errno: 10011,
    message: "添加关注失败",
  },
  deleteFollowerFailInfo: {
    errno: 10012,
    message: "取消关注失败",
  },
};
