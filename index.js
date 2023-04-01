// get canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set canvas dimensions
const WIDTH = 800;
const HEIGHT = 500;
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
//touch
const dPadUp = document.querySelector('.d-pad-up');
const dPadLeft = document.querySelector('.d-pad-left');
const dPadDown = document.querySelector('.d-pad-down');
const dPadRight = document.querySelector('.d-pad-right');



//initial state

let initial_state = "right";


//player class
class Player{
    constructor(img){
        this.img = img;
        this.x = 0;
	this.y =  10;
	this.width = 27;
	this.height = 38;
        this.dwidth = 47;
        this.dheight = 58;
        this.dx = 80;
	this.dy = 180;
	this.x_limit = 27;
	this.x_animation_value = 27;
	this.x_default = 27;
	this.dx_increse = 13;
     };
    update(){
       if(this.x >= this.x_limit){
		this.x = this.x_default;
       }
       else if(initial_state == "left"){
	       this.y = 175;
	       this.x_animation_value = 27;
		this.x += this.x_animation_value;
	}

       else{
	       this.x += this.x_animation_value;
       		    }
    };
    contoller(){
	    if(right_key_pressed && up_key_pressed){

		    this.x_limit = 50;

		    this.y = 48; 
		    this.width = 24;
		    if(this.dx < 400){this.dx += this.dx_increse};
		    this.height = 38;
		    this.dwidth = 44;
		    this.dheight = 58;
		    this.x_animation_value = 25;

	    }else if(right_key_pressed){
		    this.x_limit = 91;
		    this.y = 126; 
		    this.width = 22;
		    this.dx_increse = 13
		    if(this.dx < 400){this.dx += this.dx_increse}
		    this.height = 38;
		    this.dwidth = 42;
		    this.dheight = 58;
		    this.x_animation_value = 23;

	    }else if(left_key_pressed){
		    this.x_limit = 91;
		    this.y = 293; 
		    this.width = 22;
		    if(this.dx +this.width <= 0){this.dx_increse = 0};
		    this.dx -= this.dx_increse
		    this.height = 38;
		    this.dwidth = 42;
		    this.dheight = 58;
		    this.x_animation_value = 23;
	    }else{
		    this.x_limit = 27;
		    if(initial_state == "left"){this.y = 175;}else{this.y = 10};
		    this.width = 27;
		    this.height = 38;
		    this.dwidth = 47;
		    this.dheight = 58;
		    this.x_default = 0;
		    this.x_animation_value = 27;
	    }
	    console.log(this.dx)
    };
    draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height, this.dx, this.dy, this.dwidth, this.dheight)
    };
};

let player  = new Player(player_image);

//background class
class Background{
	constructor(img){
		this.img = img;
		this.x = 0;
		this.y =  0;
		this.width = 291;
		this.height = 225;
		this.dwidth = 800;
		this.dheight = 500;
		this.dx = 0;
		this.dy = 0;
		this.x_limit = 170;
		this.x_animation_value = 27;
		this.x_default = 143;
	};
	update(player){
		if(right_key_pressed && player.dx > WIDTH/2){
			this.x += 5;
		}
	};
	draw(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height, this.dx, this.dy, this.dwidth, this.dheight)
	};
}
let background  = new Background(background_image);

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
	default:
		break;
    }
})


//main animation
function main(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    player.draw();
    player.contoller();
    player.update();
    background.update(player);
    
};
setInterval(main, 100);
