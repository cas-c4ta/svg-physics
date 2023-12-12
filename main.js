const height = window.innerHeight
const width = window.innerWidth
const PI = Math.PI
const TAU = Math.PI * 2

const svgNS = 'http://www.w3.org/2000/svg'
const svg = document.createElementNS(svgNS, 'svg')
svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
document.body.appendChild(svg)



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
// Recycling
// if circle goes past bottom edge,
// reset it.
if (circle.position.getY() - circle.radius > height) {
  circle.position.setX(width/2)
  circle.position.setY(height)
  circle.velocity.setLength(Math.random()*8+5)
  circle.velocity.setAngle(-Math.PI / 2 + (Math.random() * .2 - .1))
  */