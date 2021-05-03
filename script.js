var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = 1000;
var a = window.innerWidth;
var x = canvas.width/2-100;
var y = canvas.height-110;
var dx = +2;
var dy = +2;
var start = 0;
var lose = 0;
var s = 0;
var s1 = 0;
var score = 0;
var meteorite1;
var bestScore = 0;
var meteoritexit=0;
var openMenu = true;
var back = new Image();
back.src = 'images/menu.jpg';

var space = new Image();
space.src = 'images/space.png';

var meteorite = new Image();
meteorite.src = 'images/meteorite.png';

var MOUSEDOWN=false;
document.addEventListener("mousedown", mouseDown, false);

function mouseDown(e){
      MOUSEDOWN = true;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function StartMenu() {
	ctx.beginPath();
	ctx.drawImage(back, 0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.font = "40px Arial";
    ctx.fillText("Нажмите  пробел чтобы играть с клавиатуры", 140, 60);
	ctx.fillText("your score record:"+ bestScore, 325, 300);
    ctx.fillText("Или нажмите на экран чтобы играть мышкой", 20, 575);
	ctx.closePath();
}

function Score() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score:" +score, 30, 60);
	s+=1;
	if(s % 100 == 0)
	score = score + 1;
}

class Obstacle{
	x = getRandomInt(200, 800);
	y = getRandomInt(-150,-100);
	dx = getRandomFloat(-1.2, 1.2);
	dy = getRandomFloat(1.8, 3);
	drawMeteorit(){
	    ctx.drawImage(meteorite, this.x , this.y , 100, 100);
	}
}
if( meteoritexit == 0){
    meteorite1 = new Obstacle();
    meteoritexit = 1;
}
if(meteorite.x > 1000 &&meteorite.y > 1000)
	meteoritexit = 0

function draw(){
	if(!MOUSEDOWN){
		StartMenu();
	}
	if(MOUSEDOWN && openMenu == true){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		openMenu = false;
	}
	if(openMenu == false){
		s1+=1;
		ctx.drawImage(space, 0, 0, canvas.width, canvas.height);
		Score();
		meteorite1.x+=meteorite1.dx;
        meteorite1.y+=meteorite1.dy;
		meteorite1.drawMeteorit();
	}
}


setInterval(draw, 10);

