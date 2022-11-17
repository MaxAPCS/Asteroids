import java.util.Set;
import java.util.HashSet;
import java.util.List;

public static Set<Asteroid> asteroids = new HashSet<Asteroid>();
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
  for (Asteroid a : asteroids) a.draw();
  for (Bullet b : new HashSet<Bullet>(bullets)) b.draw();
  spaceship.draw();
  
  List<SpaceObject> collidables = new ArrayList<SpaceObject>();
  collidables.add(spaceship);
  collidables.addAll(bullets);
  collidables.addAll(asteroids);
  for (int a = 0; a < collidables.size()-1; a++) {
    for (int b = a+1; b < collidables.size(); b++) {
      collidables.get(a).checkCollision(collidables.get(b));
    }
  }
}
public void keyPressed() {
  spaceship.onKeyPressed(key);
  if (key == 'x') asteroids.add(new Asteroid());
}
