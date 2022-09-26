/**
 * @description utils controller
 */
const path = require("path");
const fse = require("fs-extra");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { uploadSizeFailInfo } = require("../model/ErrorInfo");
const { v4: uuidV4 } = require("uuid");
const MAX_SIZE = 1024 * 1024 * 1024;
const DIST_FOLDER_PATH = path.join(__dirname, "..", "..", "uploadFiles");
fse.pathExists(DIST_FOLDER_PATH).then((exist) => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH);
  }
});

/**
 * @description 保存文件
 * @param {*} param0
 * @returns
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath);
    return new ErrorModel(uploadSizeFailInfo);
  }
  const fileName = uuidV4() + "." + name;
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
  await fse.move(filePath, distFilePath);
  return new SuccessModel({
    url: "/" + fileName,
  });
}

module.exports = {
  saveFile,
};
