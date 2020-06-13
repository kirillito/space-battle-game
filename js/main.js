let canvas;
let canvasContext;

const FPS = 30;
const ENEMY_NUMBER = 5;

let player = new Player("Player");
let enemies = [];

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  document.getElementById("playerName").innerHTML = player.name;
  document.getElementById("playerNameControls").innerHTML = player.name;

  this.initInput();
  this.loadImages();

  canvas.addEventListener('mousedown', handleMouseClick);
}

function handleMouseClick(e) {
  player.reset();
}

function launchIfReady() {
  if (imagesToLoad === 0) {
    startGame();
  }
}

function startGame() {
  setInterval(function() {
    animate();
    draw();
  }, 1000/FPS);

  player.init(playerPic);

  for (let i=0; i<ENEMY_NUMBER; i++) {
    let e = new Enemy();
    e.init(enemyPic);
    enemies.push(e);
  }
}

function animate() {
  player.move();
  enemies.forEach(e => {
    e.move();
    player.checkCollisions(e);
  });
}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');
  drawImageCenteredAtLocationWithRotation(bgPic, canvas.width/2, canvas.height/2, 0);
  // if(winner !== null) {
  //   canvasContext.fillStyle = 'white';

  //   canvasContext.fillText(winner.name + " won! Congratulations", 350, 200);

  //   canvasContext.fillText("click to continue", 360, 500);
  //   return;
  // } 

  // player
  player.draw();

  // enemies
  enemies.forEach(e => e.draw());

  // canvasContext.fillStyle = 'white';
  // canvasContext.fillText("Score: " + playerScore, canvas.width - 100, 10)
  document.getElementById("playerScoreLabel").innerHTML = player.score;
}