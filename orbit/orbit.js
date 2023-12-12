// Episode 11 «Gravity»

const cx = Math.trunc(width/2), cy = Math.trunc(height/2)

const sun = new Circle(cx, cy, 20, 0, 0)
const planet = new Circle(cx + 200, cy, 10, 10, -Math.PI / 2)

sun.mass = 20000
sun.setFill("gold")
planet.setFill("violet")

function loop() {
  planet.gravitateTo(sun)
  planet.move()
  requestAnimationFrame(loop)
}
loop()