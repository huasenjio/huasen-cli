# huasen-cli

> Github：https://github.com/huasenjio/huasen-cli.git



## 📌 关于

基于预设模版，搭建项目的脚手架工具，支持命令行创建项目、添加页面、自动配置路由操作，达到快速构建企业级项目的效果。



## 💪 开源列表

✅ 花森门户容器版（huasenjio-compose）

✅ 花森门户静态版（huasen-protal）

✅ 花森脚手架（huasen-cli）

☑️ 花森低代码平台 （预研）

☑️ 花森流程引擎（预研）



## 🤩 在线体验

由于服务器配置过于垃圾，首次访问较慢，请耐心等待，如果加载卡死，则重新刷新网页。不是代码写得烂，相反我已进行性能优化，并且经过实践验证，服务器配置较好的情况下，访问速度很快！

1.[网址导航](http://n.huasen.cc/)

2.[博客](http://n.huasen.cc/#/article)

3.[个人引导页](http://huasen.cc/)



## 🔨 安装依赖

#### 全局

`npm i huasen -g`

#### 更新

`npm update huasen -g`



## 💻 依赖环境

1. git
2. node8.0+



## 🐛 快速入门

> ⚠️ 认真查阅命令说明才能更快上手

#### 🔑 一.创建项目

> hs create 项目名

输入命令后，进入命令行交互流程，选择项目配置，其中问题如下所示：

1. Please select a project template，选择搭建的项目模版，目前仅支持Vue.js模版，后续更新React、Angular、多个场景的模版；
2. Please select the project plugin，配置项目所需插件，上下键移动，空格选择选择配置的插件，但是现版本不起效果；
3. Whether to enable ESlint，是否开启Eslint语法校验；
4. Whether to run the project automatically，是否开启自动安装依赖并运行，windows电脑CMD命令行无法无法自动运行，Mac轻松无压力，当然可以在项目根目录的终端中运行`npm run serve`手动运行项目；

#### 🔑 二.添加页面

> hs page

需要在项目根目录执行命令，进入命令行交互流程，配置页面路由，其中问题如下所示：

1. Please enter the route name，输入路由组件名称，首字母大写，尽量一个单词完成，例如：About、HomeSearch；
2. Please enter the routing access address，路由的访问地址，必须保持唯一性，若不唯一有提示，并且可以两个地址指向同一个路由名称组件，例如：/about、/home-search；
3. Select page access level，选择页面的访问等级，默认 000，任何人均可以访问。如果权限不够则自动跳转 403 页面。如果输入不存在的路由地址，则自动跳转到 404 页面；
4. Please enter the routing title，路由的标题，仅支持输入中文；
5. Do you need to add a sub-route array，是否添加页面子路由，默认 false，不建议使用，功能未完善；
6. Please paste the sub-route JSON array，输入子路有的 JSON 数组，但是需要手动在对应的文件夹下创建路由组件；

#### 🔑 三.删除页面

> hs remove

需要在项目根目录执行命令，进入命令行交互流程，选择删除的路由地址，其中问题如下所示：

1. Please enter the deleted routing address，输入删除的路由地址，例如：`/about`；
2. Whether to delete the routing component file，是否删除路由对应的组件，，默认 true，当选择 false 时不会删除路由地址对应的路由组件文件；

#### 🔑 四.查看版本

> hs -V

#### 🔑 五.查看帮助

> hs -h



## ❌ 声明

仅供学习参考，未经授权，禁止商业使用！



## 🥳 联系我们

由于涉及知识面较广，文字讲解篇幅过大，可以关注我的 Bilibili 账号，后续更新视频教程，感兴趣的小伙伴可以添加站长微信 ，进入前端技术交流群！

🐧企鹅QQ：184820911

😸微信 ：huasencc（站长邀请进入前端交流群）

📮邮箱 ：[184820911@qq.com](https://github.com/huasenjio/huasen-compose/blob/main/184820911@qq.com)

📺哔哩哔哩：[花森酱 JioJio](https://space.bilibili.com/241546158)
