///////////////////////////
//GLOBAL VARIABLES
///////////////////////////
var width = 1000;
var height = 650;
var speed = 20;
var number = 20;
var maxNumber = 20;
var wind = 0;
var size = 80;
var allFlakes = [];
var ground = [];
var frame = 0;
var sky = { r: 150, g: 205, b: 255 };
var day = true;
var pause = false;
var clickStart = 0;

Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
};

////////////////////////
// CANVAS SETUP
///////////////////////
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var b_canvas = document.createElement('canvas');
b_canvas.width = width;
b_canvas.height = height;
var b_ctx = b_canvas.getContext('2d');

var g_canvas = document.createElement('canvas');
g_canvas.width = width;
g_canvas.height = height;
var g_ctx = g_canvas.getContext('2d');

var f_canvas = document.createElement('canvas');
f_canvas.width = width;
f_canvas.height = height;
var f_ctx = f_canvas.getContext('2d');

var img = new Image();
// img.src = 'http://easymemecreator.com/popular/Crazy_Cat.gif';


//////////////
//CONTROLS
//////////////
function toggle(button) {
    if (button.value == "Stop") {
        console.log(button.value);
        button.value = "Start";
        pause = true;
    } else {
        button.value = "Stop";
        pause = false;
        animate();
    }
}

function changeSpeed(newSpeed) {
    speed = newSpeed;
}

function changeNumber(newNumber) {
    number = newNumber;
    flakes = allFlakes.slice(0, newNumber);
}

function changeSize(newSize) {
    size = newSize;
    allFlakes.map(flake => flake.size = Math.random() * size);
}

////////////////////
//MAKE FUNCTIONS
////////////////////
function makeFlake() {
    var x = Math.random() * width;
    var y = Math.random() * height - height;
    var flakeSize = Math.random() * size + 10;
    var speed = Math.random() * 5 + 2;
    var r = parseInt(Math.random() * 255);
    var g = parseInt(Math.random() * 255);
    var b = parseInt(Math.random() * 255);
    const text = Math.random() <.1 ? "Chaneru" : "Roku";
    return {
        x: x,
        y: y,
        size: flakeSize,
        speed: speed,
        r: r,
        g: g,
        b: b,
        text
    };
}


//////////////////////////////
// DRAW FUNCTIONS
//////////////////////////////

function addSpeed(f) {
    const fspeed = f.size / 100;
    f.y = f.y + fspeed;
    // f.y++;
}

function drawFlakes() {
    f_ctx.clearRect(0, 0, width, height);

    for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        addSpeed(f);
        // addWind(f);
        // addJitter(f);
        //console.log(f.x);

        // f_ctx.fillRect(f.x, f.y, f.size, f.size);
        // // f_ctx.fillStyle  = "rgb("+f.r+","+f.g+","+f.b+")";
        // f_ctx.fillStyle = "white";
        // f_ctx.fill();

        f_ctx.font = `${f.size}px Arial, sans-serif`;

        const alpha = f.size / 120 + .4;
        const chaneruRed = f.text == 'Chaneru' ? 170 : 142
        f_ctx.fillStyle = `rgba(${chaneruRed},86,185,${alpha})`;
        f_ctx.textAlign = "center";
        
        f_ctx.fillText(f.text, f.x, f.y);
        // ctx.drawImage(img, f.x, f.y, f.size*10, f.size*10);

        if (f.y >= height) {
            f.y = 0;
            f.x = Math.random() * width;
            f.size = Math.random() * size + 10;
            f.text = Math.random() <.1 ? "Chaneru" : "Roku";
        }
    }
    ctx.drawImage(f_canvas, 0, 0);
}

function animate() {
    if (pause) return;
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // drawSky();
    // drawGround();
    // drawTrees();
    drawFlakes();

    setTimeout(animate, 1);
}

//////////////////////////////
// START
//////////////////////////////
function main() {

    //make all the flakes
    for (var i = 0; i < maxNumber; i++) {
        allFlakes.push(makeFlake());
    }
    flakes = allFlakes.slice(0, number);

    // call the animate function manually for the first time
    animate();
}

//img.onload = function() {
main();
//};


