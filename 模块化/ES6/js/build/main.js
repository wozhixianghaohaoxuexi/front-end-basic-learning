'use strict';

var _module = require('./module1');

var _module2 = require('./module2');

var _module3 = require('./module3');

var _module4 = _interopRequireDefault(_module3);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 默认暴露直接引入
// 引入模块
// 常规暴露必须使用解构赋值的形式引入
(0, _jquery2.default)('body').css('background', 'green');

// 引入第三方库类似默认暴露，以jquery为例

(0, _module.foo)();
(0, _module.bar)();
(0, _module2.fun)();
(0, _module2.fun2)();
_module4.default.foo();