# huasen-cli

基于预设模版搭建项目的脚手架工具，支持命令行创建项目、添加页面、自动配置路由操作，达到快速构建企业级项目的效果。



## 依赖环境

1. git
2. node8.0+



## 安装和更新

全局安装脚手架命令：npm i huasen -g

更新脚手架命令：npm update huasen -g



## 快速使用

### 查看版本

`hs -V`

### 查看预设指令

`hs -h`

### 创建项目

`hs create 项目名`

输入命令后，进入命令行交互流程，选择项目配置，其中问题如下所示：

1. Please select a project template，选择搭建的项目模版，目前仅支持Vue.js模版，后续更新React、Angular、多个场景的模版；
2. Please select the project plugin，配置项目所需插件，上下键移动，空格选择选择配置的插件，但是现版本不起效果；
3. Whether to enable ESlint，是否开启Eslint语法校验；
4. Whether to run the project automatically，是否开启自动安装依赖并运行，windows电脑CMD命令行无法无法自动运行，Mac轻松无压力，当然可以在项目根目录的终端中运行`npm run serve`手动运行项目；

### 添加页面

`hs page`

需要在项目根目录执行命令，进入命令行交互流程，配置页面路由，其中问题如下所示：

1. Please enter the route name，输入路由组件名称，首字母大写，尽量一个单词完成，例如：About、HomeSearch；
2. Please enter the routing access address，路由的访问地址，必须保持唯一性，若不唯一有提示，并且可以两个地址指向同一个路由名称组件，例如：/about、/home-search；
3. Select page access level，选择页面的访问等级，默认 000，任何人均可以访问。如果权限不够则自动跳转 403 页面。如果输入不存在的路由地址，则自动跳转到 404 页面；
4. Please enter the routing title，路由的标题，仅支持输入中文；
5. Do you need to add a sub-route array，是否添加页面子路由，默认 false，不建议使用，功能未完善；
6. Please paste the sub-route JSON array，输入子路有的 JSON 数组，但是需要手动在对应的文件夹下创建路由组件；

### 删除页面

`hs remove`

需要在项目根目录执行命令，进入命令行交互流程，选择删除的路由地址，其中问题如下所示：

1. Please enter the deleted routing address，输入删除的路由地址，例如：`/about`；
2. Whether to delete the routing component file，是否删除路由对应的组件，，默认 true，当选择 false 时不会删除路由地址对应的路由组件文件；
