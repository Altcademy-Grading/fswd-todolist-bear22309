const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    application: './app/javascript/packs/application.js',
    index: './app/javascript/packs/index.js',
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.resolve(__dirname, 'public/packs'),
    publicPath: '/packs/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-private-methods']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    compress: true,
    port: 3035,
  },
};
