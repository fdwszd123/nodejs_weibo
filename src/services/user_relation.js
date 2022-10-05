/**
 * @description 用户关系
 */

const { User, UserRelation } = require("../db/model/index");
/**
 * 根据followerId获取粉丝列表
 */
async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ["id", "userName", "nickName", "picture"],
    order: [["id", "desc"]],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
        },
      },
    ],
  });
  let list = result.rows.map((row) => {
    return row.dataValues;
  });
  return {
    list,
    count: result.count,
  };
}
/**
 * 根据userId获取关注
 */
async function getFollowersByUserId(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["id", "userName", "nickName", "picture"],
      },
    ],
    where: {
      userId,
    },
  });

  let list = result.rows.map((row) => {
    return row.dataValues;
  });
  list = list.map((item) => {
    let user = item.user.dataValues;
    return user;
  });
  return {
    list,
    count: result.count,
  };
}

//添加关注
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId,
  });
  return result.dataValues;
}
//取消关注
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId,
    },
  });
  return result > 0;
}
module.exports = {
  getUsersByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUserId,
};
