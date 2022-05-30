//加载fs 模块
var fs = require('fs');

//http 模块
var http = require('http');

//加载url
var url = require('url');


//创建服务
http.createServer(function (req, res) {
    //req请求
    //res响应

    // 设置响应编码格式;
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

    var pathname = url.parse(req.url).pathname;
    switch (pathname) {
      case '/':
        fs.readFile('./03_交互.html',function (err,data) {
          if (err) {
            res.end(JSON.stringify({ code: 404, msg: '加载失败' }));
          } else {
            res.end(data);
          }
        });
      break;

      case '/list':
        fs.readFile('./03_储存.json', function (err, data) {
          if (err) {
            res.end(JSON.stringify({ code: 404, msg: '加载失败' }));
          } else {
            res.end(JSON.stringify({ code: 200, mag: '加载成功', data: JSON.parse(data) }));
          }
        });
        break;

      default:
        break;
    }
  }).listen(3000, function () {
    console.log('数据启动成功','http://127.0.0.1:3000');
  });
