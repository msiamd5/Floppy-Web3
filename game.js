const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let birdY = 200;
let velocity = 0;
let gravity = 0.5;
let pipes = [];
let score = 0;
let gameRunning = false;

document.getElementById("startBtn").onclick = () => {
  resetGame();
  gameRunning = true;
  gameLoop();
};

document.addEventListener("keydown", () => {
  velocity = -8;
});

function resetGame() {
  birdY = 200;
  velocity = 0;
  pipes = [];
  score = 0;
}

function spawnPipe() {
  const gap = 120;
  const top = Math.random() * 300;

  pipes.push({
    x: canvas.width,
    top,
    bottom: top + gap
  });
}

function update() {
  velocity += gravity;
  birdY += velocity;

  if (Math.random() < 0.02) spawnPipe();

  pipes.forEach(p => p.x -= 2);

  pipes = pipes.filter(p => p.x > -50);

  // Collision
  pipes.forEach(p => {
    if (50 > p.x && 50 < p.x + 50) {
      if (birdY < p.top || birdY > p.bottom) {
        gameRunning = false;
        alert("Game Over! Score: " + score);
      }
    }
  });

  score++;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bird
  ctx.fillStyle = "yellow";
  ctx.fillRect(50, birdY, 20, 20);

  // Pipes
  ctx.fillStyle = "green";
  pipes.forEach(p => {
    ctx.fillRect(p.x, 0, 50, p.top);
    ctx.fillRect(p.x, p.bottom, 50, canvas.height);
  });

  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 20);
}

function gameLoop() {
  if (!gameRunning) return;

  update();
  draw();

  requestAnimationFrame(gameLoop);
}
