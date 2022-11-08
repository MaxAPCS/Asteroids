abstract class SpaceObject {   
  private float[] loc;
  private float vel;
  private double dir;
  private double angularMomentumThatIDontUnderstandYet;

  
  protected SpaceObject(float[] loc) {
    this.loc = loc;
    this.dir = 0;
    this.vel = 0;
  }
  
  protected void accelerate(float m) {
    vel += m;
  }
  
  protected void turn() {
  
  }
  
  protected void update(float dt) {
    double mult = this.vel * dt;
    this.dir += this.angularMomentumThatIDontUnderstandYet * dt;
    this.loc[0] += Math.cos(dir) * mult;
    this.loc[1] += Math.sin(dir) * mult;
  }
  
  abstract void draw();
} 
