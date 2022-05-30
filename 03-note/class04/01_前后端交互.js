// 载入模块
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

/* 
    url.parse()  将地址栏转换为对象
*/

http.createServer(function (req, res) {

    // 设置响应编码格式
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })

    // 获取路径
    var pathname = url.parse(req.url).pathname;

    // 判断路径
    switch (pathname) {
        case "/":
            fs.readFile("./01.html", function (err, data) {
                if (err) {
                    res.end("404页面找不到");
                } else {
                    res.end(data);
                }
            })
            break;
        case "/add":
            fs.readFile("./01.json", function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: "读取失败" }));
                } else {
                    var arr = JSON.parse(data); // 拿到JSON文件里面的数组
                    // post接收前端传过来的数据
                    var post = ""; // 接收前端的数据
                    req.on("data", function (v) {
                        post += v;
                    })
                    req.on("end", function () {
                        /* 
                        querystring模块  参数序列化转对象
                        a=1
                        {a:1}
                        */
                        // console.log(post); // 监听结束后才能获取到数据
                        var obj = qs.parse(post);
                        arr.push(obj);
                        // 转JSON字符串
                        var str = JSON.stringify(arr);
                        fs.writeFile("./01.json", str, function (err) {
                            if (err) {
                                res.end(JSON.stringify({ code: 404, msg: "写入失败" }));
                            } else {
                                res.end(JSON.stringify({ code: 200, msg: "写入成功" }));
                            }
                        })
                    })
                }
            })
            // res.end("add");
            break;
        case "/list":
            fs.readFile("./01.json", function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: "渲染失败" }));
                } else {
                    res.end(JSON.stringify({ code: 200, msg: "渲染成功", data: JSON.parse(data) }));
                }
            })
            break;
        case "/del":
            fs.readFile("./01.json", function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: "读取失败" }));
                } else {
                    var arr = JSON.parse(data); // 拿到JSON文件里面的数组
                    // get接收前端传过来的数据
                    var id = url.parse(req.url, true).query.id;
                    var index = arr.findIndex(function (item) {
                        return item.id == id;
                    })
                    arr.splice(index, 1);
                    // 转JSON字符串
                    var str = JSON.stringify(arr);
                    fs.writeFile("./01.json", str, function (err) {
                        if (err) {
                            res.end(JSON.stringify({ code: 404, msg: "写入失败" }));
                        } else {
                            res.end(JSON.stringify({ code: 200, msg: "写入成功" }));
                        }
                    })
                }
            })
            break;
        default:
            res.end("404 Not Found");
            break;
    }

}).listen(3000, function () {
    console.log("server is running at http://localhost:3000");
})




