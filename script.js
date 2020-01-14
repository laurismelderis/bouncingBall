const canvas = document.getElementById('ball-platform');
const createBtn = document.getElementById('createAnimation');
const W = canvas.width;
const H = canvas.height;
const ctx = canvas.getContext('2d');
const gravity = 0.15;
const friction = 0.9;
let balls = [];

function FillCircle(x0, y0, bRadius, theColor){
	let circle = {x: x0, y: y0, color: theColor};
	let xVel = 5, yVel = 1;
	this.movement = () => {
		if (Math.round(circle.x + bRadius + xVel) > W || Math.round(circle.x- bRadius + xVel) < 0){
			xVel = -xVel*friction;
			yVel *= friction;
		} else if (Math.round(circle.y+bRadius + yVel) > H){
			yVel = -yVel*friction;
			xVel *= friction;
		} else {
			yVel += gravity;
		}
		circle.x += xVel;
		circle.y += yVel;
	}
	this.draw = () => {
		ctx.beginPath();
		ctx.fillStyle = circle.color;
		ctx.arc(circle.x, circle.y, bRadius, bRadius, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}

createBtn.addEventListener('mousedown', () => {
	balls = [];
    let bRadius = Number(document.getElementById('bRadius').value);
	let count = Number(document.getElementById('count').value);
	if (bRadius == "" || bRadius <= 0){
		bRadius = 5;
	}
	if (count == "" || count < 0){
		count = 5;
	}
	initialize(count, bRadius);
});


function initialize(count, bRadius){
	for (let i = 0; i < count; i++){
		let xpos = (Math.random()*(W - bRadius - 10))+bRadius;
		let ypos = (Math.random()*(H - bRadius - 10))+bRadius;
		balls.push(new FillCircle(xpos, ypos, bRadius, 'red'));		
	}
}

function animation(){
	requestAnimationFrame(animation);
	ctx.clearRect(0, 0, W, H);
	for (let a = 0; a < balls.length; a++){
		let circle = balls[a];
		circle.movement();
		circle.draw();
	}
}
animation();
