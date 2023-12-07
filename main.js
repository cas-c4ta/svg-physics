const height = window.innerHeight
const width = window.innerWidth
const PI = Math.PI
const TAU = Math.PI * 2

const svgNS = 'http://www.w3.org/2000/svg'
const svg = document.createElementNS(svgNS, 'svg')
svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
document.body.appendChild(svg)



/*
// Episode 13, Friction
// https://www.youtube.com/watch?v=ueqi8boYS5k

// F R I C T I O N
const friction = 0.97 // trial & error

// circle vars
const x = width/2
const y = height/2
const rad = 10
const speed = 10
const dir = Math.random() * TAU
const grav = null
const circle = new Circle(x, y, rad, speed, dir, grav, friction)
const hue = Math.random()*50 + 100
circle.html.style.fill = `hsl(${hue} 80% 60%)`

// Animation
let frameCount = 0
loop()
function loop() {
  frameCount += 1
  circle.move()
  window.requestAnimationFrame(loop)
}
*/

const circles = []
for (let i = 0; i < 50; i += 1) {
  const x = Math.trunc(width / 2 + Math.random()*100 - 50)
  const y = 20 + Math.trunc(height - Math.random() * 50)
  const rad = 5 + Math.random() * 10
  const speed = Math.random() * 8 + 5
  const dir = -Math.PI / 2 + (Math.random() * .4 - .2)
  const grav = .15
  const friction = 0.992
  const circle = new Circle(x, y, rad, speed, dir, grav, friction)
  circle.html.style.fill = `hsl(${Math.random()*50} 80% 60%)`
  circle.bounce = -0.7 // -40% velocity on each collision
  circles.push(circle)
}
// Episode 12, Edge Handling
// Animation
let frameCount = 0
function loop() {
  frameCount += 1

  for (const circle of circles) {
  /* debug
    if (frameCount % 10 == 0) {
      console.log(circles[0].velocity.getLength())
    }
    */
    circle.move()

    const posX = circle.position.getX()
    const posY = circle.position.getY()
    const hitLeft = posX <= circle.radius
    const hitRight = posX >= width - circle.radius
    const hitTop = posY <= circle.radius
    const hitBottom = posY >= height - circle.radius

    if (hitLeft) {
      circle.position.setX(circle.radius)
      circle.velocity.setX(circle.velocity.getX() * circle.bounce)
    }
    if (hitRight) {
      circle.position.setX(width - circle.radius)
      circle.velocity.setX(circle.velocity.getX() * circle.bounce)
    }
    if (hitTop) {
      circle.position.setY(circle.radius)
      circle.velocity.setY(circle.velocity.getY() * circle.bounce)
    }
    if (hitBottom) {
      circle.position.setY(height - circle.radius)
      circle.velocity.setY(circle.velocity.getY() * circle.bounce)
    }
  }

  window.requestAnimationFrame(loop)
}

loop()

// Entfernen aller Elemente ausserhalb des
// sichtbaren Bereichs
// Wenn die Viewbox nicht gleich gross wie
// der Viewport ist, müsste das angepasst werden.

/*
function removeDeadElements() {
  // nicht getestet!
  for (let i = elements.length - 1; i >= 0; i -= 1) {
    const el = elements[i]
    if (
      el.position.getX() - el.radius > width ||
      el.position.getX() + el.radius < 0 ||
      el.position.getY() - el.radius > height ||
      el.position.getY() + el.radius < 0
    ) {
      elements.splice(i, 1)
    }
  }
}
*/

  // handle  leaving of viewport
  // Wenn die Viewbox nicht gleich gross wie
  // der Viewport ist, müsste das angepasst werden.
  /*
  if (ship.position.getX() - ship.radius > width) {
    ship.position.setX(-ship.radius)
  }
  if (ship.position.getX() + ship.radius < 0) {
    ship.position.setX(width + ship.radius)
  }
  if (ship.position.getY() - ship.radius > height) {
    ship.position.setY(-ship.radius)
  }
  if (ship.position.getY() + ship.radius < 0) {
    ship.position.setY(height + ship.radius)
  }
*/


/*
// Episode 10? (acceleration)
// const ship = new Rect(width/2, height/2, 0, 0)
const a = new Vector(0, 0)
const b = new Vector(10, 20)
const c = new Vector(20, 0)
let points = [a, b, c]
const angle = 0
const ship = new Path(points, angle, 0, 0)
const thrust = new Vector(0, 0)
ship.html.classList.add('ship')

let turningLeft = false
let turningRight = false
let thrusting = false

// Steuerung
document.body.addEventListener('keydown', (event) => {
  // 37 left, 38 up, 39 right, 40 down
  if (event.keyCode == 37) { turningLeft = true }
  if (event.keyCode == 38) { thrusting = true }
  if (event.keyCode == 39) { turningRight = true }
  // if (event.keyCode == 40) { thrust.setY(0.1)}
})

document.body.addEventListener('keyup', (event) => {
  if (event.keyCode == 37) { turningLeft = false}
  if (event.keyCode == 38) { thrusting = false } 
  if (event.keyCode == 39) { turningRight = false}
  // if (event.keyCode == 40) { thrust.setY(0)}
})
*/
/*
// steering behaviour
if (turningLeft) {
  ship.setAngle(ship.getAngle() - 0.05)
}

if (turningRight) {
  ship.setAngle(ship.getAngle() + 0.05)
}

thrust.setAngle(ship.getAngle())

if (thrusting) {
  thrust.setLength(0.1)
} else {
  thrust.setLength(0)
}

ship.accelerate(thrust)
*/

/*
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
*/

/*
// Recycling
// if circle goes past bottom edge,
// reset it.
if (circle.position.getY() - circle.radius > height) {
  circle.position.setX(width/2)
  circle.position.setY(height)
  circle.velocity.setLength(Math.random()*8+5)
  circle.velocity.setAngle(-Math.PI / 2 + (Math.random() * .2 - .1))
  */