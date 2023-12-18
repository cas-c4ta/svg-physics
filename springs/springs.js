// Coding Math, Episode 15/16
// https://www.youtube.com/watch?v=JywnkK6Iuws
// https://www.youtube.com/watch?v=jFG8MzvUTXg

// spring
const springPoint = { x: width/2, y: height/2 }

// weight

const wp = {
  x: x = Math.random() * width,
  y: Math.random() * height
}
const radius = 10
const speed = 50
const dir = Math.random() * TAU
const grav = 0.5
const friction = 0.92
const weight = new Circle(wp.x, wp.y, radius, speed, dir, grav, friction)
const hue = Math.trunc(Math.random() * 360)
weight.setFill(`hsl(${hue} 90% 60%)`)

// path
const points = [
  { x: wp.x, y: wp.y, },
  { x: springPoint.x, y: springPoint.y, }
]
const path = new Path(points)
path.setStroke('white')

const k = 0.05 // stiffness of the spring
const springLength = 100

document.body.addEventListener('mousemove', (e) => {
  springPoint.x = e.clientX
  springPoint.y = e.clientY
})

function loop() {
  //distance btw weight & springPoint
  const dx = springPoint.x - weight.x
  const dy = springPoint.y - weight.y
  const dist = Math.sqrt(dx*dx + dy*dy)
  const springForce = (dist - springLength) * k
  const ax = dx / dist * springForce
  const ay = dy / dist * springForce


  weight.vx += ax
  weight.vy += ay

  weight.move()

  let points = [{x: springPoint.x, y: springPoint.y}, {x: weight.x, y: weight.y}]
  path.setPoints(points)
  // to do: drawPath from springPoint to weight

  requestAnimationFrame(loop)
}
loop()