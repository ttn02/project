/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules:{
    //关闭组件命名规则（如有多个index.vue文件）
    'vue/multi-word-component-names': 'off'
  }
}
