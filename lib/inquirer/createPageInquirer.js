const inquirer = require('inquirer');

module.exports = inquirer.prompt([
  {
    type: 'input',
    name: 'routeName', // 交互中的用户的输入值
    message: 'Please enter the route name：', // 交互的信息提示
    // 用户输入值的校验
    validate: value => {
      let matchTemp = value.match(/([A-Z][a-z]+)+/);
      if (matchTemp && matchTemp.input === matchTemp[0]) {
        return true;
      }
      return '仅支持英文命名且首字母大写（例如：About 或 AboutMe）';
    },
  },

  {
    type: 'input',
    name: 'routePath', // 交互中的用户的输入值
    message: 'Please enter the routing access address：', // 交互的信息提示
    // 用户输入值的校验
    validate: value => {
      if (/^\/[a-z]+(-[a-z]+)*$/.test(value)) {
        return true;
      }
      return '仅支持小写英文且以“/”开头（例如：/home 或 /site-manage）';
    },
    when: answer => {
      return answer.routeName;
    },
  },

  {
    type: 'rawlist',
    name: 'menuCode',
    message: 'Select page access level：',
    choices: [
      {
        name: '004(Highest level)',
        value: '004',
      },
      {
        name: '003',
        value: '003',
      },
      {
        name: '002',
        value: '002',
      },
      {
        name: '001(Log in to access)',
        value: '001',
      },
      {
        name: '000(Not logged in to access)',
        value: '000',
        checked: true, // 默认选中
      },
    ],
    when: answer => {
      return answer.routePath;
    },
  },

  {
    type: 'input',
    name: 'routeTitle', // 交互中的用户的输入值
    message: 'Please enter the routing title：', // 交互的信息提示
    // 用户输入值的校验
    validate: value => {
      if (/^[\u4E00-\u9FA5\uf900-\ufa2d0-9a-zA-Z]+$/.test(value)) {
        return true;
      }
      return '仅支持汉字数字字母（例如：登陆页面）';
    },
    when: answer => {
      return answer.routeName;
    },
  },

  {
    type: 'confirm',
    name: 'isChildren',
    message: 'Do you need to add a sub-route array：',
    when: answer => {
      return answer.menuCode;
    },
    default: false, // 默认值 string | number | boolean | [any] | Function;
  },

  {
    /** 编辑类型的交互 */
    type: 'editor',
    name: 'inputChildren',
    message: 'Please paste the sub-route JSON array：',
    when: answer => {
      return answer.isChildren;
    },
    validate: value => {
      try {
        if (value && typeof JSON.parse(value) == 'object' && Array.isArray(JSON.parse(value))) {
          return true;
        }
      } catch (err) {
        return '仅支持粘贴JSON格式的数组（例如：[{"name": "huasen", "age": 18}]）';
      }
      return '仅支持粘贴JSON格式的数组（例如：[{"name": "huasen", "age": 18}]）';
    },
  },
]);
