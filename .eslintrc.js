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
    '@typescript-eslint',
    'import'
  ],
  'rules': {
    'import/no-webpack-loader-syntax': 'off',
    'no-undef': 'off',
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always'
    }],
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      }
    }
  }
}
