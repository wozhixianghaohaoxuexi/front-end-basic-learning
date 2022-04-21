// 构造函数
    function Axios(config) {
      // 初始化
      this.defaults = config
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      }
    }

    // 原型添加相关的方法
    Axios.prototype.request = function (config) {
      // console.log('发送 AJAX 请求，请求类型为 ', config.method)
      // 创建一个 promise 对象
      let promise = Promise.resolve(config)
      // 声明一个数组
      let chains = [dispatchRequest, undefined] // undefined 占位
      // 请求拦截器，将请求拦截器的回调放入 chains 的前面
      this.interceptors.request.handlers.forEach(item => {
        chains.unshift(item.fulfilled, item.rejected)
      })
      // 响应拦截器，将响应拦截器的回调压入 chains 的后面
      this.interceptors.response.handlers.forEach(item => {
        chains.push(item.fulfilled, item.rejected)
      })
      while (chains.length > 0) {
        // 调用 then 方法指定回调
        promise = promise.then(chains.shift(), chains.shift())
      }
      // 返回 promise 结果
      return promise
    }

    Axios.prototype.get = function (config) {
      // 内部实际调用 request 发送请求
      // ... 省略其他 config 操作
      return this.request({ method: 'GET' })
    }
    Axios.prototype.post = function (config) {
      // 内部实际调用 request 发送请求
      // ... 省略其他 config 操作
      return this.request({ method: 'POST' })
    }

    // 创建 axios 对象
    function createInstance(config) {
      // 实例化一个对象
      let content = new Axios(config) // 可以调用 content.get() content.post() 但是不能当做函数使用 content() x
      let instance = Axios.prototype.request.bind(content) // instance 是一个函数，并且可以 instance({}) 此时 instance 不能 instance.get x
      // 将 Axios.prototype 对象中的方法添加到 instance 函数对象中
      Object.keys(Axios.prototype).forEach(key => {
        instance[key] = Axios.prototype[key].bind(content)
      })
      // 为 instance 函数对象添加属性 default 与 interceptors
      Object.keys(content).forEach(key => {
        instance[key] = content[key]
      })
      return instance
    }

    // axios 发送请求
    function dispatchRequest(config) {
      // 调用适配器发送请求
      return xhrAdapter(config).then(response => {
        // 响应结果进行处理
        return response
      }, error => {
        throw error
      })
    }

    // xhrAdapter 适配器
    function xhrAdapter(config) {
      return new Promise((resolve, reject) => {
        // 发送 AJAX 请求
        let xhr = new XMLHttpRequest()
        // 初始化
        xhr.open(config.method, config.url)
        // 发送
        xhr.send()
        // 绑定事件
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            // 判断成功的条件
            if (xhr.status >= 200 && xhr.status < 300) {
              // 成功的状态
              resolve({
                // 配置对象
                config: config,
                // 响应体
                data: xhr.response,
                // 响应头
                headers: xhr.getAllResponseHeaders(), // 字符串  parseHeaders解析
                // xhr 请求对象
                request: xhr,
                // 响应状态码
                status: xhr.status,
                // 响应状态字符串
                statusText: xhr.statusText
              })
            } else {
              // 失败的状态
              reject(new Error('请求失败，失败的状态码为' + xhr.status))
            }
          }
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(value => {
            xhr.abort()
          })
        }
      })
    }

    // 拦截器管理器构造函数
    function InterceptorManager() {
      this.handlers = []
    }
    InterceptorManager.prototype.use = function (fulfilled, rejected) {
      this.handlers.push({
        fulfilled,
        rejected
      })
    }

    // CancelToken 构造函数
    function CancelToken(executor) {
      // 声明一个变量
      let resolvePromise
      // 对实例对象添加属性
      this.promise = new Promise((resolve) => {
        // 将 resolve 赋值给 resolvePromise
        resolvePromise = resolve
      })
      // 调用 executor 函数
      executor(function () {
        // 执行 resolvePromise 函数
        resolvePromise()
      })
    }