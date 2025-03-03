public final Spaceship spaceship = new Spaceship();
class Spaceship extends SpaceObject {
    private float acceleration;
    private long invincibility = 0;
    private long lastTime = -1;

    private Spaceship() {
      super(new float[]{width/2f, height/2f});
      this.acceleration = 0;
      this.invincibility = millis() + 1000;
    }
    
    protected void update() {
      long cTime = millis();
      float dt = lastTime > 0 ? (cTime-lastTime)/1000f : 0;
      this.lastTime = cTime;
      
      if (super.fixPos()) {this.acceleration = 0; super.vel = (float)Math.pow(super.vel, 0.9);}
      if (keyPressed) this.onKey(key, dt);
      
      super.vel += this.acceleration * dt;
      super.update(dt);
    }
    
    public void draw() {
      this.update();
      long ti = this.invincibility-millis();
      if (ti > 0 && ti/75f % 2 < 1) return;
      pushMatrix();
      translate(super.loc[0], super.loc[1]);
      rotate((float)super.dir-HALF_PI);
      line(-10, -5, 0, 20);
      line(0, 20, 10, -5);
      line(10, -5, 0, 0);
      line(0, 0, -10, -5);
      popMatrix();
    }
    
    protected float getRadius() {return this.invincibility-millis()>0?0:4;}
    
    public void collide(float[] momentum) { // placeholder for death
      super.angVel = 69;
      super.vel = 0;
      this.acceleration = 0;
    }
    
    private void fire() {
      bullets.add(new Bullet(this.getLoc(), this.getDir(), this.getVel()+600));
    }
    
    public void hyperspeed() {
        super.loc = new float[]{(float)Math.random()*displayWidth, (float)Math.random()*displayHeight};
        super.vel = 0;
        this.angVel = 0;
        this.acceleration = 0;
        this.invincibility = millis() + 1000;
    }
    
    private void onKey(char c, float dt) {
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
    
    public void onKeyPressed(char c) {
      if (c == ' ') this.fire();
    }
}
