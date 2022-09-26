/*
 * @Autor: huasenjio
 * @Date: 2022-05-08 23:00:20
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-09-26 21:23:19
 * @Description:
 */
const inquirer = require('inquirer');

module.exports = inquirer.prompt([
  {
    type: 'input',
    name: 'routePath', // 交互中的用户的输入值
    message: 'Please enter the deleted routing address：', // 交互的信息提示
    // 用户输入值的校验
    validate: value => {
      if (/^\/[a-z]+(-[a-z]+)*$/.test(value)) {
        return true;
      }
      return '仅支持小写英文且以“/”开头（例如：/home 或 /site-manage）';
    },
  },

  {
    type: 'confirm',
    name: 'isRemovePage',
    message: 'Whether to delete the routing component file：',
    when: answer => {
      return answer.routePath;
    },
    default: true, // 默认值 string | number | boolean | [any] | Function;
  },
]);
