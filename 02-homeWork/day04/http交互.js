//载入http模块
var http = require('http');
//载入fs
var fs = require('fs');
//载入url
var url = require('url');
//载入qs
var qs = require('querystring')
//设置http方法创建服务
http.createServer(function (req, res) {
  //设置响应编码
  res.writeHead(200, { 'Content-Type': 'text/html;charset:utf-8' })

  //获取路径
  var pathname = url.parse(req.url).pathname

  //判断路径
  switch (pathname) {
    //默认路径绑定html
    case '/':
      //fs模块绑定html
      fs.readFile('./01交互.html', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '读取失败' }))
        } else {
          res.end(data)
        }
      })
      break;

    case '/list':
      //fs模块读取json
      fs.readFile('./json存储.json', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '渲染失败' }))
        } else {
          res.end(JSON.stringify({ code: 200, msg: '渲染成功', data: JSON.parse(data) }))
        }
      })
      break;
    case '/add':
      fs.readFile('./json存储.json', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '添加失败' }))
        } else {
          var arr = JSON.parse(data)
          var post = ''
          req.on('data', function (v) {
            post += v
          })
          req.on('end', function () {
            var obj = qs.parse(post)
            arr.push(obj)
            //写入并渲染
            fs.writeFile('./json存储.json', JSON.stringify(arr), function (err) {
              if (err) {
                res.end(JSON.stringify({ code: 404, msg: '写入失败' }))
              } else {
                res.end(JSON.stringify({ code: 200, msg: '写入成功' }))
              }
            })
          })
        }
      })
      break;
    case '/del':
      fs.readFile('./json存储.json', function (err, data) {
        if (err) {
          res.end(JSON.stringify({ code: 404, msg: '删除失败' }))
        } else {
          var arr = JSON.parse(data)
          var id = url.parse(req.url, true).query.id;
          var index = arr.findIndex(function (item) {
            return item.id == id
          })
          arr.splice(index, 1)
          var str = JSON.stringify(arr)
          //写入
          fs.writeFile('./json存储.json', str, function (err) {
            if (err) {
              res.end(JSON.stringify({ code: 404, msg: '删除失败' }))
            } else {
              res.end(JSON.stringify({ code: 200, msg: '删除成功' }))
            }
          })
        }

      })
      break;
    default:
      break;
  }
}).listen(3000, function () {
  console.log('服务已启动,http://localhost:3000');
})