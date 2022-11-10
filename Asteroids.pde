import java.util.Set;
import java.util.HashSet;

//public static Set<Asteroid> asteroids = new HashSet<Asteroid>();
public static Set<Bullet> bullets = new HashSet<Bullet>();
public void setup() {
  fullScreen();
  strokeWeight(4);
  strokeCap(ROUND);
  stroke(0xffffffff);
  noFill();
  textAlign(LEFT, TOP);
}
public void draw() {
  background(0);
  //for (Asteroid a : asteroids) a.draw();
  for (Bullet b : bullets) b.draw();
  spaceship.draw();
}
public void keyPressed() {
  spaceship.onKeyPressed(key);
}
