public class Bullet extends SpaceObject {
  private long lastTime = -1;
  private long deathTime;

  public Bullet(float[] loc, double dir, float vel) {
    super(loc, dir, vel, 1);
    this.deathTime = millis()+2*1000;
  }
  
  private void update() {
    long cTime = millis();
    float dt = lastTime > 0 ? (cTime-lastTime)/1000f : 0;
    this.lastTime = cTime;
    super.fixPos();
    if (millis() >= this.deathTime) bullets.remove(this);
    super.update(dt);
  }
  
  public void draw() {
    this.update();

    pushMatrix();
    translate(super.loc[0], super.loc[1]);
    rotate((float)super.dir);
    rect(-2, -2, 2, 2);
    popMatrix();
  }
  
  protected float getRadius() {return (float)(2*Math.sqrt(2));}
  
  public void collide(float[] momentum) {
    bullets.remove(this);
  }
}
