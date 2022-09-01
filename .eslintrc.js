module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['off', 2],
    'eol-last': 0,
    'space-before-function-paren': 0, // 不检查函数前的空格
    'no-multi-spaces': 'off',
    semi: 0,
    'vue/multi-word-component-names': [
      'error',
      {
        // 忽略eslint对index文件名的标准检测
        ignores: ['index']
      }
    ]

  }
}
