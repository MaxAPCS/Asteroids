export class Spaceship extends SpaceObject {
  constructor() {
    super([width/2, height/2]);
    this.acceleration = 0;
    this.invincibility = millis() + 1000;
  }
  
  update() {
    let cTime = millis();
    let dt = lastTime > 0 ? (cTime-lastTime)/1000 : 0;
    this.lastTime = cTime;
    
    if (this.fixPos()) {this.acceleration = 0; this.vel = Math.pow(this.vel, 0.9);}
    if (keyPressed) this.onKey(key, dt);
    
    this.vel += this.acceleration * dt;
    this.update(dt);
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
      super.loc = [Math.random()*displayWidth, Math.random()*displayHeight];
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
