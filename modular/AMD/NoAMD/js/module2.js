// 定义一个有依赖的模块
(function (window, module1) {
  let msg = 'module2'
  function foo() {
    console.log(msg, module1.getName())
  }
  window.module2 = {foo}
})(window, module1)