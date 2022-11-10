public class Bullet extends SpaceObject {
  private long lastTime = -1;
  private long deathTime;

  public Bullet(float[] loc, double dir, float vel) {
    super(loc, dir, vel);
    this.deathTime = millis()+
  }
  
  public void draw() {
    long cTime = millis();
    float dt = lastTime > 0 ? (cTime-lastTime)/1000f : 0;
    this.lastTime = cTime;
    super.fixPos();
    super.update(dt); // collisions later

    pushMatrix();
    translate(super.loc[0], super.loc[1]);
    rotate((float)super.dir);
    rect(-6, -2, 6, 2);
    popMatrix();
  }
}
