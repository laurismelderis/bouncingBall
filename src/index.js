import Ball from './ball.js';

const canvas = document.getElementById('ball-platform');
const createBtn = document.getElementById('createAnimation');
const clrCanvas = document.getElementById('clearCanvas');
const W = canvas.width;
const H = canvas.height;
const ctx = canvas.getContext('2d');

let ballz = [];

createBtn.addEventListener('mousedown', () => {
	ballz = [];
    let bRadius = Number(document.getElementById('bRadius').value);
	let count = Number(document.getElementById('count').value);
	if (bRadius == "" || bRadius <= 0){
		bRadius = 15;
	}
	if (count == "" || count < 0){
		count = 5;
	}
	for (let i = 0; i < count; i++){
		ballz.push(new Ball(randomNumber(bRadius+5, W-bRadius-5),
							randomNumber(bRadius+5, H-bRadius-5),
							randomNumber(-5, 5),
							randomNumber(-5, 5),
							W, H, bRadius,));
	}
});

canvas.addEventListener('mousedown', (evt) => {
	let xpos = evt.offsetX;
	let ypos = evt.offsetY;
	let bRadius = Number(document.getElementById('bRadius').value);
	let count = Number(document.getElementById('count').value);
	if (bRadius == "" || bRadius < 0){
		bRadius = 15;
	}
	if (count == "" || count < 0){
		count = 1;
	}
	if (xpos < bRadius) {
		xpos += bRadius;
	} else if(xpos > W - bRadius){
		xpos -= bRadius;
	}
	if(ypos < bRadius){
		ypos += bRadius;
	} else if(ypos > H - bRadius){
		ypos -= bRadius;
	}
	for (let i = 0; i < count; i++){
		ballz.push(new Ball(xpos,
							ypos,
							randomNumber(-5, 5),
							randomNumber(-5, 5),
							W, H, bRadius,));
	}
});
clrCanvas.onclick = () => {
	ballz = [];
}

function animation(){
	requestAnimationFrame(animation);
	ctx.clearRect(0, 0, W, H);
	for (let i = 0; i < ballz.length; i++){
		let ball = ballz[i];
		ball.draw(ctx);
		ball.movement();
	}
}
animation();

function randomNumber(minValue, maxValue){
	return Math.floor(Math.random()*(maxValue-minValue+1))+minValue;
}

