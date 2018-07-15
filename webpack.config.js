'use strict'

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')

// Plugin Configuration
const htmlPlugin = new HtmlWebPackPlugin({
  template: './ui/index.ejs',
  filename: './index.html',
  options: {
    config: {

    }
  }
})

const copyAssets = new CopyWebpackPlugin([
  { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'lib/' },
  { from: 'node_modules/bootstrap/dist/js/bootstrap.min.js', to: 'lib/' },
  { from: 'node_modules/jquery/dist/jquery.min.js', to: 'lib/' },
])

module.exports = {
  entry: './ui/index.js',
  output: {
    path: `${ process.cwd() }/ui/hosted`
  },
  mode: 'production',
  module: {
    rules: [
      // Jsx React Files
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      // Style
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    htmlPlugin,
    copyAssets
  ]
}
