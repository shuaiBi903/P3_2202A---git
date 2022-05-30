//载入http
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring')

http.createServer(function (req, res) {
  //设置响应编码
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
  //获取路径
  var path = url.parse(req.url).pathname
  //判断路径
  switch (path) {
    case '/':
      fs.readFile('./02交互.html', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '加载失败' }))
        } else {
          res.end(data)
        }
      })
      break;
    case '/list':
      fs.readFile('./02_交互.json', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '加载失败' }))
        } else {
          res.end(JSON.stringify({ code: 200, msg: '加载成功', data: JSON.parse(data) }))
        }
      })
      break;
    case '/add':
      fs.readFile('./02_交互.json', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '加载失败' }))
        } else {
          var arr = JSON.parse(data);
          var post = '';
          req.on('data', function (v) {
            post += v
          })
          req.on('end', function () {
            var obj = qs.parse(post);
            arr.push(obj);
            console.log(arr);
            fs.writeFile('./02_交互.json', JSON.stringify(arr), function (err) {
              if (err) {
                res.end(JSON.stringify({ code: 404, msg: '加载失败' }))
              } else {
                res.end(JSON.stringify({ code: 200, msg: '加载成功' }))
              }
            })
          })
        }
      })
      break;
    case '/del':
      fs.readFile('./02_交互.json', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '加载失败' }))
        } else {
          var arr = JSON.parse(data);
          var id = url.parse(req.url, true).query.id
          var index = arr.findIndex(function (v) {
            return v.id === id;
          })
          arr.splice(index, 1)
          fs.writeFile('./02_交互.json', JSON.stringify(arr), function (err) {
            if (err) {
              res.end(JSON.stringify({ code: 404, msg: '加载失败' }))
            } else {
              res.end(JSON.stringify({ code: 200, msg: '加载成功' }))
            }
          })
        }
      })
      break;
    default:
      break;
  }
}).listen(3000, function () {
  console.log('启动成功,http://localhost:3000');
})