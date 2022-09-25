/**
 * @description userModel  test
 */
const { User } = require("../../src/db/model");
test("userModel 各个属性符合预期", () => {
  //build会构建在内存中不会提交到数据库
  const user = User.build({
    userName: "zhangsan",
    password: "147852",
    nickName: "张三",
    picture: "xxxx.com",
    city: "西安",
  });
  expect(user.userName).toBe("zhangsan");
  expect(user.password).toBe("147852");
  expect(user.nickName).toBe("张三");
  expect(user.picture).toBe("xxxx.com");
  expect(user.city).toBe("西安");
  expect(user.gender).toBe(3);
});
