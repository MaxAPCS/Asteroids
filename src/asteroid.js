const mult = 16; // impulse
export class Asteroid extends SpaceObject {
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
    this.update(dt);
  }
  
  draw() {
    this.update();
    
    pushMatrix();
    translate(this.loc[0], this.loc[1]);
    rotate(this.dir);
    let angle = TWO_PI / this.getMass();
    let radius = Math.round(this.getMass()*3);
    beginShape();
    for (float a = 0; a < TWO_PI; a += angle) vertex(Math.cos(a) * radius, Math.sin(a) * radius);
    endShape(CLOSE);
    popMatrix();
  }
  
  getRadius() {return millis()-this.birth > 1000 ? this.getMass()*3 : -1000;}
  
  collide(momentum) {
    asteroids.remove(this);
    if (this.getMass() < 3) return;
    momentum[0] += Math.cos(this.getDir()) * this.getVel() * this.getMass();
    momentum[1] += Math.sin(this.getDir()) * this.getVel() * this.getMass();
    let ratio = (Math.random()*0.5+0.5)*mult-(mult/2);
    let masses = [Math.floor(this.getMass()/2), Math.ceil(this.getMass()/2)];
    asteroids.add(new Asteroid(this.getLoc(), [(momentum[0] * ratio)/masses[0], (momentum[1] * ratio)/masses[0]], masses[0]));
    asteroids.add(new Asteroid(this.getLoc(), [(momentum[0] * (-ratio))/masses[1], (momentum[1] * (-ratio))/masses[1]], masses[1]));
  }
}