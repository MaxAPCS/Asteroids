import { Spaceship } from "./src/spaceship.js"

let spaceship;
export const dqueue = new Set();
const asteroids = new Set();
const bullets = new Set();
function setup() {
  let div = document.getElementById('sketch-holder');
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  strokeWeight(4);
  strokeCap(ROUND);
  stroke(0xffffffff);
  noFill();
  textAlign(LEFT, TOP);

  spaceship = new Spaceship(width/2, height/2);
}
function draw() {
  background(0);
  for (let d of dqueue) {
    if (d instanceof Asteroid) {asteroids.remove(d); continue}
    if (d instanceof Bullet) {bullets.remove(d); continue}
  }
  dqueue.clear();

  for (let a of asteroids) a.draw();
  for (let b of bullets) b.draw();
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