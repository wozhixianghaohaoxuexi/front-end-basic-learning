// 1. 引入express
const express = require('express')

// 2. 创建应用对象
const app = express()

// 3. 创建路由规则
/* 
  request 是对请求报文的封装
  response 是对响应报文的封装
*/
app.get('/server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 设置响应
  response.send('Hello Express')
})

// all表示可以接收任何类型的请求
app.all('/server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  // 设置响应
  response.send('Hello Express POST')
})

// 返回json数据
app.get('/json-server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 响应一个数据
  const data = {
    name: 'atguigu'
  }
  let str = JSON.stringify(data)
  // 设置响应
  response.send(str)
})

// 针对ie缓存
app.get('/ie', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // 设置响应
  response.send('Hello IE')
})

// 延时响应
app.get('/delay', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  setTimeout(() => {
    // 设置响应
    response.send('延时响应')
  }, 3000);
})

// jquery服务
app.all('/jquery-server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  // response.send('hello jquery ajax')
  const data = { name: 'jquery' }
  response.send(JSON.stringify(data))
})

// axios服务
app.all('/axios-server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  const data = { name: 'axios' }
  response.send(JSON.stringify(data))
})

// fetch服务
app.all('/fetch-server', (request, response) => {
  // 设置响应头 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Headers', '*')
  const data = { name: 'fetch' }
  response.send(JSON.stringify(data))
})

// jsonp服务
app.all('/jsonp-server', (request, response) => {
  // response.send('console.log(\'jsonp server\')')
  const data = {
    name: 'abc'
  }
  const str = JSON.stringify(data)
  response.end(`handle(${str})`)
})

// 4. 监听端口启动服务
app.listen(8000, () => {
  console.log('服务已经启动，8000端口监听中...')
})