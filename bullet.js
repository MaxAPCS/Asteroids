export class Bullet extends SpaceObject {
  constructor(loc, dir, vel) {
    super(loc, dir, vel, 0.5);
    this.deathTime = millis()+2000;
    this.lastTime = -1
  }
  
  update() {
    long cTime = millis();
    float dt = lastTime > 0 ? (cTime-lastTime)/1000 : 0;
    this.lastTime = cTime;
    super.fixPos();
    if (millis() >= this.deathTime) bullets.remove(this);
    super.update(dt);
  }
  
  draw() {
    this.update();
    ellipse(this.getLoc()[0], this.getLoc()[1], 2.5, 2.5);
  }
  
  getRadius() {return this.deathTime-millis() < 1900 ? 2.5 : -100;}
  
  collide(momentum) {
    bullets.remove(this);
  }
}