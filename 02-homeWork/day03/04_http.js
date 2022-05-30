//载入http模块
var http = require('http');
//载入fs模块
var fs = require('fs')
//载入url
var url = require('url')

//设置http方法
http.createServer(function (req, res) {
  //设置响应编码
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
  //获取地址
  var pathname = url.parse(req.url).pathname;
  //判断地址
  switch (pathname) {
    case '/':
      fs.readFile('./03_交互.html', function (err, data) {
        res.end(data)
      })
      break;
    case '/list':
      fs.readFile('./03_交互.html', function (err, data) {
        res.end(JSON.stringify({ code: 200, mag: '加载成功', data: JSON.parse(data) }))
      })
      break;
    case '/add':

      break;

    default:
      break;
  }
})