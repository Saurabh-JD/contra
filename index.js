// get canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set canvas dimensions
const WIDTH = 800;
const HEIGHT = 500;
canvas.width = WIDTH;
canvas.height = HEIGHT;
// get Images
const player_image = document.getElementById("player")
const intro_image = document.getElementById("intro")

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


//intro
class Player{
    constructor(img){
        this.img = img;
        this.x = 143;
	this.y =  15;
	this.width = 27;
	this.height = 38;
        this.dwidth = 47;
        this.dheight = 58;
        this.dx = 50;
	this.dy = 50;
	this.x_limit = 170;
	this.x_animation_value = 27;
	this.x_default = 143;
     };
    update(){
       if(this.x >= this.x_limit){
		this.x = this.x_default;
	}else{
		this.x += this.x_animation_value;
       }
       if(initial_state == "right"){}
    };
    contoller(){
	    if(right_key_pressed){
		    this.x_limit = 215;
		    this.y = 132; 
		    this.width = 22;
		    this.dx += 13;
		    this.height = 38;
		    this.dwidth = 42;
		    this.dheight = 58;
		    this.x_animation_value = 23;

	    }else{
		    this.x_limit = 170;
		    this.y = 15;
		    this.width = 27;
		    this.height = 38;
		    this.dwidth = 47;
		    this.dheight = 58;
		    this.x_default = 143;
		    this.x_animation_value = 27;
	    } 
    };
    draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height, this.dx, this.dy, this.dwidth, this.dheight)
    };
};

let player  = new Player(player_image);

//touch event for mobile
dPadUp.addEventListener('touchstart', () => {
	up_key_pressed = true;
  // Handle touchstart event for up button
});

dPadLeft.addEventListener('touchstart', () => {
	left_key_pressed = true;
	initial_state = "left";
  // Handle touchstart event for left button
});

dPadDown.addEventListener('touchstart', () => {
	down_key_pressed = true;
  // Handle touchstart event for down button
});

dPadRight.addEventListener('touchstart', () => {
	right_key_pressed = true;
	initial_state = "right";
  // Handle touchstart event for right button
});
dPadUp.addEventListener('touchend', () => {
	up_key_pressed = false;
  // Handle touchend event for up button
});

dPadLeft.addEventListener('touchend', () => {
	left_key_pressed = false;
  // Handle touchend event for left button
});

dPadDown.addEventListener('touchend', () => {
	down_key_pressed = false;
  // Handle touchend event for down button
});

dPadRight.addEventListener('touchend', () => {
	right_key_pressed = false;
  // Handle touchend event for right button
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
		initial_state = "left";
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
            break;
        case "ArrowLeft":
            left_key_pressed = false;
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
    player.draw();
    player.contoller();
    player.update();
    console.log(left_key_pressed)
};
setInterval(main, 100);
