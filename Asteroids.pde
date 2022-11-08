import java.util.Set;
import java.util.HashSet;

public static Set<Asteroid> asteroids = new HashSet<>();
public void setup() {
  fullScreen();
  strokeWeight(2);
  stroke(0xfff);
  noFill();
}
public void draw() {
  for (Asteroid a : asteroids) a.draw();
  Spaceship.instance.draw();
}
