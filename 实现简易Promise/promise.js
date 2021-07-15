function MyPromise (func) {
  const that = this
  that.status = 'pending'
  that.value = undefined
  that.resloveCallbackList = []
  that.rejectCallbackList = []

  try {
    func(reslove, reject)
  } catch (e) {
    reject(e)
  }

  function reslove (value) {
    // 保证只有当状态pending时，才可以改变
    if (that.status === 'pending') {
      that.status = 'fulfilled'
      that.value = value
      that.resloveCallbackList.forEach(function (item) {
        item(that.value)
      })
    }
  }
  
  function reject (value) {
    // 保证只有当状态pending时，才可以改变
    if (that.status === 'pending') {
      that.status = 'rejected'
      that.value = value
      that.rejectCallbackList.forEach(function (item) {
        item(that.value)
      })
    }
  }
}

MyPromise.prototype.then = function (resloveCallback, rejectCallback) {
  const that = this
  switch (that.status) {
    case 'pending':
      returnPromise = new MyPromise(function (reslove, reject) {
        that.resloveCallbackList.push(function () {
          reslove(resloveCallback(that.value))
        })
        that.rejectCallbackList.push(function () {
          reject(rejectCallback(that.value))
        })
      })
      break
    case 'fulfilled':
      return new MyPromise(function (reslove, reject) {
        reslove(resloveCallback(that.value))
      })
    case 'rejected':
      return new MyPromise(function (reslove, reject) {
        reject(rejectCallback(that.value))
      })
    default:
    break
  }
}


const result = new MyPromise(function (reslove, reject) {
  // setTimeout(() => {
    reslove(111)
  // }, 1000);
}).then(res => {
  console.log('res', res)
  return new MyPromise((reslove, reject) => {
    // setTimeout(() => {
      reslove(222)
    // }, 2000);
  })
}).then(res => {
  console.log('res2', res)
})
// console.log(result)
// new MyPromise((reslove, reject) => {
//   setTimeout(() => {
//     reslove(222)
//   }, 2000);
// }).then(res => {
//   console.log('res', res)
// })

