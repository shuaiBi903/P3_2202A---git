//载入http
var http = require('http')
//载入fs模块
var fs = require('fs')
//载入url 模块
var url = require('url')

//设置http功能
http.createServer(function (req, res) {
  //设置响应式
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })

  //获取路径
  var pathname = url.parse(req.url).pathname

  //判断路径
  switch (pathname) {
    //默认路径的参数
    case '/':
      fs.readFile('./03_交互.html', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '加载失败' }))
        } else {
          res.end(data)
        }
      })
      break
    case '/list':
      fs.readFile('./03_储存.json', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '加载失败' }))
        } else {
          res.end(JSON.stringify({ code: 200, msg: '加载成功', data: JSON.parse(data) }))
        }
      })
      break
    default:
      break
  }
}).listen(3000, function () {
  console.log('服务已启动,http://localhost:3000')
})
