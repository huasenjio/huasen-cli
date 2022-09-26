const download = require('download-git-repo');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// 导入仓库源的配置项
const { vueRepo } = require('../config/repo-config');
const { commandSpawn } = require('../utils/terminal');
const { ejsCompile, writeToFile, createDirSync, flatten, deleteDir } = require('../utils/tool');

const createProjectAction = async (projectName, others) => {
  // 完成文档交互模式
  const createInquirer = require('../inquirer/createProjectInquirer');
  let projectConfigObj = await createInquirer;
  if (projectConfigObj.templateType === 'vue') {
    try {
      // git clone 项目
      console.log('..开始进行拉取项目..');
      // github中下载的项目
      await new Promise((resolve, reject) => {
        download(vueRepo, projectName, { clone: true }, function (error) {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      // 写入配置签名文件
      writeToFile(path.resolve(process.cwd(), `./${projectName}/hs.config.json`), JSON.stringify(projectConfigObj, null, 3));
      // 是否开启Eslint功能
      if (!projectConfigObj.isESlint) {
        let packagePath = path.resolve(process.cwd(), `./${projectName}/package.json`);
        // 读取package.json文件，删除eslint:recommended配置，移除eslint校验
        const packageObj = require(packagePath);
        packageObj.eslintConfig.extends = packageObj.eslintConfig.extends.filter(item => {
          return item != 'eslint:recommended';
        });
        // 重新写入package.json文件
        writeToFile(path.resolve(process.cwd(), `./${projectName}/package.json`), JSON.stringify(packageObj, null, 3));
      }

      // 是否自动运行
      if (projectConfigObj.isRun) {
        // 安装依赖
        console.log('..开始进行安装依赖..');
        let command = process.platform == 'win32' || process.platform == 'win64' ? 'npm.cmd' : 'npm';
        // npm install
        await commandSpawn(command, ['install'], { cwd: `./${projectName}` });
        // npm run serve
        await commandSpawn(command, ['run', 'serve'], { cwd: `./${projectName}` });
      }
      console.log('..本地项目已初始化..');
    } catch (err) {
      console.log('..抱歉创建项目失败..', err);
    }
  } else {
    console.log('..暂不支持其他构建..');
  }
};

const addPageAction = async (pageName, others) => {
  // 加载路由文件
  const routes = require(`${process.cwd()}/src/config/router.config.json`);
  // 交互
  const createPageInquirer = require('../inquirer/createPageInquirer'); // 交互性文件
  let routeConfigObj = await createPageInquirer;
  // 1.初始化数据并且使用ejs编译vue文件
  const pageData = { name: routeConfigObj.routeName, cpnName: routeConfigObj.routeName, styleName: _.kebabCase(routeConfigObj.routeName) }; // 初始化渲染数据
  const pageResult = await ejsCompile('cpn.vue.ejs', pageData);
  // 2.处理路由文件
  const isExitRoute = flatten(routes).some(item => {
    return item.path == routeConfigObj.routePath;
  });
  if (isExitRoute) {
    console.log('..路由地址已被占用..');
  } else {
    routes.push({
      path: routeConfigObj.routePath,
      name: routeConfigObj.routeName,
      menuCode: routeConfigObj.menuCode,
      component: `${_.kebabCase(routeConfigObj.routeName)}/${routeConfigObj.routeName}`, // 通过此项遍历获得组件
      title: routeConfigObj.routeTitle,
      children: routeConfigObj.isChildren ? JSON.parse(routeConfigObj.inputChildren) : [],
    });
    const routerResult = JSON.stringify(routes, null, 3);
    // 3.拼接写入地址
    const pageDir = path.resolve('./', `src/views/${_.kebabCase(routeConfigObj.routeName)}`);
    const routerDir = path.resolve('./', `src/config`);
    // 4.生成文件夹，写入对应地址
    if (createDirSync(pageDir) && createDirSync(routerDir)) {
      let targetPagePath = `${pageDir}/${routeConfigObj.routeName}.vue`;
      let targetRouterPath = `${routerDir}/router.config.json`;
      // 判断路由组件是否存在，若已经存在则不写入，防止新文件覆盖，酿成不良后果。
      fs.exists(targetPagePath, isExit => {
        if (!isExit) {
          writeToFile(targetPagePath, pageResult);
          writeToFile(targetRouterPath, routerResult);
        } 
      });
    }
  }
};

const removePageAction = async (pageName, others) => {
  const routes = require(`${process.cwd()}/src/config/router.config.json`);
  // 交互
  const removePageInquirer = require('../inquirer/removePageInquirer'); // 交互性文件
  let removeRouteConfig = await removePageInquirer;
  // 定义递归方法
  function getTargetRoute(routes) {
    for (let [index, item] of Object.entries(routes)) {
      let p = /^\//.test(item.path) ? item.path : `/${item.path}`;
      if (p == removeRouteConfig.routePath) {
        return routes.splice(index, 1)[0];
      } else {
        if (item.children && item.children.lenght != 0) {
          let flag = getTargetRoute(item.children);
          if (flag) return flag;
        }
      }
    }
  }
  // 递归遍历到需要删除的路由
  const targetRoute = getTargetRoute(routes);
  // 判断是否需要删除对应页面，删除父级路由会删除所有子路由，
  if (removeRouteConfig.isRemovePage) {
    if (targetRoute) {
      targetRoute.children = Array.isArray(targetRoute.children) ? targetRoute.children : [];
      if (!/\//.test(targetRoute.path)) {
        // 处理子路由
        if (targetRoute.children.length == 0) {
          deleteDir(path.resolve(process.cwd(), `src/views/${targetRoute.component}.vue`));
        } else {
          deleteDir(path.resolve(process.cwd(), `src/views/${targetRoute.component}.vue`));
          // 递归删除子路由中的路由
          dele(targetRoute.children);
        }
        // 定义递归方法
        function dele(arr) {
          arr.map(item => {
            item.children = Array.isArray(item.children) ? item.children : [];
            if (item.children && item.children.length == 0) {
              deleteDir(path.resolve(process.cwd(), `src/views/${item.component}.vue`));
            } else {
              dele(item.children);
            }
          });
        }
      } else {
        // 删除对应的页面文件夹
        deleteDir(path.resolve(process.cwd(), `src/views/${targetRoute.component.split('/').splice(-2, 1)}`));
      }
    } else {
      console.log('..删除的地址不存在..');
    }
  }
  // 更新路由
  writeToFile(path.resolve(process.cwd(), `src/config/router.config.json`), JSON.stringify(routes, null, 3));
};

module.exports = {
  createProjectAction,
  addPageAction,
  removePageAction,
};
