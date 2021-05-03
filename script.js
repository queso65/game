var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = 1000;
var x = canvas.width/2-100;
var y = canvas.height-110;
var dx = +2;
var dy = +2;
var start = 0;
var lose = 0;
var back = new Image();
back.src = 'images/menu.jpg';
var MOUSEDOWN=false;
document.addEventListener("mousedown", mouseDown, false);
function mouseDown(e){
      MOUSEDOWN = true;
}

function StartMenu() {
	ctx.beginPath();
	ctx.drawImage(back, 0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.font = "40px Arial";
    ctx.fillText("Нажмите  пробел чтобы играть с клавиатуры", 140, 60);
	ctx.fillText("your score record:", 325, 300);
    ctx.fillText("Или нажмите на экран чтобы играть мышкой", 20, 575);
	ctx.closePath();
}
  
function draw(){
	if(!MOUSEDOWN){
		StartMenu();
	}
	else{
		ctx.clearRect(0,0,canvas.width,canvas.height);
	}
}



function person(){
	ctx.beginPath();
	ctx.fillStyle = "green";
    ctx.fillRect(x, y, 100, 100);
	ctx.closePath();
}
if(start==1)
    function draw(){
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
        person();
    }

setInterval(draw, 10);
