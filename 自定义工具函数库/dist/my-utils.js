/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["utils"] = factory();
	else
		root["utils"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/array.js":
/*!**********************!*\
  !*** ./src/array.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"concat\": () => (/* binding */ concat),\n/* harmony export */   \"every\": () => (/* binding */ every),\n/* harmony export */   \"filter\": () => (/* binding */ filter),\n/* harmony export */   \"find\": () => (/* binding */ find),\n/* harmony export */   \"findIndex\": () => (/* binding */ findIndex),\n/* harmony export */   \"map\": () => (/* binding */ map),\n/* harmony export */   \"reduce\": () => (/* binding */ reduce),\n/* harmony export */   \"slice\": () => (/* binding */ slice),\n/* harmony export */   \"some\": () => (/* binding */ some),\n/* harmony export */   \"unique1\": () => (/* binding */ unique1),\n/* harmony export */   \"unique2\": () => (/* binding */ unique2),\n/* harmony export */   \"unique3\": () => (/* binding */ unique3)\n/* harmony export */ });\nfunction map(arr, fn) {\r\n  let res = []\r\n  for(let i=0; i<arr.length; i++) {\r\n    res.push(fn(arr[i], i))\r\n  }\r\n  return res\r\n}\r\n\r\nfunction reduce(arr, fn, initialValue) {\r\n  for(let i=0; i< arr.length; i++){\r\n    initialValue = fn(arr[i], initialValue)\r\n  }\r\n  return initialValue\r\n}\r\n\r\nfunction filter() {\r\n\r\n}\r\n\r\nfunction find() {\r\n\r\n}\r\n\r\nfunction findIndex() {\r\n\r\n}\r\n\r\nfunction every() {\r\n\r\n}\r\n\r\nfunction some() {\r\n\r\n}\r\n\r\nfunction unique1() {\r\n  \r\n}\r\n\r\nfunction unique2() {\r\n\r\n}\r\n\r\nfunction unique3() {\r\n\r\n}\r\n\r\nfunction concat() {\r\n\r\n}\r\n\r\nfunction slice() {\r\n\r\n}\n\n//# sourceURL=webpack://utils/./src/array.js?");

/***/ }),

/***/ "./src/function.js":
/*!*************************!*\
  !*** ./src/function.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"apply\": () => (/* binding */ apply),\n/* harmony export */   \"bind\": () => (/* binding */ bind),\n/* harmony export */   \"call\": () => (/* binding */ call),\n/* harmony export */   \"debounce\": () => (/* binding */ debounce),\n/* harmony export */   \"throttle\": () => (/* binding */ throttle)\n/* harmony export */ });\nfunction call(fn, obj, ...args) {\r\n  if (obj === undefined || obj === null) {\r\n    obj = globalThis\r\n  }\r\n  obj.temp = fn\r\n  const result = obj.temp(...args)\r\n  delete obj.temp\r\n  return result\r\n}\r\n\r\nfunction apply(fn, obj, args) {\r\n  if (obj === null || obj === undefined) {\r\n    obj = globalThis\r\n  }\r\n  obj.temp = fn\r\n  const result = obj.temp(...args)\r\n  delete obj.temp\r\n  return result\r\n}\r\n\r\nfunction bind(fn, obj, ...args) {\r\n  return function(...args2) {\r\n    return fn.call(obj, ...args, ...args2)\r\n  }\r\n}\r\n\r\n// 函数节流\r\nfunction throttle(fn, delay) {\r\n  // 定义开始时间\r\n  let start = 0\r\n  return function(...args) {\r\n    // 获取当前时间戳\r\n    let now = Date.now()\r\n    if(now - start > delay) {\r\n      // 满足条件执行回调函数\r\n      fn.call(this, ...args)\r\n      // 修改开始时间\r\n      start = now\r\n    }\r\n  }\r\n}\r\n\r\n// 函数防抖\r\nfunction debounce(fn, delay) {\r\n  let timeId = null\r\n  return function(...args) {\r\n    // 定时器存在清除定时器\r\n    if(timeId !== null) {\r\n      clearTimeout(timeId)\r\n    }\r\n    timeId = setTimeout(() => {\r\n      fn.call(this, ...args)\r\n      // 清除定时器id，防止回调执行后，下一次仍然清除定时器\r\n      timeId = null\r\n    }, delay);\r\n  }\r\n}\n\n//# sourceURL=webpack://utils/./src/function.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"apply\": () => (/* reexport safe */ _function_js__WEBPACK_IMPORTED_MODULE_0__.apply),\n/* harmony export */   \"bind\": () => (/* reexport safe */ _function_js__WEBPACK_IMPORTED_MODULE_0__.bind),\n/* harmony export */   \"call\": () => (/* reexport safe */ _function_js__WEBPACK_IMPORTED_MODULE_0__.call),\n/* harmony export */   \"debounce\": () => (/* reexport safe */ _function_js__WEBPACK_IMPORTED_MODULE_0__.debounce),\n/* harmony export */   \"map\": () => (/* reexport safe */ _array_js__WEBPACK_IMPORTED_MODULE_1__.map),\n/* harmony export */   \"reduce\": () => (/* reexport safe */ _array_js__WEBPACK_IMPORTED_MODULE_1__.reduce),\n/* harmony export */   \"throttle\": () => (/* reexport safe */ _function_js__WEBPACK_IMPORTED_MODULE_0__.throttle)\n/* harmony export */ });\n/* harmony import */ var _function_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./function.js */ \"./src/function.js\");\n/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./array.js */ \"./src/array.js\");\n// export function test() {\r\n//   document.write('测试自定义工具库')\r\n//   console.log('test()')\r\n// }\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://utils/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});