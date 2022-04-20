export function call(fn, obj, ...args) {
  if (obj === undefined || obj === null) {
    obj = globalThis
  }
  obj.temp = fn
  const result = obj.temp(...args)
  delete obj.temp
  return result
}

export function apply(fn, obj, args) {
  if (obj === null || obj === undefined) {
    obj = globalThis
  }
  obj.temp = fn
  const result = obj.temp(...args)
  delete obj.temp
  return result
}

export function bind(fn, obj, ...args) {
  return function(...args2) {
    return fn.call(obj, ...args, ...args2)
  }
}

// 函数节流
export function throttle(fn, delay) {
  // 定义开始时间
  let start = 0
  return function(...args) {
    // 获取当前时间戳
    let now = Date.now()
    if(now - start > delay) {
      // 满足条件执行回调函数
      fn.call(this, ...args)
      // 修改开始时间
      start = now
    }
  }
}

// 函数防抖
export function debounce(fn, delay) {
  let timeId = null
  return function(...args) {
    // 定时器存在清除定时器
    if(timeId !== null) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      fn.call(this, ...args)
      // 清除定时器id，防止回调执行后，下一次仍然清除定时器
      timeId = null
    }, delay);
  }
}