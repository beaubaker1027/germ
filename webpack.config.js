const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'app.js'),
  devtool: 'none',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  output: {
    publicPath: path.resolve(__dirname, 'dist'),
    path: path.resolve(__dirname, 'dist',),
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
                  publicPath: path.resolve(__dirname, 'dist', 'styles')
                }
              },
              'css-loader',
              'sass-loader'
            ]
         }
      ]
   }
}