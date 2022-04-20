function myPromise(executor) {

      this.PromiseState = 'pending'
      this.PromiseResult = null
      this.callbacks = []

      const that = this

      function resolve(value) {
        // promise 状态只能修改一次
        if (that.PromiseState !== 'pending') return
        // promise 状态改为完成，结果赋值
        that.PromiseState = 'fulfilled'
        that.PromiseResult = value
        // 状态改变执行成功回调
        setTimeout(() => {
          that.callbacks.forEach(item => {
            item.onResolved(value)
          })
        })
      }

      function reject(reason) {
        if (that.PromiseState !== 'pending') return
        // promise 状态改为失败，结果赋值
        that.PromiseState = 'rejected'
        that.PromiseResult = reason
        // 状态改变执行失败回调
        setTimeout(() => {
          that.callbacks.forEach(item => {
            item.onRejected(reason)
          })
        })
      }

      // 捕获异常，执行器中抛出异常时，将 promise 转为失败状态并赋值
      try {
        executor(resolve, reject)
      } catch (e) {
        reject(e)
      }
    }

    // 添加 then 方法
    myPromise.prototype.then = function (onResolved, onRejected) {
      const that = this
      // 判断回调函数参数
      if (typeof onResolved !== 'function') {
        onResolved = value => value
      }
      if (typeof onRejected !== 'function') {
        onRejected = reason => {
          throw reason
        }
      }
      return new myPromise((resolve, reject) => {
        // 回调函数封装
        function callback(type) {
          try {
            // 执行 then 的回调函数，获取返回值
            let result = type(that.PromiseResult)
            if (result instanceof myPromise) {
              // 如果返回值是 myPromise 对象，返回值的结果和状态就是 then 返回的 myPromise 的结果和状态
              result.then(v => {
                resolve(v)
              }, r => {
                reject(r)
              })
            } else {
              // 如果返回值不是 myPromise 对象，then 返回的 myPromise 为成功状态，结果为返回值
              resolve(result)
            }
          } catch (e) {
            // 如果 then 的回调函数抛出异常，then 返回的 myPromise 为失败状态，结果为异常值
            reject(e)
          }
        }
        // promise 状态为成功时，执行成功回调
        if (this.PromiseState === 'fulfilled') {
          setTimeout(() => {
            callback(onResolved)
          })
        }
        // promise 状态为失败时，执行失败回调
        if (this.PromiseState === 'rejected') {
          setTimeout(() => {
            callback(onRejected)
          })
        }
        // promise 状态为等待时，将回调函数存入数组，等待状态修改再执行相应回调
        if (this.PromiseState === 'pending') {
          this.callbacks.push({
            onResolved: function () {
              callback(onResolved)
            },
            onRejected: function () {
              callback(onRejected)
            }
          })
        }
      })
    }

    // 添加 catch 方法
    myPromise.prototype.catch = function (onRejected) {
      return this.then(undefined, onRejected)
    }

    // 添加 resolve 方法
    myPromise.resolve = function (value) {
      return new myPromise((resolve, reject) => {
        if (value instanceof myPromise) {
          value.then(v => {
            resolve(v)
          }, r => {
            reject(r)
          })
        } else {
          resolve(value)
        }
      })
    }

    // 添加 reject 方法
    myPromise.reject = function (reason) {
      return new myPromise((resolve, reject) => {
        reject(reason)
      })
    }

    // 添加 all 方法
    myPromise.all = function (myPromises) {
      return new myPromise((resolve, reject) => {
        // 成功结果数组
        let arr = []
        // 成功 promise 数
        let count = 0
        myPromises.forEach((item, index) => {
          item.then(v => {
            // promise 成功就将成功的值放入数组对应下标处
            arr[index] = v
            // 成功数加 1
            count++
            // 所有 promise 都成功，返回结果数组
            if (count === myPromises.length) resolve(arr)
          }, r => {
            reject(r)
          })
        })
      })
    }

    // 添加 race 方法
    myPromise.race = function (myPromises) {
      return new myPromise((resolve, reject) => {
        for (let i = 0; i < myPromises.length; i++) {
          myPromises[i].then(v => {
            // 修改返回对象的状态为成功
            resolve(v)
          }, r => {
            // 修改返回对象的状态为失败
            reject(r)
          })
        }
      })
    }