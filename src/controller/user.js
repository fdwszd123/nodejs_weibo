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
} = require("../model/ErrorInfo");
const { getUserInfo, createUser } = require("../services/user");

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
module.exports = {
  isExist,
  register,
  login,
};
