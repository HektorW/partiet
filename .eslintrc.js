const prettierConfig = require('./prettier.config')

module.exports = {
  root: true,

  parser: 'babel-eslint',

  env: {
    browser: false,
    es6: true,
    node: true
  },

  extends: [
    'standard',
    'prettier',
    'plugin:import/errors'
  ],

  plugins: ['prettier', 'import'],

  rules: {
    'prettier/prettier': ['error', prettierConfig]
  },

  globals: {
    process: true
  }
}
