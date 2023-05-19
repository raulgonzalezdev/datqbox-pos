const { override, addWebpackModuleRule } = require('customize-cra')

module.exports = override(
  addWebpackModuleRule({
    test: /\.js$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: [/node_modules\/stylis-plugin-rtl/, /\.jsx?$/, /node_modules\/(@wry\/context)/],
  }),
  config => {
    // ignore @wry/context source map warnings
    config.devtool = false
    return config
  }
)

