/**
 * @description user service
 */

const { User } = require("../db/model");

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName,
  };
  if (password) {
    Object.assign(whereOpt, { password });
  }
  const result = await User.findOne({
    where: whereOpt,
  });
  if (result === null) {
    return result;
  }
  return result.dataValues;
}

/**
 * 创建用户
 * @param {*} param0
 */

async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName || userName,
  });
  return result.dataValues;
}
module.exports = {
  getUserInfo,
  createUser,
};
