/*
 * @Autor: huasenjio
 * @Date: 2022-05-06 23:55:47
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-09-26 21:22:44
 * @Description:
 */

const inquirer = require('inquirer');

// 输出示例
// {
//     projectName: 'huasenjio',
//     templateType: 'vue',
//     templateTool: [ 'Router', 'Vuex', 'Axios', 'Tailwindcss' ],
//     isESlint: true,
//     isRemark: false
// }
module.exports = inquirer.prompt([
  {
    type: 'rawlist',
    name: 'templateType',
    message: 'Please select a project template：',
    choices: [
      {
        name: 'Vue.js',
        value: 'vue',
        checked: true, // 默认选中
      },
      'React.js',
      'Angular.js',
    ],
    // when: (answer) => {
    //     return answer.projectName;
    // }
  },

  {
    /** 多选类型的交互 */
    type: 'checkbox',
    name: 'templateTool',
    message: 'Please select the project plugin：',
    choices: [new inquirer.Separator('核心功能'), 'Router', 'Vuex', 'Axios', new inquirer.Separator('CSS预处理'), 'SCSS', 'Tailwindcss', new inquirer.Separator('拓展功能'), 'I18n', 'Theme', 'Normalize'],
    loop: false,
    when: answer => {
      return answer.templateType === 'vue';
    },
  },

  {
    type: 'confirm',
    name: 'isESlint',
    message: 'Whether to enable ESlint：',
    default: true,
    when: answer => {
      return answer.templateTool;
    },
  },

  {
    type: 'confirm',
    name: 'isRun',
    message: 'Whether to run the project automatically：',
    // when: (answer) => {
    //     return answer.isESlint;
    // },
    default: false, // 默认值 string | number | boolean | [any] | Function;
  },
]);
