//创建xhr 对象
var xhr = new XMLHttpRequest();
//规定请求方式
xhr.open('POST', 'http://localhost')
//设置请求头
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//发送请求 将实参传递到数据库
xhr.send()
//响应数据
xhr.onreadystatechange = function () {
  if (xhr.readState == 4 && xhr.status == 200) {
    console.log(JSON.parse(xhr.responseText));
  }
}