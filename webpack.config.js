const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development', // Set the mode explicitly to 'development' or 'production'
  entry: {
    application: './app/javascript/packs/application.js',
    index: './app/javascript/packs/index.js',
  },
  output: {
    filename: '[name]-[fullhash].js', // Use [fullhash] for cache-busting
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
            presets: [
              [
                '@babel/preset-env',
                {
                  loose: true,
                  useBuiltIns: 'usage',
                  corejs: 3,
                }
              ]
            ],
            plugins: [
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true
                }
              ],
              [
                '@babel/plugin-proposal-private-methods',
                {
                  loose: true
                }
              ],
              [
                '@babel/plugin-proposal-private-property-in-object',
                {
                  loose: true
                }
              ]
            ],
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js', 
    },
  },
  plugins: [new VueLoaderPlugin()],
  devServer: {
    static: path.resolve(__dirname, 'public'),
    compress: true,
    port: 3035,
  },
};
