//载入http
var http = require('http');
//载入qs
var fs = require('fs')
//载入url
var url = require('url');
//载入qs模块
var qs = require('querystring')

//创建服务
http.createServer(function (req, res) {
    //设置响应编码
    res.writeHead(200, { 'Content-Type': 'text/html;charset:utf-8' })
    //获取路径
    var pathname = url.parse(req.url).pathname;
    //判断路径
    switch (pathname) {
        //设置默认路径
        case '/':
            fs.readFile('./01展示.html', function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: '读取失败' }))
                } else {
                    res.end(data)
                }
            })
            break;
        //渲染路径
        case '/list':
            fs.readFile('./json文件.json', function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: '渲染失败' }))
                } else {
                    res.end(JSON.stringify({ code: 200, msg: '渲染成功', data: JSON.parse(data) }))
                }
            })
            break;
        //添加路径
        case '/add':
            fs.readFile('./json文件.json', function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: '渲染失败' }))
                } else {
                    //将json文件转换为数组
                    var arr = JSON.parse(data);
                    //声明变量接收前端传输的数据
                    var post = '';
                    req.on('data', function (v) {
                        post += v;
                    })
                    req.on('end', function () {
                        var obj = qs.parse(post);
                        arr.push(obj);
                        //写入数据
                        fs.writeFile('./json文件.json', JSON.stringify(arr), function (err) {
                            if (err) {
                                res.end(JSON.stringify({ code: 404, msg: '渲染失败' }))
                            } else {
                                res.end(JSON.stringify({ code: 200, msg: '渲染成功', data: JSON.parse(data) }))
                            }
                        })
                    })
                }
            })
            break;
        //删除路径
        case '/del':
            fs.readFile('./json文件.json', function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: '渲染失败' }))
                } else {
                    var arr = JSON.parse(data)
                    //获取传参的内容
                    var id = url.parse(req.url, true).query.id
                    //获取下标
                    var index = arr.findIndex(function (item) {
                        return item.id == id
                    })
                    arr.splice(index, 1)
                    fs.writeFile('./json文件.json', JSON.stringify(arr), function (err) {
                        if (err) {
                            res.end(JSON.stringify({ code: 404, msg: '渲染失败' }))
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