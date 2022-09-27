/**
 * @description user controller
 */

/**
 * 判断用户名是否存在
 * @param {string} userName
 */
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
  registerUserNameNotExist,
  registerUserNameExisted,
  registerFailInfo,
  loginFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo,
} = require("../model/ErrorInfo");
const { getUserInfo, createUser, updateUser } = require("../services/user");

const doCrypto = require("../utils/cryp");
/**
 *
 * @param {string} userName
 * @returns
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExist);
  }
}

async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    //用户名已存在
    return new ErrorModel(registerUserNameExisted);
  }
  try {
    await createUser({ userName, password: doCrypto(password), gender });
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 登录
 * @param {*} ctx
 * @param {*} userName
 * @param {*} password
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password));
  //success
  if (userInfo) {
    if (ctx.session.userInfo === undefined) {
      ctx.session.userInfo = userInfo;
    }
    return new SuccessModel();
  } else {
    return new ErrorModel(loginFailInfo);
  }
}
/**
 * 修改用户信息
 * @param {*} ctx ctx
 * @param {*} param1
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo;
  let result = await updateUser(
    { newNickName: nickName, newCity: city, newPicture: picture },
    { userName }
  );
  if (result) {
    Object.assign(ctx.session.userInfo, { nickName, city, picture });
    return new SuccessModel();
  }
  return new ErrorModel(changeInfoFailInfo);
}
/**
 * 修改密码
 * @param {*} param0
 */
async function changePassword({ userName, password, newPassword }) {
  debugger;
  const result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    { userName, password: doCrypto(password) }
  );
  if (result) {
    return new SuccessModel();
  }
  return new ErrorModel(changePasswordFailInfo);
}
async function logout(ctx) {
  delete ctx.session.userInfo;
  return new SuccessModel();
}
module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout,
};
