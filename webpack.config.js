const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'app.js'),
  devtool: 'none',
  devServer: {
    contentBase: './docs',
    historyApiFallback: true
  },
  output: {
    publicPath: path.resolve(__dirname, 'docs'),
    path: path.resolve(__dirname, 'docs',),
    filename:'scripts/bundle.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/main.css'
    }),
  ],
  module: {
      rules: [
         {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: path.resolve(__dirname, 'docs', 'styles')
                }
              },
              'css-loader',
              'sass-loader'
            ]
         }
      ]
   }
}