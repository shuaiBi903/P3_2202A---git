//载入fs模块
var fs = require('fs');
fs.writeFile('./004.txt', ',老帅比在这', { flag: 'a' }, function (err) {
  if (err) {
    console.log('地址估计整错了,老铁');
  } else {
    console.log('Saved.');
  }
});
//读取fs
fs.readFile('./004.txt', 'utf-8', function (err, data) {
  if (err) {
    console.log('地址估计整错了,老铁');
  } else {
    console.log(data);
  }
});
