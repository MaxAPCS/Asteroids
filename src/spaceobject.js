const c = 10000; // lightspeed
export class SpaceObject {
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
  
  getLoc() {return this.loc.clone();}
  getVel() {return this.vel;}
  getDir() {return this.dir;}
  getMass() {return this.mass;}
  getRadius() {throw new Error("Radius method not implemented.")}; // for collisions
}