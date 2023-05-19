module.exports = {
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2020,
    'sourceType': 'module',
    'requireConfigFile': false, 
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    'import/no-webpack-loader-syntax': 'off',
    'no-undef': 'off',
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      }
    }
  }
}
