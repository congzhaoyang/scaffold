const path = require('path')
const webpack = require('webpack')
const ImageminPlugin = require('imagemin-webpack-plugin').default // 图片压缩
// const SpritesmithPlugin = require('webpack-spritesmith') // 生成雪碧图
const HtmlWebpackPlugin = require('html-webpack-plugin')
const  ExtractTextPlugin = require('extract-text-webpack-plugin')



module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024 * 30,
            fallback: 'file-loader'
          }
        }]
      },
      // {
      //   test: /\.(svg)(\?.*)?$/,
      //   use: [{
      //     loader: [
      //       // 'url-loader',
      //       'svg-inline-loader'
      //     ],
      //     options: {
      //       limit: 1024 * 30,
      //       fallback: 'file-loader'
      //     }
      //   }]
      // },
      {
        test: /\.svg$/,
        use: ['url-loader', 'svg-inline-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?minimize', 'postcss-loader', 'sass-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize', 'postcss-loader'],
      }
    ]
  },
  resolve: {
    //雪碧图制作
    //webpack 1:
    // modulesDirectories: ["node_modules", "spritesmith-generated"],
    //webpack 2:
    // modules: ["node_modules", "spritesmith-generated"]
  },
  devServer: {
    contentBase: path.join(__dirname, ""),
    open: true,
    compress: true,
    host: '192.168.73.96',
    port: 9999,
    hot: true,
    inline: true,
    open: true,
    compress: true,
    https: false,
    historyApiFallback: true, // 是否开发 HTML5 History API 网页
    watchOptions: {
      // 不监听的文件或文件夹，支持正则匹配。默认为空
      ignored: /node_modules/,
      // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
      // 默认为300ms
      aggregateTimeout: 100,
      // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每秒问 1000 次
      poll: 1000
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin('[name]-[hash:3].css'), //css随机数
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    // new webpack.NoErrorsPlugin()
    /* css雪碧图制作
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/ico'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'src/spritesmith-generated/sprite.png'),
        css: path.resolve(__dirname, 'src/spritesmith-generated/sprite.styl')
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      }
    })
    */
    // Make sure that the plugin is after any plugins that add images
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production', // Disable during development
      pngquant: {
        quality: '95-100'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      // webpack 2.0之后， 此配置不能直接写在自定义配置项中， 必须写在此处
      // css: {
      //   postcss: [require('postcss-pxtorem')({
      //     rootValue: 75,
      //     unitPrecision: 6,
      //     propList: ['!font-size', '*'],
      //     minPixelValue: 1.1,
      //   }),
      //   ]
      // },
    })
  ],
  devtool: 'source-map'
};
