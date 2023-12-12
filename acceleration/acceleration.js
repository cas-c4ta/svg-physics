// Episode 10? (acceleration)
// const ship = new Rect(width/2, height/2, 0, 0)
const a = { x: 0, y: 0 }
const b = { x: 10, y: 20 }
const c = { x: 20, y: 0 }
let points = [a, b, c]
const angle = 0
const transformOrigin = { x: 10, y: 10 }
const speed = 0
const direction = null
const gravity = null
const friction = null
const ship = new Path(
  points,
  angle,
  transformOrigin,
  speed,
  direction,
  gravity,
  friction
)
// (points: any, angle: any, transformOrigin: any, speed: any, direction: any, gravity: any, friction: any)
const thrust = new Vector(0, 0)
ship.html.classList.add('ship')
ship.setStroke('yellow')
ship.setFill('yellow')

const state = {
  turningLeft: false,
  turningRight: false,
  thrusting: false,
}

// Steuerung
document.body.addEventListener('keydown', (event) => {
  // 37 left, 38 up, 39 right, 40 down
  if (event.keyCode == 37) {
    state.turningLeft = true
  }
  if (event.keyCode == 38) {
    state.thrusting = true
  }
  if (event.keyCode == 39) {
    state.turningRight = true
  }
  // if (event.keyCode == 40) { thrust.setY(0.1)}
})

document.body.addEventListener('keyup', (event) => {
  if (event.keyCode == 37) {
    state.turningLeft = false
  }
  if (event.keyCode == 38) {
    state.thrusting = false
  }
  if (event.keyCode == 39) {
    state.turningRight = false
  }
  // if (event.keyCode == 40) { thrust.setY(0)}
})

// Animation
loop()
function loop() {
  // steering behaviour
  if (state.turningLeft) {
    ship.setAngle(ship.getAngle() - 0.05)
  }

  if (state.turningRight) {
    ship.setAngle(ship.getAngle() + 0.05)
  }

  thrust.setAngle(ship.getAngle())

  if (state.thrusting) {
    thrust.setLength(0.1)
  } else {
    thrust.setLength(0)
  }
  
  const x = thrust.getX()
  const y = thrust.getY()
  ship.accelerate(x, y)
  ship.move()

  // handle  leaving of viewport
  // Wenn die Viewbox nicht gleich gross wie
  // der Viewport ist, müsste das angepasst werden.
  const shipW = 20
  const shipH = 20
  if (ship.translation.x - shipW > width) {
    ship.translation.x = -shipW
  }
  if (ship.translation.x + shipW < 0) {
    ship.translation.x = width + shipW
  }
  if (ship.translation.y - shipH > height) {
    ship.translation.y = -shipH
  }
  if (ship.translation.y + shipH < 0) {
    ship.translation.y = height + shipH
  }

  requestAnimationFrame(loop)
}
