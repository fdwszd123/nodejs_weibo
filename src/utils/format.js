/**
 * @description 时间相关的工具函数
 */

const { format } = require("date-fns");

/**
 * 格式化时间，如 09.05 23:02
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
  return format(new Date(str), "MM.dd HH:mm");
}
function contentFormat(str) {
  const REG = /@(.+?)\s-\s(\w+?)\b/g;
  str = str.replace(REG, (matchStr, nickName, userName) => {
    return `<a href="/profile/${userName}">@${nickName}</a>`;
  });
  return str;
}
module.exports = {
  timeFormat,
  contentFormat,
};
