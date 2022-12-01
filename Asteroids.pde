import java.util.Map;
import java.util.HashMap;
import java.util.List;

public static Map<Asteroid, Integer> asteroids = new HashMap<Asteroid, Integer>();
public static Map<Bullet, Integer> bullets = new HashMap<Bullet, Integer>();
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
  for (Asteroid a : asteroids.keySet()) a.draw();
  for (Bullet b : bullets.keySet()) b.draw();
  spaceship.draw();
  
  List<SpaceObject> collidables = new ArrayList<SpaceObject>();
  collidables.add(spaceship);
  collidables.addAll(bullets.keySet());
  collidables.addAll(asteroids.keySet());
  for (int a = 0; a < collidables.size()-1; a++) {
    for (int b = a+1; b < collidables.size(); b++) {
      collidables.get(a).checkCollision(collidables.get(b));
    }
  }
}
public void keyPressed() {
  spaceship.onKeyPressed(key);
  if (key == 'x') asteroids.put(new Asteroid(), 0);
}
