import { Spaceship } from "/src/spaceship.js"

const spaceship = new Spaceship();
const asteroids = new Set();
const bullets = new Set();
function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(4);
  strokeCap(ROUND);
  stroke(0xffffffff);
  noFill();
  textAlign(LEFT, TOP);
}
function draw() {
  background(0);
  for (let a of asteroids) a.draw();
  for (let b of new Set(bullets)) b.draw();
  spaceship.draw();
  
  let collidables = [spaceship, ...bullets, ...asteroids];
  for (let a = 0; a < collidables.length-1; a++) {
    for (let b = a+1; b < collidables.length; b++) {
      collidables[a].checkCollision(collidables[b]);
    }
  }
}
function keyPressed() {
  if (!spaceship) return;
  spaceship.onKeyPressed(key);
  switch (key) {
    case 'x':
      asteroids.add(new Asteroid());
      break;
    case 'v':
      spaceship.hyperspace();
      break;
  }
}