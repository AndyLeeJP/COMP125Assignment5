"use strict";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;

document.body.appendChild(canvas);
    var canLeft = canvas.offsetLeft;
    var canTop = canvas.offsetTop;
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
    bgReady = true;
};

bgImage.src = "1139034.jpg";
var bugReady = false;
var bugImage = new Image();
var bug = {};
var score = 0;

bugImage.onload = function() {
    bugReady = true;
};

bugImage.src = "125assignment5bug.jpg";
var speed = 2000;
var newSpeed = speed;
var speedUpRate = 1.1;

var reset = function() {
    bug.x = 55 + (Math.random() * (canvas.width - 110));
    bug.y = 55 + (Math.random() * (canvas.height - 110));
};

function scoreReset() {
    newSpeed = speed;
    score = 0;
    reset();
    then = Date.now();
};

function speedReset() {
    newSpeed = speed;
    then = Date.now();
};

function catchBug(e) {
    var x = e.pageX - canLeft;
    var y = e.pageY - canTop;
    if (y > bug.y && y < bug.y + 600 && x > bug.x && x < 900) {
        score++;
        reset();
        newSpeed = newSpeed / speedUpRate;
        then = Date.now();
    }
}

var render = function() {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (bugReady) {
        ctx.drawImage(bugImage, bug.x, bug.y);
    }
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, 20, 20);
};

var main = function() {
    var now = Date.now();
    var delta = now - then;
    if (delta > newSpeed) {
        reset();
    }
    render();
    if (delta > newSpeed) {
        then = Date.now();
    }
    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
function createEventListeners() {
    addEventListener("mousedown", catchBug, false);
    document.getElementById("scoreReset").addEventListener("click", scoreReset, false);
    document.getElementById("speedReset").addEventListener("click", speedReset, false);
}

var then = Date.now();
reset();
main();
window.addEventListener("load", createEventListeners, false);





