module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // 如果觉得某个规则有毛病，这样给他关掉
    'no-new-object': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    // 这是什么傻逼规则？
    'class-methods-use-this': 'off',
  },
  parser: 'babel-eslint',
  globals: {
    $he: true,
  },
};
