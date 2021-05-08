var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = 1000;
var a = window.innerWidth;
var x = canvas.width/2 - 75;
var y = canvas.height-140;
var dx = 30;
var dy = 3;
var k = 0;
var start = 0;
var lose = 0;
var s = 0;
var s1 = 50;
var s2 = 700;
var s3 = 0;
var score = 0;
var scoreNow=0;
var meteorite1;
var bestScore = 0;
var version = 0;
var meteoritexit = 1;
var bulletWidth = 16;
var bulletHeight = 50;
var live =1;
var up = false;
var down = false;
var left = false;
var right = false;
var fire = false;
var openMenu = true;
var back = new Image();
back.src = 'images/menu.jpg';
var space = new Image();
space.src = 'images/space.png';
var meteorite = new Image();
meteorite.src = 'images/meteorite.png';
var spaceship = new Image();
spaceship.src = 'images/spaceship.png';
var laser = new Image();
laser.src = 'images/laser.png';
var UFO = new Image();
UFO.src = 'images/UFO.png';

var mousedown=false;
document.addEventListener("mousedown", mouseDownStart, false);
document.addEventListener("keydown",keyDownStart, false);
document.addEventListener("keydown",move, false);
document.addEventListener("keyup",stopMove, false);

function mouseDownStart(e){
      mousedown = true;
}

function keyDownStart(e){
	if(e.keyCode == 42){
        mousedown = true;
    }
}

function move(e){
    if(e.keyCode == 38){
        up = true;
    }
    if(e.keyCode == 40){
        down = true;
    }
    if(e.keyCode == 37){
        left = true;
    }
    if(e.keyCode == 39){
        right = true;
    }
    if(e.keyCode == 32){
        fire = true;
    }
}

function stopMove(e){
    if(e.keyCode == 38){
        up = false;
    }
    if(e.keyCode == 40){
        down = false;
    }
    if(e.keyCode == 37){
        left = false;
    }
    if(e.keyCode == 39){
        right = false;
    }
    if(e.keyCode == 32){
        fire = false;
    }
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function Menu() {
	ctx.beginPath();
	ctx.drawImage(back, 0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.font = "40px Arial";
    ctx.fillText("Нажмите  пробел чтобы играть с клавиатуры", 140, 60);
	if(version == 1){
	ctx.fillText("your best score: "+ bestScore, 350, 250);
	ctx.fillText("your score: "+ scoreNow, 350, 325);
	}
	else
		ctx.fillText("your best score: "+ bestScore, 350, 300);
    ctx.fillText("Или нажмите на экран чтобы играть мышкой", 20, 575);
	ctx.closePath();
}

function Score() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score:" +score, 30, 60);
	s+=1;
	if(s % 100 == 0){
	score = score + 1;
	s=0;
	}
}

function drawHealth() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("health:" + player.gethealth()+"%", 800, 60);
	if(player.gethealth()<=0){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		mousedown = false;
		openMenu = true;
		ship.x = canvas.width/2 - 75;
		ship.y = canvas.height - 140;
		player.health=5;
		if(score > bestScore)
			bestScore = score;
		scoreNow = score;
		score = 0;
		version = 1;
		bullets.splice(0, bullets.length);
        obstacles.splice(0, obstacles.length);		
	}	
}

class Ship{
	x = canvas.width/2 - 75;
	y = canvas.height - 140;
	dx = 5;
	dy = 5;
	shipMove(){
	if(up){
		if(this.y - this.dy >= 0)
		this.y -= this.dy;
	}
	if(right){
		if(this.x + this.dx < 1000-134)
		this.x += this.dx;
	}
	if(down){
		if(this.y + this.dy <=canvas.height-134)
		this.y += this.dy;
	}
	if(left){
		if((this.x - this.dx) > 0)
		this.x -= this.dx;
	}
	}
	drawShip(){
	    ctx.drawImage(spaceship, this.x, this.y, 134, 134);
	}
	coordinate_x(){
		return(this.x);
	}
	coordinate_y(){
		return(this.y);
	}
}
ship = new Ship(); 

const bullets = [];
class Bullet {
	bulletWidth = 30;
    bulletHeight = 70;
   constructor(){
	  this.hit = 1;
      this.x = ship.coordinate_x();
      this.y = ship.coordinate_y();
	  this.s3 = s3;
      bullets.push(this);
   }
   drawBulletShip(){
      this.y-=2.5;
	  if(this.hit==1)
      ctx.drawImage(laser,this.x + 59, this.y - 35, bulletWidth, bulletHeight);
      if(this.y < -200)
		  bullets.splice(this,1);
   }
}

const obstacles = [];
class Obstacle{
	constructor(){
	this.live = 1;
	this.x = getRandomInt(100, 900);
	this.y = getRandomInt(-100,-50);
	this.dx = getRandomFloat(-1.2, 1.2);
	this.dy = getRandomFloat(1.8, 3);
	obstacles.push(this);
	}
	draw(){
		if(this.live == 1)
	    ctx.drawImage(meteorite, (this.x += this.dx) , (this. y += this.dy) , 100, 100);
		for(let i = 0; i < bullets.length; i++){ 
			if(bullets[i].x > this.x - 70 && bullets[i].x < this.x + bulletWidth + 35&& (bullets[i].y- this.y) <= 100)
				if( bullets[i].y > this.y + bulletHeight )
			      if( bullets[i].hit == 1 && this.live == 1){
				this.live = 0;
				bullets[i].hit=0;
			}
		}			
	}
	damage(){
		if(this.x + 100 >= ship.coordinate_x()+30 && this.x  <= ship.coordinate_x() + 90 && Math.abs(ship.coordinate_y()-this.y) <= 90 )
			if(this.live == 1){
			player.hit();
		    this.live=0;
			}
	}
}

const enemy = [];
class Enemy{
	constructor(){
	this.live = 3;
	this.x = getRandomInt(100, 900);
	this.y = getRandomInt(50,100);
	this.dx = getRandomFloat(2, 4);
	this.dy = getRandomFloat(1.8, 3);
	this.border = getRandomInt(100, 300);
	this.route = getRandomInt(0, 2);
	enemy.push(this);
	}
	drawUFO(){
		if(this.live != 0){
			if(this.y < this.border)
				this.y += this.dy;
			if(this.route == 0){
			    this.x += this.dx;
				if(this.x > 850)
					this.route = 1;
			}
			if(this.route == 1){
			    this.x -= this.dx;
				if(this.x <= 0)
					this.route = 0;
			}
		}
	    ctx.drawImage(UFO, this.x , this.y , 150, 150);			
	}
}

class Player{
	constructor(){
        this.health = 5000;
    }
	gethealth(){
		return(this.health);
	}
	hit(){
		 this.health -= 5;
	}
}
player = new Player();



function draw(){
	if(!mousedown){
		Menu();
	}
	if(mousedown && openMenu == true){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		openMenu = false;
	}
	if(openMenu == false){
		s1+=1;
		s2+=1;
		ctx.drawImage(space, 0, 0, canvas.width, canvas.height);
		obstacles.forEach(obstacle => obstacle.draw());
		obstacles.forEach(obstacle => obstacle.damage());
		enemy.forEach(Enemy => Enemy.drawUFO());
		if( s2 > 700) {
		   k = getRandomInt(1,7);
		   for(let i = 0 ;i < k; i++){
               new Obstacle();
		       s3 += 1;
		   }
	       new Enemy();
		   s2 = 0;
       }
	    drawHealth();
		Score();
		ship.drawShip();
		bullets.forEach(bullet => bullet.drawBulletShip());
		if(fire && s1 > 50) {
           new Bullet();
		   s1 = 0;
       }
	   ship.shipMove();
	}
	
}


setInterval(draw, 10);

