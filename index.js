#! /usr/bin/env node
const program = require('commander');
const { createProjectCommand, createPageCommand, removePageCommand, helpCommand } = require('./lib/core/command.js');

helpCommand(); // 帮助和可选信息
createProjectCommand(); // 创建项目指令
createPageCommand(); // 创建页面指令
removePageCommand(); // 删除页面命令

program.parse(process.argv);
