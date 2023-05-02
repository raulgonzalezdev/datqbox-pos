//.eslintrc.js
module.exports = {
  // ...resto de tu configuración ESLint
  rules: {
    // ...resto de tus reglas
    "import/no-webpack-loader-syntax": "off",
    "no-undef": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};

  