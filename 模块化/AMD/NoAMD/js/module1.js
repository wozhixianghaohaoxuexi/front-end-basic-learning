// 定义一个没有任何依赖的模块
(function (window) {
  let name = 'module1'
  function getName() {
    return name
  }
  window.module1 = {getName}
})(window)