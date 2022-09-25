/**
 * @description 返回体格式
 */
/**
 * 基础返回体
 */
class BaseModel {
  constructor({ errno, data, message }) {
    this.errno = errno;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

/**
 * 成功返回体
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data,
    });
  }
}

/**
 * 失败的返回体
 */
class ErrorModel extends BaseModel {
  constructor({ errno, message }) {
    super({ errno, message });
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
