module.exports = {
  parser: '@typescript-eslint/parser', //定义ESLint的解析器
  extends: [
    // 继承的规则，后面覆盖前面
    'plugin:prettier/recommended',
  ],
  plugins: [],
  parserOptions: {
    // 解析器选项
    ecmaVersion: 2019, // 支持 ES6 语法并不意味着同时支持新的 ES6 全局变量或类型（比如 Set 等新类型），需{ "env":{ "es6": true } }
    sourceType: 'module', //  "script" (默认)，如果代码是 ECMAScript 模块，设置为"module"
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 指定代码的运行环境
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {},
  settings: {},
  // 扩展（或覆盖）规则
  rules: {},
  // 覆盖指定文件类型的rules
  overrides: [],
};
