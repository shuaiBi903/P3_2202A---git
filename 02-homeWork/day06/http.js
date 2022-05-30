//载入http
var http = require('http');
//载入fs模块
var fs = require('fs');
//载入url模块
var url = require('url');
//载入qs模块
var qs = require('querystring');

http.createServer(function (req, res) {
    //响应编码
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    //获取路径
    var pathname = url.parse(req.url).pathname
    //判断路径
    switch (pathname) {
        case '/':
            fs.readFile('./http.html', function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: '请求错误' }))
                } else {
                    res.end(data)
                }
            })
            break;
        //默认渲染
        case '/list':
            fs.readFile('./http.json', function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: '请求错误' }))
                } else {
                    res.end(JSON.stringify({ code: 200, msg: '渲染成功', data: JSON.parse(data) }))
                }
            })
            break;
        //添加
        case '/add':
            fs.readFile('./http.json', function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: '请求错误' }))
                } else {
                    var arr = JSON.parse(data)
                    var post = ''
                    req.on('data', function (v) {
                        post += v
                    })
                    req.on('end', function () {
                        var obj = qs.parse(post)
                        arr.push(obj)
                        fs.writeFile('./http.json', JSON.stringify(arr), function (err) {
                            if (err) {
                                res.end(JSON.stringify({ code: 404, msg: '请求错误' }))
                            } else {
                                res.end(JSON.stringify({ code: 200, msg: '渲染成功', data: JSON.parse(data) }))
                            }
                        })
                    })
                }
            })
            break;
        //删除
        case '/del':
            fs.readFile('./http.json', function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: '请求错误' }))
                } else {
                    var id = url.parse(req.url, true).query.id
                    var arr = JSON.parse(data)
                    var index = arr.findIndex(function (item) {
                        return item.id == id
                    })
                    arr.splice(index, 1)
                    fs.writeFile('./http.json', JSON.stringify(arr), function (err) {
                        if (err) {
                            res.end(JSON.stringify({ code: 404, msg: '请求错误' }))
                        } else {
                            res.end(JSON.stringify({ code: 200, msg: '渲染成功', data: JSON.parse(data) }))
                        }
                    })
                }
            })
            break;
        default:
            break;
    }
}).listen(3000, function () {
    console.log('服务启动成功,http://localhost:3000');
})