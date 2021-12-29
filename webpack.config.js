let mode = 'development'
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const
 HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
if(process.env.NODE_ENV === 'production'){
  mode = 'production'
}
module.exports ={
  context:path.resolve(__dirname,'src'),
  mode:mode,
  entry:{
    main: './index.js',

  },
  output:{
    filename:'[name].[contenthash].js',
    assetModuleFilename:'assets/[hash][ext][query]',
    publicPath: '/',
    path:path.resolve(__dirname,'dist'),
    clean: true,
    libraryTarget: 'this'
  },
  optimization:{
    splitChunks:{
      chunks:'all',
    },
  },
  devServer:{
      host: '0.0.0.0',
      port: 8080,
  },
  module:{
      rules:[
      {
        test:/\.html$/i,
        loader:'html-loader',
      },
       {
        test:/\.(sa|sc|c)ss$/,
        use:[
          (mode === 'development') ? 'style-loader' : {
          loader:MiniCssExtractPlugin.loader, 
          options: {
            esModule:false,
          },
        },
          'css-loader',
          {loader:'postcss-loader',
          options: {
            postcssOptions:{
              plugins:[
                'postcss-preset-env',
              ]
            },
          },
        },
          'sass-loader', 
        ]
      },
      {  test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test:/\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test:/\.pug$/,
        loader:'pug-loader',
        exclude:/(node_modules|bower_components)/,
      },
    ]
  },
  devtool:'source-map',
  plugins:[
    new HtmlWebpackPlugin({
      template: 'index.pug'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
     new HtmlWebpackPlugin({
    filename: 'index.pug' ,
    minify: false,
    scriptloading:'blocking',
    inject:'body'
  }),
  new HtmlWebpackPugPlugin()
  ]
}