class Spaceship extends SpaceObject {
    public static final instance = new Spaceship();
    private Spaceship() {
      super(new float[]{width/2f, height/2f});
      this.acceleration = this.angularMomentumThatIDontUnderstandYet = 0;
    }
    
    private float acceleration;
    
    private long lastTime = -1;
    protected void update() {
      long cTime = millis();
      float dt = lastTime > 0 ? (cTime-lastTime)/1000f : 0;
      this.lastTime = cTime;
      
      super.vel += this.acceleration * dt;
      super.update(dt);
    }
    
    public void draw() {
      this.update();
      pushMatrix();
      translate(super.pos[0], super.pos[1]);
      rotate(super.dir);
      beginShape(POINTS);
      vertex(-10, -5);
      vertex(0, 15);
      vertex(10, -5);
      vertex(0, 0);
      endShape(CLOSE);
      popMatrix();
    }
}
