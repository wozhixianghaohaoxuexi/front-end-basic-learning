const path = require('path')

module.exports = {
  // 模式
  mode: 'development',
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    // 打包文件夹
    path: path.resolve(__dirname, 'dist'),
    // 打包文件
    filename: 'my-utils.js',
    // 向外暴露的对象名称
    library: {
      // 指定库的民称
      name: 'utils',
      // 暴露库的方式
      type: 'umd'
    }
  }
}