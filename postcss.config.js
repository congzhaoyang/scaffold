module.exports = {
  plugins: [
    // 需要使用的插件列表
    require('autoprefixer'),
    // 'postcss-import': {},
    // 'postcss-cssnext': {},
    // 'cssnano': {},
    // 'postcss-pxtorem': {
    //   rootValue: 75,
    //   unitPrecision: 6,
    //   propList: ['!font-size', '*'],
    //   minPixelValue: 1.1,
    // }
    // require('postcss-import'),
    // require('postcss-cssnext')
    require('cssnano'),
    require('postcss-pxtorem')({
      rootValue: 75,
      unitPrecision: 6,
      propList: ['!font-size', '*'],
      minPixelValue: 1.1,
    })
  ]
}
