// get canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set canvas dimensions
const WIDTH = 508;
const HEIGHT = 448;
canvas.width = WIDTH;
canvas.height = HEIGHT;
// get Images
const player_image = document.getElementById("player");
const intro_image = document.getElementById("intro");
const background_image = document.getElementById("background")

//keys pressed
let right_key_pressed = false;
let left_key_pressed = false;
let up_key_pressed = false;
let down_key_pressed = false;
let jump_key_pressed = false;
let player_in_air = false;
let player_jump_ani = false;
//touch
const dPadUp = document.querySelector('.d-pad-up');
const dPadLeft = document.querySelector('.d-pad-left');
const dPadDown = document.querySelector('.d-pad-down');
const dPadRight = document.querySelector('.d-pad-right');
const dPads = document.querySelector('.d-pad-s');
// background move
let backgroundMove = false;
let bulletFired = false;

//initial state
let initial_state = "right";


//player class
let gravity = 1;
class Player {
	constructor(img){
		this.img = img;
		this.x = 0;
		this.y =  10;
		this.width = 27;
		this.height = 36;
		this.dx = 10;
		this.dy = 10;
		this.dwidth = 50;
		this.dheight = 58;
		this.yvelocity = 0;
		this.xvelocity = 0;
		this.spriteIndex = 0; // The current frame index of the sprite animation
		this.animationSpeed = 5; // The speed at which the sprite animation plays
		this.animationFrames = 2;

	}
	animation(c, d, e, f, g){
		this.y = c;
		this.width = d;
		this.height = e;
		this.dwidth = f;
		this.dheight = g;
	};
	control(){
		if(right_key_pressed && up_key_pressed){
			player.animation(48, 24, 38, 44, 58);
			this.animationFrames = 3;
		}else if(player_in_air|right_key_pressed && player_in_air){
			player.animation(335, 22, 24, 42, 58);
			this.animationFrames = 4;
		}else if(down_key_pressed){
			player.animation(381, 35, 18, 42, 58);
			this.animationFrames = 1;
		}else if(left_key_pressed){
			player.animation(293, 22.5, 38, 43, 58);
			this.animationFrames = 5;
		}else if(right_key_pressed){
			player.animation(126, 22.5, 38, 43, 58);
			this.animationFrames = 5;
		}else{
			player.animation(10, 27, 38, 47, 58);
			this.animationFrames = 1;
		}
	};

	update(){
		this.dy += this.yvelocity;
		this.dx += this.xvelocity / 2;
		this.draw();
		if(this.yvelocity != 0){ player_in_air = true}else{ player_in_air = false};
		this.controller();

		if(this.dy + this.dheight + this.yvelocity <= canvas.height
		  ){
			this.yvelocity += gravity;
		}else {
			this.yvelocity = 0}
	};
	controller(){
		if(right_key_pressed && this.dx < WIDTH/2){
			this.xvelocity = 6;
		}else if(left_key_pressed){
			this.xvelocity = -6;
		}else{
			this.xvelocity = 0}
	};
	draw(){
		const spriteX = this.spriteIndex * this.width;
		ctx.fillStyle = "red"
				ctx.drawImage(this.img, spriteX, this.y, this.width, this.height, this.dx, this.dy, this.dwidth, this.dheight);

	}
}
let player  = new Player(player_image);

//background class
class Background{
	constructor(img){
		this.img = img;
		this.x = 0;
		this.y =  0;
		this.width = 254;
		this.height = 224;
		this.dwidth = 508;
		this.dheight = 448;
		this.dx = 0;
		this.dy = 0;
		this.x_limit = 170;
		this.x_animation_value = 27;
		this.x_default = 143;
	};
	update(player){
		if(right_key_pressed && player.dx >= WIDTH/2){
			this.x += 1;
			platfo.forEach( (platform)=>{
				platform.x -= 2;})
			
			backgroundMove = true;
		}else{backgroundMove = false;}
		
	};
	
	draw(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height, this.dx, this.dy, this.dwidth, this.dheight)
	};
}
let background  = new Background(background_image);
//making bullets and fired
let bullets = [];
class Bullet {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.radius = 3;
		this.speed = 5;
	}
	update() {
		this.x += this.speed;
	}
	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = "red";
		ctx.fill();
	}
}


//making platform
class Platform{
	constructor(x, y, w){
		this.x = x;
		this.y = y;
		this.width = w;
		this.dheight = 30;
	}
	draw(){
		//ctx.fillStyle = "blue";
		ctx.fillStyle = "#f0f8ff00";
		ctx.fillRect(this.x, this.y, this.width, this.dheight)
	}
}
let platfo = [new Platform(60, 222, 1470),new Platform(320,284, 190), new Platform(508,348, 64), new Platform(576,412,126), new Platform(702,350,64), new Platform(830,286,128)];



//touch event for mobile
dPadUp.addEventListener('touchstart', () => {
	up_key_pressed = true;
});

dPadLeft.addEventListener('touchstart', () => {
	left_key_pressed = true;
});

dPadDown.addEventListener('touchstart', () => {
	down_key_pressed = true;
});

dPadRight.addEventListener('touchstart', () => {
	right_key_pressed = true;
	initial_state = "right";
});
dPads.addEventListener('touchstart', () => {
	player_jump_ani = true;
	if(player.yvelocity === 0){player_in_air = false; player.yvelocity -= 13
	}
});


dPadUp.addEventListener('touchend', () => {
	up_key_pressed = false;
});

dPadLeft.addEventListener('touchend', () => {
	left_key_pressed = false;
	initial_state = "left";
});

dPadDown.addEventListener('touchend', () => {
	down_key_pressed = false;
});

dPadRight.addEventListener('touchend', () => {
	right_key_pressed = false;
	initial_state = "right";
});
dPads.addEventListener('touchend', () => {
	jump_key_pressed = false;
});

//keyboard events for pc
document.addEventListener("keydown", (e)=>{
	switch(e.key){
		case "ArrowRight":
			right_key_pressed = true;
			initial_state = "right";

			break;
		case "ArrowLeft":
			left_key_pressed = true;
			break;
		case "ArrowUp":
			up_key_pressed = true;
			break;
		case "ArrowDown":
			down_key_pressed = true;
			break;
		case "d":
			bulletFired = true;
			break;
		case "s":
			player_jump_ani = true;
			if(player.yvelocity === 0){player_in_air = false; player.yvelocity -= 13
			}
			break;
		default:
			break;
	}
})

    document.addEventListener("keyup", (e)=>{
	switch(e.key){
		case "ArrowRight":
			right_key_pressed = false;
			initial_state = "right";
			break;
		case "ArrowLeft":
			left_key_pressed = false;
			initial_state = "left";
			break;
		case "ArrowUp":
			up_key_pressed = false;
			break;
		case "ArrowDown":
			down_key_pressed = false;
			break;
		case "s":
			player_jump_ani = false;
			jump_key_pressed = false;
			break;
		default:
			break;
	}
})


//main animation
function animate(timestamp){
	window.requestAnimationFrame(animate);
	ctx.clearRect(0, 0, 600, 500);
	background.draw();
	player.update();
	if(player_in_air){
		animationSpeed = 2;
	}else{animationSpeed = 5;}

	player.control();
	platfo.forEach( (platform)=>{
		platform.draw();
							    
		if(player.dy + player.dheight <= platform.y  &&
		   player.dx + player.dwidth -25 >= platform.x &&
		   player.dy + player.dheight +  player.yvelocity >= platform.y &&
		   player.dx <= platform.x + platform.width ){
			player.yvelocity = 0;
		}
	})


			if (frameCount % player.animationSpeed === 0) {
				player.spriteIndex = (player.spriteIndex + 1) % player.animationFrames;

	}


	background.update(player);
	frameCount++;
	// Create a new bullet when the spacebar is pressed and add it to the bullets array
	if (bulletFired) {
		bullets.push(new Bullet(player.dx + player.dwidth, player.dy + player.dheight / 3));
		bulletFired = false;
	}

// Update and draw the bullets
	bullets.forEach((bullet, index) => {
		bullet.update();
		bullet.draw(ctx);

  // Remove bullets that are offscreen
		if (bullet.x > canvas.width) {
			bullets.splice(index, 1);
		}
	});




	console.log(bullets[0])
}
let frameCount = 0;
animate();
