abstract class SpaceObject {   
  private float[] loc;
  private float vel;
  private double dir;
  protected double angularMomentumThatIDontUnderstandYet;

  protected SpaceObject(float[] loc) {
    this.loc = loc;
    this.dir = 0;
    this.vel = 0;
    this.angularMomentumThatIDontUnderstandYet = 0;
  }
  protected SpaceObject(float[] loc, double dir, float vel) {
    this.loc = loc;
    this.dir = dir;
    this.vel = vel;
    this.angularMomentumThatIDontUnderstandYet = 0;
  }

  protected void update(float dt) {
    this.vel = Math.max(0, this.vel);
    double mult = this.vel * dt;
    this.dir += this.angularMomentumThatIDontUnderstandYet * dt;
    this.loc[0] += Math.cos(dir) * mult;
    this.loc[1] += Math.sin(dir) * mult;
  }
  
  protected void fixPos() {
    if (this.loc[0] > displayWidth) this.loc[0] = 0;
    else if (this.loc[0] < 0) this.loc[0] = displayWidth;
    if (this.loc[1] > displayHeight) this.loc[1] = 0;
    else if (this.loc[1] < 0) this.loc[1] = displayHeight;
  }
  
  abstract void draw();
  
  protected float[] getLoc() {return this.loc.clone();}
  protected float getVel() {return this.vel;}
  protected double getDir() {return this.dir;}

}
