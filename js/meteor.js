// 获取窗口宽高		
var width = window.innerWidth;		
var height = window.innerHeight;		
var backgroundColor = 121617;
var canvas = document.getElementById("container");		
var ctx = canvas.getContext("2d");		

// 设置画布宽高与窗口宽高一样		
canvas.width = width;		
canvas.height = height;		

// 随机颜色
function randomColor() {
	var r = Math.random();
	var randomNum = Math.round(r * 1000000);
	// 不和背景色相同
	if (randomNum == backgroundColor) {
		return randomColor();
	} else {
		var color = '#' + randomNum;
		return color;
	}
}

// 随机数函数		
function randomBetween(min, max, isFloat = false, after = 2) {			
	if (isFloat) {
		return parseFloat((max - min) * Math.random() + min).toFixed(after);
	}
	return parseInt((max - min) * Math.random() + min);
}		

function Meteor() {		
	// 随机半径
	this.r = randomBetween(1, width);	
	// 随机起始位置			
	var begin = randomBetween(1.5, 1.93, true);		
	this.begin = parseFloat(begin);
	var end = parseFloat(begin) + 0.07;
	this.end = end;
	// 随机速度	
	this.speed = parseFloat(randomBetween(0.005, 0.010, true, 3));			
	this.color = '#fff';		
}		

Meteor.prototype.draw = function() {			
	ctx.shadowBlur = 20;
	ctx.shadowColor = '#FCE7CA';
	ctx.strokeStyle = this.color;			
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.arc(0, height, this.r, this.begin * Math.PI, this.end * Math.PI);
	ctx.stroke();
}		

Meteor.prototype.move = function() {
	this.begin += this.speed;
	this.end += this.speed;
	if (this.begin >= 1.93 || this.end >= 2) {
		this.begin = parseFloat(1.50);
		this.end = parseFloat(this.begin) + 0.07;
	}
}		

var moveMeteor = [];		

function initMeteor() {			
	//初始化，放到数组中			
	for (var i = 0; i < 300; i++) {				
		var obj = new Meteor();				
		moveMeteor.push(obj);			
	}		
}		

initMeteor();		

function meteorMove() {			
	ctx.clearRect(0, 0, canvas.width, canvas.height);			
	// 遍历所有的圆形对象,让对象自己重绘,移动			
	for (var i = 0; i < moveMeteor.length; i++) {				
		var meteor = moveMeteor[i];				
		meteor.draw();				
		meteor.move();
	}			
	// 告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘
	// 每秒最多刷新60或75次，和显示器刷新保持同步，节约资源
	window.requestAnimationFrame(meteorMove);
}

meteorMove();