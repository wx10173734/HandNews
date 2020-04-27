module.exports = {
  // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  // 对Babel解析器的包装使其与 ESLint 兼容。
  // parser: 'vue-eslint-parser',
  // parser: 'babel-eslint',
  parserOptions: {
    parser: 'babel-eslint',
    // "parser": "@typescript-eslint/parser",
    // 代码是 ECMAScript 模块
    sourceType: 'module'
  },
  env: {
    // 预定义的全局变量，这里是浏览器环境
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    // 此插件用来识别.html 和 .vue文件中的js代码
    //'html',
    'vue',
    // standard风格的依赖包
    "standard",
    //"promise"
    // "@typescript-eslint"
  ],
  // add your custom rules here
  'rules': {
    // "vue/max-attributes-per-line": [2, {
    //   "singleline": 10,
    //   "multiline": {
    //     "max": 1,
    //     "allowFirstLine": false
    //   }
    // }],
    // "vue/singleline-html-element-content-newline": "off",
    // "vue/multiline-html-element-content-newline":"off",
    // "vue/name-property-casing": ["error", "PascalCase"],
    // "vue/no-v-html": "off",
    "vue/require-component-is": "off",

    // "@typescript-eslint/rule-name": "error",
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
