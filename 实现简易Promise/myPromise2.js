class myPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  
  constructor(func) {
    this.PromiseState = myPromise.PENDING
    this.PromiseResult = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch(e) {
      this.reject(e)
    }
  }

  resolve(result) {
    if(this.PromiseState === myPromise.PENDING) {
      this.PromiseState = myPromise.FULFILLED
      this.PromiseResult = result
      this.onFulfilledCallbacks.forEach(fulfilledCallback => {
        fulfilledCallback(result)
      })
    }
  }

  reject(reason) {
    if(this.PromiseState === myPromise.PENDING) {
      this.PromiseState = myPromise.REJECTED
      this.PromiseResult = reason
      this.onRejectedCallbacks.forEach(rejectedCallback => {
        rejectedCallback(reason)
      })
    }
  }

  then(onfulfilled, onrejected) {
    // onfulfilled 如果是不是函数就直接将 value 返回
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : value => value
    // onrejected 如果不是函数就 throw reason
    onrejected = typeof onrejected === 'function' ? onrejected : reason => { 
      throw reason
    }

    let promise2 = new myPromise((resolve, reject) => {
      if(this.PromiseState === myPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          // 设置定时器是为了让 resolve 和 reject 在事件循环末尾执行
          setTimeout(() => {
            try {
              let x = onfulfilled(this.PromiseResult)
              resolvePromise(promise2, x, resolve, reject)
            } catch(err) {
              reject(err)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.PromiseResult)
              resolvePromise(promise2, x, resolve, reject)
            } catch(err) {
              reject(err)
            }
          })
        })
      }
  
      if(this.PromiseState === myPromise.FULFILLED) {
        setTimeout(() => {
          try {
            let x = onfulfilled(this.PromiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      }
  
      if(this.PromiseState === myPromise.REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected(this.PromiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      }
    })

    return promise2
  }

  catch(onrejected) {
    return this.then(undefined, onrejected)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if(x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  
  if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let called = false
    try {
      let then = x.then
      if(typeof then === 'function') {
        then.call(
          x, 
          y => {
            if(called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          }, 
          r => {
            if(called) return
            called = true
            reject(r)
          }
        )
      }else {
        resolve(x)
      }
    } catch(e) {
      if(called) return
      called = true
      reject(e)
    }
    
  }else {
    resolve(x)
  }
}


myPromise.deferred = function() {
  let result = {}
  result.promise = new myPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}


module.exports = myPromise
