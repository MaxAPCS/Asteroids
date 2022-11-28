abstract class SpaceObject {   
  private float[] loc;
  private float vel;
  private double dir;
  protected double angVel;
  private float mass;

  protected SpaceObject(float[] loc) {
    this.loc = loc;
    this.dir = 0;
    this.vel = 0;
    this.angVel = 0;
    this.mass = 5;
  }
  protected SpaceObject(float[] loc, double dir, float vel, float mass) {
    this.loc = loc;
    this.dir = dir;
    this.vel = vel;
    this.angVel = 0;
    this.mass = mass;
  }

  protected void update(float dt) {
    this.vel = Math.max(0, this.vel);
    double mult = this.vel * dt;
    this.dir += this.angVel * dt;
    this.loc[0] += Math.cos(dir) * mult;
    this.loc[1] += Math.sin(dir) * mult;
  }
  
  protected boolean fixPos() {
    boolean dirty = false;
    if (this.loc[0] > displayWidth) {this.loc[0] = 0; dirty = true;}
    else if (this.loc[0] < 0) {this.loc[0] = displayWidth; dirty = true;}
    if (this.loc[1] > displayHeight) {this.loc[1] = 0; dirty = true;}
    else if (this.loc[1] < 0) {this.loc[1] = displayHeight; dirty = true;}
    return dirty;
  }
  
  abstract void draw();
  
  public boolean checkCollision(SpaceObject a) {
    if (dist(this.loc[0], this.loc[1], a.loc[0], a.loc[1]) > this.getRadius() + a.getRadius()) return false;
    this.collide(a.getMomentum());
    a.collide(this.getMomentum());
    return true;
  }
  protected abstract void collide(float[] momentum);
  
  protected float[] getLoc() {return this.loc.clone();}
  protected float getVel() {return this.vel;}
  protected double getDir() {return this.dir;}
  protected float getMass() {return this.mass;}
  public float[] getMomentum() {return new float[]{(float)Math.cos(this.dir) * this.mass * this.vel, (float)Math.sin(this.dir) * this.mass * this.vel};};
  protected abstract float getRadius(); // for collisions
}
