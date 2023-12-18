// Coding Math, Episode 15/16
// https://www.youtube.com/watch?v=JywnkK6Iuws
// https://www.youtube.com/watch?v=jFG8MzvUTXg

// two objects springing to each other

const hue = Math.trunc(Math.random() * 360)
const grav = 0.3
const friction = 0.9
const k = 0.01 // stiffness of the spring
const separation = 100 // spring length

// specs for circle A
const sa = {
  x: Math.random() * width,
  y: Math.random() * height,
  r: 10,
  speed: Math.random() * 50,
  dir: Math.random() * TAU,
  grav: grav,
  friction: friction,
  hue: hue,
}

// specs for circle B
const sb = {
  x: Math.random() * width,
  y: Math.random() * height,
  r: 10,
  speed: Math.random() * 50,
  dir: Math.random() * TAU,
  grav: grav,
  friction: friction,
  hue: hue,
}

// specs for circle C
const sc = {
  x: Math.random() * width,
  y: Math.random() * height,
  r: 10,
  speed: Math.random() * 50,
  dir: Math.random() * TAU,
  grav: grav,
  friction: friction,
  hue: hue,
}

// create lines to connect the circles
const a = { x: sa.x, y: sa.y }
const b = { x: sb.x, y: sb.y }
const c = { x: sc.x, y: sc.y }

const ab = new Line(a, b)
const bc = new Line(b, c)
const ca = new Line(c, a)

const lines = [ab, bc, ca]

for (const line of lines) {
  line.setStroke(`hsl(0 0% 100%)`)
}

// create circles
const circleA = new Circle(
  sa.x,
  sa.y,
  sa.r,
  sa.speed,
  sa.dir,
  sa.grav,
  sa.friction
)
const circleB = new Circle(
  sb.x,
  sb.y,
  sb.r,
  sb.speed,
  sb.dir,
  sb.grav,
  sb.friction
)
const circleC = new Circle(
  sc.x,
  sc.y,
  sc.r,
  sc.speed,
  sc.dir,
  sc.grav,
  sc.friction
)

circleA.setFill(`hsl(${sa.hue} 90% 60%)`)
circleB.setFill(`hsl(${sb.hue} 90% 60%)`)
circleC.setFill(`hsl(${sb.hue} 90% 60%)`)

function spring(p0, p1, separation) {
  const dx = p0.x - p1.x
  const dy = p0.y - p1.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  const springForce = (dist - separation) * k
  const ax = (dx / dist) * springForce
  const ay = (dy / dist) * springForce

  p0.vx -= ax
  p0.vy -= ay
  p1.vx += ax
  p1.vy += ay
}

function checkEdges(p) {
  if (p.y + p.radius > height) {
    p.setY(height - p.radius)
    p.vy *= -0.95
  }
}

function loop() {
  spring(circleA, circleB, separation)
  spring(circleB, circleC, separation)
  spring(circleC, circleA, separation)

  checkEdges(circleA)
  checkEdges(circleB)
  checkEdges(circleC)

  circleA.move()
  circleB.move()
  circleC.move()

  const a = { x: circleA.x, y: circleA.y }
  const b = { x: circleB.x, y: circleB.y }
  const c = { x: circleC.x, y: circleC.y }

  ab.setPoints(a, b)
  bc.setPoints(b, c)
  ca.setPoints(c, a)

  requestAnimationFrame(loop)
}
loop()

function checkEdges(p) {
  if (p.y + p.radius > height) {
    p.setY(height - p.radius)
    p.vy *= -0.95
  }
}
