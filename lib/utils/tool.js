const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

/**
 * ejs模版编译
 * @param {String}  templateName    模版名字
 * @param {Object}  data            写入的数据
 */
const ejsCompile = (templateName, data) => {
  return new Promise((resolve, reject) => {
    // 拼接模版地址
    let templateDir = path.resolve(__dirname, `../template/${templateName}`);
    // 编译模版
    ejs.renderFile(templateDir, { data }, {}, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

/**
 * 创建文件路径
 * @param {String}} pathName 路径名
 */
const createDirSync = pathName => {
  // 判断地址是否存在
  if (fs.existsSync(pathName)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName); // 存在地址则创建图片
      return true;
    }
  }
};

/**
 * 写入文件
 * @param {String} path     绝对路径
 * @param {String} content  写入的内容
 */
const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content); // promise的方式写入文件
};

/**
 * 数组扁平化
 * @param {Array} arr 传入被扁平化的数组
 * @returns Array
 */
function flatten(arr) {
  // console.log('扁平化的数组',arr)
  let res = [];
  arr.map(item => {
    if (item.children && item.children.length != 0) {
      // 有子路由
      res.push(item);
      res = res.concat(flatten(item.children));
    } else {
      res.push(item);
    }
  });
  return res;
}

/**
 * 删除文件夹以及子文件夹的文件
 * @param {String} path 文件夹的绝对路径
 */
function deleteDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    if (fs.lstatSync(path).isDirectory()) {
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
        let curPath = path + '/' + file;
        if (fs.statSync(curPath).isDirectory()) {
          deleteDir(curPath); //递归删除文件夹
        } else {
          fs.unlinkSync(curPath); //删除文件
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path); //删除文件
    }
  } else {
    console.log('文件路径地址不存在');
  }
}

module.exports = {
  ejsCompile,
  createDirSync,
  writeToFile,
  flatten,
  deleteDir,
};
