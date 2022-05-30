// 载入http模块
var http = require('http');
var url = require('url');
var fs = require('fs');

// 创建服务
http.createServer(function (req, res) {
    /* 
    request 请求
    response 响应
    */
    // 设置响应编码格式
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })

    // 获取路径
    var pathname = url.parse(req.url).pathname;
    // console.log(pathname);

    // 判断路径
    switch (pathname) {
        case "/":
            fs.readFile("./04.html", function (err, data) {
                if (err) {
                    res.end("404渲染失败");
                } else {
                    res.end(data);
                }
            })
            break;
        case "/add":

            res.end("添加");
            break;
        case "/list":
            fs.readFile("./04.json", function (err, data) {
                if (err) {
                    res.end(JSON.stringify({ code: 404, msg: "渲染失败" }));
                } else {
                    // 向前端(客户端/浏览器)返回数据
                    res.end(JSON.stringify({ code: 200, msg: "渲染成功", data: JSON.parse(data) }));
                }
            })
            break;
        case "/del":

            res.end("删除");
            break;
        default:
            res.end("其它"); // 必须要有 否则不加载    之后的代码都不执行
            break;
    }

}).listen(3000, function () { //  端口:3000 (随便写) 函数:启动服务的提示
    console.log("服务启动了,http://localhost:3000");
})
