public final Spaceship spaceship = new Spaceship();
class Spaceship extends SpaceObject {
    private float acceleration;
    private long lastTime = -1;

    private Spaceship() {
      super(new float[]{1000, 500});
      this.acceleration = 0;
    }
    
    protected void update() {
      long cTime = millis();
      float dt = lastTime > 0 ? (cTime-lastTime)/1000f : 0;
      this.lastTime = cTime;
      
      super.fixPos();
      if (keyPressed) this.onKey(key, dt);
      
      super.vel += this.acceleration * dt;
      super.update(dt);
    }
    
    public void draw() {
      this.update();
      pushMatrix();
      translate(super.loc[0], super.loc[1]);
      rotate((float)super.dir-HALF_PI);
      line(-10, -5, 0, 20);
      line(0, 20, 10, -5);
      line(10, -5, 0, 0);
      line(0, 0, -10, -5);
      popMatrix();
    }
    
    private void fire() {
      bullets.add(new Bullet(this.getLoc(), this.getDir(), this.getVel()+600));
    }
    
    private void onKey(char c, float dt) {
      switch (c) {
        case 'w':
          this.acceleration+=dt*2;
          break;
        case 's':
          this.acceleration-=dt;
          break;
        case 'a':
          super.angularMomentumThatIDontUnderstandYet -= dt/4f;
          break;
        case 'd':
          super.angularMomentumThatIDontUnderstandYet += dt/4f;
          break;
      }
    }
    
    public void onKeyPressed(char c) {
      if (c == ' ') this.fire();
    }
}
