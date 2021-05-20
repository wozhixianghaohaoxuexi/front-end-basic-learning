// 引入模块
// 常规暴露必须使用解构赋值的形式引入
import {foo, bar} from './module1'
import { fun, fun2 } from './module2'

// 默认暴露直接引入
import module3 from './module3'

// 引入第三方库类似默认暴露，以jquery为例
import $ from 'jquery'

$('body').css('background', 'green')
foo()
bar()
fun()
fun2()
module3.foo()