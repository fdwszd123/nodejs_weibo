/**
 * @description 微博数据格式校验
 */

const _validate = require("./_validate");
const SCHEMA = {
  type: "object",
  properties: {
    content: {
      type: "string",
    },
    image: {
      type: "string",
      maxLength: 255,
    },
  },
};

function blogValidate(data = {}) {
  return _validate(SCHEMA, data);
}

module.exports = blogValidate;
