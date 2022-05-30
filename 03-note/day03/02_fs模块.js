// 载入fs模块
var fs = require('fs');

// 读取文件
fs.readFile("./02.txt", "utf-8", function (err, data) {
    // if (err) {
    //     throw "读取文件路径错误"; // 抛出错误  throw 之后代码不执行
    // }
    // console.log(data);

    // 判断错误
    if (err) {
        console.log("读取文件路径错误", err);
    } else {
        console.log(data);
    }

})
