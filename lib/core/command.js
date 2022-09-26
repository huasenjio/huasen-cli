/*
 * @Autor: huasenjio
 * @Date: 2022-09-26 21:09:18
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-09-26 21:14:16
 * @Description: 命令行注册文件
 */

const program = require('commander');
const { createProjectAction, addPageAction, removePageAction } = require('./action');

// 终端指令：hs create xxx
const createProjectCommand = () => {
  program.command('create <projectName> [others...]').description('通过远程仓库模版进行构建项目').action(createProjectAction);
};

// 终端指令：hs page，根据选项添加页面，自动配置路由
const createPageCommand = () => {
  program.command('page [others...]').description('添加页面并且配置路由').action(addPageAction);
};

// 终端指令：hs remove xxx，删除页面文件，移除路由
const removePageCommand = () => {
  program.command('remove [others...]').description('移除页面并且删除路由').action(removePageAction);
};

// 终端指令：hs -V，查看脚手架版本
// 终端指令：hs -h，查看指令说明
const helpCommand = () => {
  program.version(require('../../package.json').version);
  program.parse(process.argv);
};

module.exports = {
  createProjectCommand,
  createPageCommand,
  removePageCommand,
  helpCommand,
};
