/*
 * @Autor: huasenjio
 * @Date: 2022-05-06 23:55:47
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-09-26 21:08:04
 * @Description:
 */

const program = require('commander');
const { createProjectAction, addPageAction } = require('./action');

// 终端指令：hs create xxx
const createProjectCommand = () => {
  program.command('create <projectName> [others...]').description('通过远程仓库模版进行构建项目').action(createProjectAction);
};

// 终端指令：hs page
const createPageCommand = () => {
  program.command('page [others...]').description('添加页面并且配置路由').action(addPageAction);
};

module.exports = {
  createProjectCommand,
  createPageCommand,
};
