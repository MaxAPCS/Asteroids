import { SpaceObject } from "./spaceobject.js"
import { dqueue } from "../index.js"
export class Bullet extends SpaceObject {
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