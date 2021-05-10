var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = 1000;
var screenlength = window.innerWidth;
var indent = (screenlength-1000)/2;
var piece = canvas.height/8;
var x = canvas.width/2 - 75;
var y = canvas.height-140;
var dx = 30;
var dy = 3;
var k = 0;
var start = 0;
var lose = 0;
var clean = 0;
var bossfightStart = 100;
var s = 0;
var border = -1;
var border2 = 0;
var s1 = 50;
var s2 = 800;
var s3 = 1;
var s4 = 1; 
var s5 = 0;
var s6 = 0;
var clickX =0;
var clickY = 0;
var control =0;
var shield = false;
var score = 0;
var scoreNow=0;
var bestScore = 0;
var version = 0;
var bossfight = 0;
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
var laser2 = new Image();
laser2.src = 'images/laser2.png';
var UFO = new Image();
UFO.src = 'images/UFO.png';
var Shield = new Image();
Shield .src = 'images/shield.png';
var boss = new Image();
boss.src = 'images/boss.png';

var mousedown=false;
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);
document.addEventListener("keydown",keyDownStart, false);
document.addEventListener("keydown",move, false);
document.addEventListener("keyup",stopMove, false);
document.addEventListener("mousemove", mouseMove, false);

function mouseDown(e){
      mousedown = true;
	  control = 1;
}

function mouseUp(e){
    mousedown = false;
}

function mouseMove(e){
    clickX = e.clientX;
    clickY = e.clientY;
}

function keyDownStart(e){
	if(e.keyCode == 32){
		control = 2;
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

const bullets = [];
class Bullet {
   constructor(){
	  this.bulletWidth = 16;
      this.bulletHeight = 50;
	  this.hit = 1;
      this.x = ship.coordinate_x();
      this.y = ship.coordinate_y();
      bullets.push(this);
   }
   drawBulletShip(){
      this.y -= 2.5;
	  if(this.hit==1)
      ctx.drawImage(laser,this.x + 59, this.y - 35, this.bulletWidth, this.bulletHeight);
      if(this.y < -200)
		  bullets.splice(this,1);
	  if(this.y < 0)
		  this.hit = 0;
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
		this.x += this.dx;
		this. y += this.dy;
		if(this.live == 1)
	    ctx.drawImage(meteorite, this.x , this.y , 100, 100);
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
			if(player.shield == false){
	            player.shield = true;
	            shield = true;
	           }
			}
	}
}

const enemy = [];
class Enemy{
	constructor(){
	this.live = 2;
	this.x = getRandomInt(100, 900);
	this.y = getRandomInt(-50,-100);
	this.dx = getRandomFloat(2, 4);
	this.dy = getRandomInt(1.8, 3);
	this.quantity = getRandomInt(0, 4);
	this.route = getRandomInt(0, 2);
	this.j;
	this.s=0;
	this.border = piece * this.quantity;
	enemy.push(this);
	}
	drawUFO(){
		if(this.live != 0){
			if(this.y + this.dy > this.border && this.y != this.border)
				this.y = this.border;
			if(this.y + this.dy < this.border)
				this.y += this.dy;
			
	    ctx.drawImage(UFO, this.x , this.y , 150, 150);	
		}
		for(let i = 0; i < bullets.length; i++){ 
			if(bullets[i].x > this.x - 70 && bullets[i].x < this.x + 85 && (bullets[i].y- this.y) <= 100)
				if( bullets[i].y > this.y + bulletHeight )
			      if( bullets[i].hit == 1 && this.live != 0){
				this.live -=1;
				bullets[i].hit=0;
			}
		}
		if(this.s == 0 && this.y >= this.border&& this.live!=0){
		    this.j= new BulletEnemy(this.x-5 ,this.y + 75,0);
		    this.s = 1;
		}
		if(this.s==1){
			this.j.drawBulletUFO();
			this.j.damageBulletUFO();
		if(this.j.y> canvas.height+100){
			this.s = 0;
		}
	  }
    }
}

class Boss{
	constructor(){
	this.live = 2;
	this.x = canvas.width/2-230;
	this.y = getRandomInt(-50,-100);
	this.dx = 7;
	this.dy = 1;
	this.route = getRandomInt(0, 2);
	this.border = 100;
	this.s = 0;
	this.j = [];
	}
	drawBoss(){
		if(this.live != 0){
			if(this.border - this.y < this.dy)
				this.y = this.border;
			if(this.y < this.border)
				this.y += this.dy;
			if(score > 10){
			}
	    ctx.drawImage(boss, this.x , this.y , 460, 200);	
		}
		for(let i = 0; i < bullets.length; i++){ 
			if(bullets[i].x >= this.x-60 && bullets[i].x < this.x + 410 && bullets[i].y - this.y <= 130)
				if( bullets[i].y > this.y + bulletHeight )
			      if( bullets[i].hit == 1 && this.live != 0){
				this.live -=1;
				bullets[i].hit=0;
			}
		}
		if(this.s == 0 && this.y >= this.border&& this.live!=0){
		    this.j[0] = new BulletEnemy(this.x-20 ,this.y + 30,1);
			this.j[1] = new BulletEnemy(this.x+140 ,this.y + 100,1);
			this.j[2] = new BulletEnemy(this.x+300 ,this.y + 100,1);
		    this.s = 1;
		}
		if(this.s==1){
			for(let i=0;i<3;i++){
			this.j[i].drawBulletUFO();
			this.j[i].damageBulletUFO();
			}
		if(this.j[2].y > canvas.height+150){
			this.s = 0;
		}
	}
}
}

class BulletEnemy {
    constructor(a,b,c){
	  this.boss = c;
	  this.hit = 1;
	  this.bulletWidth = 35;
      this.bulletHeight = 65;
	  this.hit = 1;
      this.x = a;
      this.y = b+10;
    }
   drawBulletUFO(){
      this.y+=2;
	  if(this.hit == 1)
      ctx.drawImage(laser2,this.x + 64, this.y, this.bulletWidth, this.bulletHeight);
   }
   damageBulletUFO(){
	   if(this.hit==1)
	   if(this.x >= ship.coordinate_x()-70&& this.x  <= ship.coordinate_x() + 70 && Math.abs(ship.coordinate_y()-this.y) <= 50){
	   player.hitEnemyBullet();
	   if(player.shield == false){
	       player.shield = true;
	       shield = true;
	   }
	   this.hit = 0;
	   }
   }
}

class Player{
	constructor(){
        this.health = 5000;
		this.shield = false;
    }
	gethealth(){
		return(this.health);
	}
	hit(){
		if(this.shield === false)
		 this.health -= 5;
	}
	hitEnemyBullet(){
		if(this.shield === false)
		 this.health -= 2;
	}
}
player = new Player();

class Ship{
	x = canvas.width/2 - 75;
	y = canvas.height - 140;
	dx = 5;
	dy = 5;
	shipMove(){
	if(control==2){
	if(up){
		if(this.y - this.dy >= 0)
		this.y -= this.dy;
	}
	if(right){
		if(this.x + this.dx < 1000-134)
		this.x += this.dx;
	}
	if(down){
		if(this.y + this.dy <= canvas.height-134)
		this.y += this.dy;
	}
	if(left){
		if((this.x - this.dx) > 0)
		this.x -= this.dx;
	}
	}
	if(control==1){
		if (mousedown){
                if(clickX > indent + 134/2&& clickX < indent + canvas.width-134/2){
                    this.x = clickX -indent-134/2;
                }
				 if(clickY >0 +134/2 && clickY < canvas.height - 134/2){
                    this.y = clickY - 134/2;
                }
            }
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
boooss = new Boss();
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
		if(shield == true){
		ctx.drawImage(Shield, 900, 80, 80, 80);
		   if(s5 < 300)
			s5 += 1;
		if(s5 == 300){
			s5=0;
		    shield = false;
			player.shield = false;
		}
		}
		if(bossfight==0 && score > border){
		if( s2 > 800 && s4 == 1) {
		   k = getRandomInt(1,4);
		   for(let i = 0 ;i < k; i++){
                new Enemy();
		   }
		   k = getRandomInt(1,5);
		   for(let i = 0 ;i < k; i++){
               new Obstacle();
		   }
		   s2 = 0;
		   s4 = 0;
       }
	   for(let i=0; i < obstacles.length;i++)
		   if(obstacles[i].y < canvas.height+100)
			   s3 = 0;
		if(s3 == 1){
			obstacles.splice(0, obstacles.length);
			s4 = 1;
		}
		}
		s3 = 1;
		if(bossfight==1)
			boooss.drawBoss();
		Score();
		drawHealth();
		ship.drawShip();
		ship.shipMove();
		bullets.forEach(bullet => bullet.drawBulletShip());
		if(fire && s1 > 50) {
           new Bullet();
		   s1 = 0;
       }
	   if(score == bossfightStart && s6==0){
		   bossfight = 1;
		   boooss = new Boss();
		   border2 = score+2;
		   s6 = 1;
	   }
	   if( bossfight == 1){
		   if(clean==0){
		       bullets.splice(0, bullets.length);
               obstacles.splice(0, obstacles.length);
		       enemy.splice(0, enemy.length);
			   clean = 1;
		   }
		if(boooss.live == 0){
			border=score+5;
			bossfight = 0;
			bossfightStart=score + 100;
			s6=0;
			clean=0;
	   }
	}
}
}


setInterval(draw, 10);
