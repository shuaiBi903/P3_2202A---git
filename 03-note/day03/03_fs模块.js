// 导入fs模块
var fs = require('fs');

var jsonPath = "./03.json";

var obj = {
    username: "ken2"
}

fs.readFile(jsonPath, "utf-8", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        // console.log(JSON.parse(data));
        var arr = JSON.parse(data);
        arr.push(obj);
        // 存入json文件时要转换成JSON字符串
        var str = JSON.stringify(arr);
        fs.writeFile(jsonPath, str, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("写入成功");
            }
        })
    }
})


/* 
    JSON.stringify([]/{})
    JSON.parse("[]"/"{}")

    报错: Unexpected token u in JSON at position 0
    因为 JSON.parse(undefined)
    查看 JSON.parse()括号里面的内容是否为undefined
*/
