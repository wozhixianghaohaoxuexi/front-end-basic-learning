// 1.call函数封装
function call(callback, obj, ...args) {
  if (obj === null || obj === undefined) {
    // 当obj为null或undefined时，obj默认为全局的this，浏览器中为window，nodejs中为global
    obj = globalThis
  }
  // 改变callback中this指向
  obj.temp = callback
  // 执行回调并返回
  const result = obj.temp(...args)
  delete obj.temp
  return result
}

// 2.apply函数封装，args为参数数组
function apply(callback, obj, args) {
  if (obj === null || obj === undefined) {
    obj = globalThis
  }
  obj.temp = callback
  const result = obj.temp(...args)
  delete obj.temp
  return result
}

// 3.bind函数封装
function bind(callback, obj, ...args1) {
  return function (...args2) {
    // 函数体与call函数相同
    if (obj === null || obj === undefined) {
      obj = globalThis
    }
    obj.temp = callback;
    const result = obj.temp(...args1, ...args2)
    delete obj.temp
    return result
  }
}

// 4.函数节流
function throttle(callback, delay) {
  // 起始时间为0，保证第一次直接执行callback函数
  // 这一行只会在throttle函数执行时执行，返回的函数执行时不会执行
  let start = 0
  // 使用rest参数，防止有些callback函数执行需要参数，有些不需要
  return function (...args) {
    const now = Date.now()
    if (now - start >= delay) {
      callback.call(this, ...args)
      start = now
    }
  }
}

// 5.函数防抖
function debounce(callback, delay) {
  let timeoutId = null
  return function (...args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      callback.call(this, ...args)
      // 定时器执行后，将timeoutId重新赋值为null，防止返回的函数再次执行时清除无效定时器
      timeoutId = null
    }, delay);
  }
}