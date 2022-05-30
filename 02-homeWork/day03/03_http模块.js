//载入http模块
var http = require('http');
//载入fs模块
var fs = require('fs');
//载入url模块
var url = require('url');
//载入querySelector模块
var qs = require('querystring');

//设置http方法
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  //获取路径
  var pathname = url.parse(req.url).pathname;

  //判断路径
  switch (pathname) {
    case '/':
      //绑定html页面
      fs.readFile('./03_交互.html', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '加载失败' }))
        } else {
          res.end(data)
        }
      })
      break;

    case '/list':
      fs.readFile('./03_储存.json', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '加载失败' }))
        } else {
          res.end(JSON.stringify({ code: 200, msg: '加载成功', data: JSON.parse(data) }))
        }
      })
      break;
    case '/add':
      fs.readFile('./03_储存.json', function (err, data) {
        if (err) {
          console.log('路径读取错误');
        } else {
          var arr = JSON.parse(data)
          var post = ''
          req.on("data", function (v) {
            post += v
          })
          req.on("end", function () {
            var obj = qs.parse(post)
            arr.push(obj)
            var str = JSON.stringify(arr)
            fs.writeFile('./03_储存.json', str, function (err) {
              if (err) {
                res.end(JSON.stringify({ code: 404, msg: '添加失败' }))
              } else {
                res.end(JSON.stringify({ code: 200, msg: '添加成功' }))
              }
            })
          })
        }

      })
      break
    case '/del':
      fs.readFile('./03_储存.json', function (err, data) {
        if (err) {
          res.end({ code: 404, msg: '写入错误' })
        } else {
          var arr = JSON.parse(data)
          var id = url.parse(req.url, true).query.id
          var index = arr.findIndex(function (v) {
            return v.id == id
          })
          arr.splice(index, 1)
          var str = JSON.stringify(arr)
          fs.writeFile('./03_储存.json', str, function (err) {
            if (err) {
              res.end(JSON.stringify({ code: 404, msg: '删除失败' }))
            } else {
              res.end(JSON.stringify({ code: 200, msg: '删除成功' }))
            }
          })
        }
      })
      break
    default:
      break;
  }
}).listen(3000, function () {
  console.log('服务已启动,http://localhost:3000');
})