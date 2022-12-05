const dqueue = new Set();
const asteroids = new Set();
const bullets = new Set();
let spaceship;
function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(4);
  strokeCap(ROUND);
  stroke(0xffffffff);
  noFill();
  textAlign(LEFT, TOP);

  spaceship = Spaceship.getSpaceship();
}
function draw() {
  background(0);
  for (let d of dqueue) {
    if (d instanceof Asteroid) {asteroids.delete(d); continue}
    if (d instanceof Bullet) {bullets.delete(d); continue}
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
const c = 6900; // lightspeed
class SpaceObject {
  constructor(loc, dir=0, vel=0, mass=5) {
    this.loc = loc;
    this.dir = 0;
    this.vel = 0;
    this.angVel = 0;
    this.mass = 5;
  }

  update(dt) {
    this.vel = Math.min(Math.max(0, this.vel), c);
    let mult = this.vel * dt;
    this.dir += this.angVel * dt;
    this.loc[0] += Math.cos(dir) * mult;
    this.loc[1] += Math.sin(dir) * mult;
  }
  
  fixPos() {
    let dirty = false;
    if (this.loc[0] > displayWidth) {this.loc[0] = 0; dirty = true;}
    else if (this.loc[0] < 0) {this.loc[0] = displayWidth; dirty = true;}
    if (this.loc[1] > displayHeight) {this.loc[1] = 0; dirty = true;}
    else if (this.loc[1] < 0) {this.loc[1] = displayHeight; dirty = true;}
    return dirty;
  }
  
  draw() {throw new Error("Draw method not implemented.")};
  
  getMomentum() {return [Math.cos(this.dir) * this.mass * this.vel, Math.sin(this.dir) * this.mass * this.vel]};
  checkCollision(a) {
    if (dist(this.loc[0], this.loc[1], a.loc[0], a.loc[1]) > this.getRadius() + a.getRadius()) return false;
    this.collide(a.getMomentum());
    a.collide(this.getMomentum());
    return true;
  }
  collide(momentum) {throw new Error("Collide method not implemented.")};
  
  getLoc() {return this.loc;}
  getVel() {return this.vel;}
  getDir() {return this.dir;}
  getMass() {return this.mass;}
  getRadius() {throw new Error("Radius method not implemented.")}; // for collisions
}
const mult = 16; // impulse
class Asteroid extends SpaceObject {
  constructor(loc = null, components = null, mass = null) {
    if (loc && components && mass) {
      super(loc, Math.atan(components[1]/components[0]) * (components[0]<0&&components[1]<0 ? -1 : 1), Math.sqrt(components[0]*components[0]+components[1]*components[1]), mass);
      this.angVel = 0; // yeah not touching that
    } else {
      super([Math.random()*displayWidth, Math.random()*displayHeight], Math.random()*TWO_PI, Math.random()*3+2, Math.round(Math.random()*5+5));
      this.angVel = Math.random()*0.2-0.1;
    }
    this.birth = millis();
    this.lastTime = -1
  }
  
  update() {
    let cTime = millis();
    let dt = lastTime > 0 ? (cTime-lastTime)/1000 : 0;
    this.lastTime = cTime;
    this.fixPos();
    super.update(dt);
  }
  
  draw() {
    this.update();
    
    pushMatrix();
    translate(this.loc[0], this.loc[1]);
    rotate(this.dir);
    let angle = TWO_PI / this.getMass();
    let radius = Math.round(this.getMass()*3);
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) vertex(Math.cos(a) * radius, Math.sin(a) * radius);
    endShape(CLOSE);
    popMatrix();
  }
  
  getRadius() {return millis()-this.birth > 1000 ? this.getMass()*3 : -1000;}
  
  collide(momentum) {
    dqueue.add(this);
    if (this.getMass() < 3) return;
    momentum[0] += Math.cos(this.getDir()) * this.getVel() * this.getMass();
    momentum[1] += Math.sin(this.getDir()) * this.getVel() * this.getMass();
    let ratio = (Math.random()*0.5+0.5)*mult-(mult/2);
    let masses = [Math.floor(this.getMass()/2), Math.ceil(this.getMass()/2)];
    asteroids.add(new Asteroid(this.getLoc(), [(momentum[0] * ratio)/masses[0], (momentum[1] * ratio)/masses[0]], masses[0]));
    asteroids.add(new Asteroid(this.getLoc(), [(momentum[0] * (-ratio))/masses[1], (momentum[1] * (-ratio))/masses[1]], masses[1]));
  }
}
class Bullet extends SpaceObject {
  constructor(loc, dir, vel) {
    super(loc, dir, vel, 0.5);
    this.deathTime = millis()+2000;
    this.lastTime = -1
  }
  
  update() {
    let cTime = millis();
    let dt = this.lastTime > 0 ? (cTime-this.lastTime)/1000 : 0;
    this.lastTime = cTime;
    super.fixPos();
    if (millis() >= this.deathTime) dqueue.add(this);
    super.update(dt);
  }
  
  draw() {
    this.update();
    ellipse(this.getLoc()[0], this.getLoc()[1], 2.5, 2.5);
  }
  
  getRadius() {return this.deathTime-millis() < 1900 ? 2.5 : -100;}
  
  collide(momentum) {
    dqueue.add(this);
  }
}
class Spaceship extends SpaceObject {
  static spaceship;
  static getSpaceship() {
    if (!Spaceship.spaceship) Spaceship.spaceship = new Spaceship(height/2, width/2);
    return Spaceship.spaceship;
  }

  constructor(x,y) {
    super([x,y]);
    this.acceleration = 0;
    this.invincibility = millis() + 1000;
  }
  
  update() {
    let cTime = millis();
    let dt = this.lastTime > 0 ? (cTime-this.lastTime)/1000 : 0;
    this.lastTime = cTime;
    
    if (this.fixPos()) {this.acceleration = 0; this.vel = Math.pow(this.vel, 0.9);}
    if (keyPressed) this.onKey(key, dt);
    
    this.vel += this.acceleration * dt;
    super.update(dt);
  }
  
  draw() {
    this.update();
    let ti = this.invincibility-millis();
    if (ti > 0 && ti/75 % 2 < 1) return;
    pushMatrix();
    translate(this.loc[0], this.loc[1]);
    rotate(this.dir-HALF_PI);
    line(-10, -5, 0, 20);
    line(0, 20, 10, -5);
    line(10, -5, 0, 0);
    line(0, 0, -10, -5);
    popMatrix();
  }
  
  getRadius() {return this.invincibility-millis()>0?0:4;}
  
  collide(momentum) { // placeholder for death
    this.angVel = 69;
    this.vel = 0;
    this.acceleration = 0;
  }
  
  fire() {
    bullets.add(new Bullet(this.getLoc(), this.getDir(), this.getVel()+600));
  }
  
  hyperspace() {
      super.loc = [Math.random()*width, Math.random()*height];
      super.vel = 0;
      this.angVel = 0;
      this.acceleration = 0;
      this.invincibility = millis() + 1000;
  }
  
  onKey(c, dt) {
    switch (c) {
      case 'w':
        this.acceleration+=dt*64;
        break;
      case 's':
        this.acceleration-=dt*52;
        super.angVel += super.angVel > 0 ? -dt : dt;
        break;
      case 'a':
        super.angVel -= dt*2;
        break;
      case 'd':
        super.angVel += dt*2;
        break;
    }
  }
  
  onKeyPressed(c) {
    if (c == ' ') this.fire();
  }
}
