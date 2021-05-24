/*
  注意：
  通过高版本browserify（以17.0.0为例）对此js打包处理会报错（无法加载文件 D:\devSoftware\nodejs\node_global\browserify.ps1，因为在此系统上禁止运行脚本）
  解决方法：
  以管理员身份进入命令行，切换到项目根目录，再打包（browserify js/src/app.js -o js/dist/bundle.js）
*/
let module1 = require('./module1')
let module2 = require('./module2')
let module3 = require('./module3')

module1.foo()
module2()
module3.bar()
module3.foo()
