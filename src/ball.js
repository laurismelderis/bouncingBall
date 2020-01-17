const gravity = 0.15;
const friction = 0.9;
export default class Ball{
	constructor(x, y, xVel, yVel, width, height, bRadius){
		this.x = x;
		this.y = y;
		this.xVel = xVel;
		this.yVel = yVel;
		this.W = width;
		this.H = height;
		this.radius = bRadius;
		this.color = 'red';
	}
	movement(){
		if (Math.round(this.x + this.radius + this.xVel) > this.W || Math.round(this.x - this.radius + this.xVel) < 0){
			this.xVel = -this.xVel*friction;
			this.yVel *= friction;
		} else if (Math.round(this.y + this.radius + this.yVel) > this.H || Math.round(this.y - this.radius + this.yVel) < 0){
			this.yVel = -this.yVel*friction;
			this.xVel *= friction;
		} else {
			this.yVel += gravity;
		}
		this.x += this.xVel;
		this.y += this.yVel;
	}
	draw(ctx){
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 2*Math.PI, false);
		ctx.fill();
		ctx.stroke();
		
	}
}