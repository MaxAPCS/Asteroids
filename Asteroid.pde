class Asteroid extends SpaceObject {
  private long lastTime = -1;
  private long birth;
  
  public Asteroid() {
    super(new float[]{(float)Math.random()*displayWidth, (float)Math.random()*displayHeight}, Math.random()*TWO_PI, (float)Math.random()*3+2, (int)Math.round(Math.random()*5+5));
    this.angVel = Math.random()*0.2-0.1;
    this.birth = millis();
  }
  
  private Asteroid(float[] loc, double[] components, int mass) {
    super(loc, Math.atan(components[1]/components[0]) * (components[0]<0 && components[1]<0 ? -1 : 1), (float)Math.sqrt(components[0]*components[0]+components[1]*components[1]), mass);
    this.angVel = 0; // yeah not touching that
    this.birth = millis();
  }
  
  private void update() {
    long cTime = millis();
    float dt = lastTime > 0 ? (cTime-lastTime)/1000f : 0;
    this.lastTime = cTime;
    super.fixPos();
    super.update(dt);
  }
  
  public void draw() {
    this.update();
    
    pushMatrix();
    translate(super.loc[0], super.loc[1]);
    rotate((float)super.dir);
    float angle = TWO_PI / this.getMass();
    int radius = this.getMass()*3;
    beginShape();
    for (float a = 0; a < TWO_PI; a += angle) vertex((float)(Math.cos(a) * radius), (float)(Math.sin(a) * radius));
    endShape(CLOSE);
    popMatrix();
  }
  
  protected float getRadius() {return millis()-this.birth > 1000 ? this.getMass()*3 : -1000;}
  
  public void collide(float[] momentum) {
    asteroids.remove(this);
    if (this.getMass() < 3) return;
    momentum[0] += Math.cos(super.dir) * super.vel * this.getMass();
    momentum[1] += Math.sin(super.dir) * super.vel * this.getMass();
    double[] ratio = new double[]{Math.random()*2-1, Math.random()*2-1};
    int[] masses = new int[]{this.getMass()/2, (int)Math.ceil(this.getMass()/2f)};
    asteroids.add(new Asteroid(super.loc, new double[]{(momentum[0] * ratio[0])/masses[0], (momentum[1] * ratio[1])/masses[0]}, masses[0]));
    asteroids.add(new Asteroid(super.loc, new double[]{(momentum[0] * (1 - ratio[0]))/masses[1], (momentum[1] * (1 - ratio[1]))/masses[1]}, masses[1]));
  }
}
