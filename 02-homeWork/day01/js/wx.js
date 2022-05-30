//获取dom
var shuDom = document.querySelector(".shuIpt");
var addDom = document.querySelector(".add");
var touXiangDom = document.querySelector(".touXiang");
//声明一个开关
var f = false;
var touXiang1 = "./img/02.png";
var touXiang2 = "./img/7971a0df39a5280e7a6dce22e04a7c57.png";
var arr = localStorage.arr0520_1844
	? JSON.parse(localStorage.arr0520_1844)
	: [];
show();
//将输入框内容放进数组中
addDom.onclick = function () {
	if (shuDom.value == "") {
		return;
	}
	var obj = {
		//获取时间chuo
		id: +new Date(),
		//如果f = true 的话 将输入框的值放在neiRong1
		neiRong1: f ? "" : shuDom.value,
		//如果f = false 的话 将输入框的值放在neiRong1
		neiRong2: f ? shuDom.value : "",
		content: shuDom.value,
		leftTou1: f ? "" : `<img src=${touXiang2} />`,
		rightTou2: f ? `<img src=${touXiang1} />` : "",
		clearTime: time(),
	};
	arr.push(obj);
	show();
	console.log(arr);

	shuDom.value = "";
};

//判断头像
function qieHuan(ts) {
	var tieleDom = document.querySelector("h3");
	f = !f;
	if (f) {
		ts.src = touXiang1;
		tieleDom.innerText = "大宝贝";
	} else {
		ts.src = touXiang2;
		tieleDom.innerText = "小可爱";
	}
}
//聊天记录的渲染
var times = "";
function show() {
	//本地存储
	localStorage.arr0520_1844 = JSON.stringify(arr);
	//获取渲染区域的Dom
	var middleDom = document.querySelector(".middle");
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		if (i == 0 || arr[i].id - arr[i - 1].id > 5000) {
			times = arr[i].clearTime;
			// console.log(arr[i].id - arr[i - 1].id);
		} else {
			times = "";
		}

		str += `
		   <div class='time'> ${times}</div>
		    <div class="chat left">
					${arr[i].leftTou1}
		            <span>${arr[i].neiRong1}</span>
			</div>
			<div class="chat right">
				<span>${arr[i].neiRong2}</span>
		        ${arr[i].rightTou2}
			</div>
		`;
	}
	middleDom.innerHTML = str;
}
//时间函数
function time() {
	var dt = new Date();
	return (
		b0(dt.getFullYear()) +
		"年" +
		b0(dt.getMonth()) +
		"月" +
		b0(dt.getDate()) +
		"日" +
		" " +
		b0(dt.getHours()) +
		":" +
		b0(dt.getMinutes()) +
		":" +
		b0(dt.getSeconds())
	);
}
//个位数补0
function b0(num) {
	return num < 10 ? "0" + num : num;
}
