/**
 * @description 登录接口测试
 */
const server = require("../server");

const user = {
  userName: `u_${Date.now()}`,
  password: `p_${Date.now()}`,
  nickName: `n_${Date.now()}`,
  gender: 1,
};

//存储cookie
let COOKIE = "";
test("注册接口测试通过", async () => {
  const res = await server.post("/api/user/register").send(user);
  expect(res.body.errno).toBe(0);
});

test("重复注册应该失败通过", async () => {
  const res = await server.post("/api/user/register").send(user);
  expect(res.body.errno).not.toBe(0);
});

test("用户名是否已存在通过", async () => {
  const res = await server.post("/api/user/isExist").send({
    userName: user.userName,
  });
  expect(res.body.errno).toBe(0);
});

test("json schema 检测非法的格式应该失败", async () => {
  const res = await server.post("/api/user/register").send({
    userName: "123",
    password: "a",
  });
  expect(res.body.errno).not.toBe(0);
});

test("登录应该成功", async () => {
  const res = await server.post("/api/user/login").send({
    userName: user.userName,
    password: user.password,
  });
  expect(res.body.errno).toBe(0);
  COOKIE = res.headers["set-cookie"].join(";");
});
