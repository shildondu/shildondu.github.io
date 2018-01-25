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

function Star() {		
	// 随机半径
	this.r = randomBetween(1, 10);	
	this.diam = this.r * 2;			
	// 随机位置			
	var x = randomBetween(0, canvas.width - this.r);		
	this.x = x < this.r ? this.r : x;			
	var y = randomBetween(0, canvas.height - this.r);			
	this.y = y < this.r ? this.r : y;
	// 随机速度	
	this.speedX = randomBetween(-10, 10) / 10;			
	this.speedY = randomBetween(-10, 10) / 10;			
	// 随机颜色			
	// this.color = randomColor();		
	this.color = '#fff';		
}		

Star.prototype.draw = function() {			
	// 阴影设置
	ctx.shadowBlur = 20;
	ctx.shadowColor = '#FCE7CA';
	// 填充颜色
	ctx.fillStyle = this.color;			
	ctx.beginPath();
	// 绘制弧线函数：画圆
	// ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);			
	// 画星星
	ctx.moveTo(this.x, this.y - this.r);
	ctx.arcTo(this.x, this.y, this.x + this.r, this.y, this.r);
	ctx.arcTo(this.x, this.y, this.x, this.y + this.r, this.r);
	ctx.arcTo(this.x, this.y, this.x - this.r, this.y, this.r);
	ctx.arcTo(this.x, this.y, this.x, this.y - this.r, this.r);
	ctx.closePath();			
	// ctx.rotate(randomBetween(0, 180) * Math.PI / 180);
	ctx.fill();		
}		

Star.prototype.move = function() {
	this.x += this.speedX;			
	// 使得能从屏幕另一端出来
	if (this.x > canvas.width - this.r) {
		//				this.speedX *= -1;			
		this.x = this.r;
	} else if (this.x < this.r) {				
		this.x = canvas.width - this.r;
	}			
	this.y += this.speedY;			
	if (this.y > canvas.height - this.r) {
		//				this.speedY *= -1;				
		this.y = this.r;
	} else if (this.y < this.r) {				
		this.y = canvas.height - this.r;
	}		
}		

var moveStar = [];		

var staticStar = [];

function initStar() {			
	//初始化，放到数组中			
	for (var i = 0; i < 50; i++) {				
		var obj = new Star();				
		obj.draw();				
		obj.move();				
		moveStar.push(obj);			
	}		

	for (var i = 0; i < 200; i++) {
		var obj = new Star();
		obj.draw();
		staticStar.push(obj);
	}
}		

initStar();		

var dxdy = [];

function starMove() {			
	ctx.clearRect(0, 0, canvas.width, canvas.height);			
	for (var i = 0; i < staticStar.length; i++) {
		var star = staticStar[i];
		star.draw();
	}

	// 遍历所有的圆形对象,让对象自己重绘,移动			
	for (var i = 0; i < moveStar.length; i++) {				
		var star = moveStar[i];				
		star.draw();				
		star.move();				
		dxdy[i] = {					
			dx: star.x,					
			dy: star.y,
			dr: star.r
		};				
		var dx = dxdy[i].dx;				
		var dy = dxdy[i].dy;				
		var dr = dxdy[i].dr;

		for (var j = 0; j < i; j++) {					
			var sx = dxdy[j].dx;
			var sy = dxdy[j].dy;
			var sr = dxdy[j].dr;

			// 两点直线距离
			l = Math.sqrt((dx-sx) * (dx-sx) + (dy-sy) * (dy-sy));					
			// 小于500px才有连线
			if (l < 500) {
				var c = 1 / l * 10;					
				var o = c > 1 ? 1 : c;						
				ctx.strokeStyle = 'rgba(255, 255, 255, '+ o +')';					
				ctx.beginPath();				
				ctx.lineWidth = 2;				
				ctx.moveTo(dxdy[i].dx, dxdy[i].dy);
				ctx.lineTo(dxdy[j].dx, dxdy[j].dy);
				ctx.closePath();
				ctx.stroke();
			}
		}			
	}			
	// 告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘
	// 每秒最多刷新60或75次，和显示器刷新保持同步，节约资源
	window.requestAnimationFrame(starMove);
}

starMove();