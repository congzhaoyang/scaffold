const path = require('path');

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
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize', 'postcss-loader'],
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, ""),
    open: true,
    compress: true,
    host: '192.168.72.51',
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
  devtool: 'source-map'
};