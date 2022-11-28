public class Bullet extends SpaceObject {
  private long lastTime = -1;
  private long deathTime;

  public Bullet(float[] loc, double dir, float vel) {
    super(loc, dir, vel, 0.03f);
    this.deathTime = millis()+2000;
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
    ellipse(this.getLoc()[0], this.getLoc()[1], 2.5, 2.5);
  }
  
  protected float getRadius() {return this.deathTime-millis() < 1900 ? 2.5 : -100;}
  
  public void collide(float[] momentum) {
    bullets.remove(this);
  }
}
