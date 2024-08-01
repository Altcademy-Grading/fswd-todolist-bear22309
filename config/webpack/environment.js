const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const { merge } = require('webpack-merge')
const webpack = require('webpack')

// Custom Babel options to include the optional chaining plugin
const customBabelOptions = {
  plugins: [
    '@babel/plugin-proposal-optional-chaining'
  ]
}

const babelLoader = environment.loaders.get('babel')
babelLoader.use[0].options = merge(babelLoader.use[0].options, customBabelOptions)

// Add SCSS support
environment.loaders.prepend('sass', {
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
})

// Add jQuery support
environment.plugins.prepend('Provide', 
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
)

// Add Vue support
environment.loaders.append('vue', {
  test: /\.vue$/,
  loader: 'vue-loader'
})
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())

module.exports = environment
