(function () {
  requirejs.config({
    // 基本路径，使用baseUrl出发点在根目录下，不使用从自身出发
    // baseUrl: 'js/',
    // 配置路径
    paths: {
      // 模块名: 路径，文件名后不用加.js，requirejs会自动添加.js
      dataService: './modules/dataService',
      alerter: './modules/alerter',
      // jQuery官方在AMD规范中暴露jquery
      jquery: './libs/jquery-3.6.0'
    }
  })
  requirejs(['alerter'], function(alerter) {
    alerter.showMsg()
  })
})()