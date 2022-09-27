/**
 * @description user service
 */

const { where } = require("sequelize");
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
/**
 * 修改用户信息
 * @param {*} param0  参数
 * @param {*} param1  条件
 */
async function updateUser(
  { newNickName, newCity, newPicture, newPassword },
  { userName, password }
) {
  let updateData = {};
  if (newNickName) {
    updateData.nickName = newNickName;
  }
  if (newCity) {
    updateData.city = newCity;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }
  if (newPassword) {
    updateData.password = newPassword;
  }
  let whereData = {
    userName,
  };
  if (password) {
    whereData.password = password;
  }
  const result = await User.update(updateData, {
    where: whereData,
  });
  return result[0] > 0; //修改的行数
}
module.exports = {
  getUserInfo,
  createUser,
  updateUser,
};
