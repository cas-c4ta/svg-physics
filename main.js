const height = window.innerHeight
const width = window.innerWidth

const svgNS = 'http://www.w3.org/2000/svg'
const svg = document.createElementNS(svgNS, 'svg')
svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
document.body.appendChild(svg)

// const ship = new Rect(width/2, height/2, 0, 0)
const a = new Vector(0, 0)
const b = new Vector(10, 20)
const c = new Vector(20, 0)
const ship = new Path([a, b, c], 0, 0)
ship.setStroke('red')

const thrust = new Vector(0, 0)
let angle = 0 

let frameCount = 0

// Steuerung
document.body.addEventListener('keydown', (event) => {
  // 37 left, 38 up, 39 right, 40 down
  if (event.keyCode == 37) { thrust.setX(-0.1)}
  if (event.keyCode == 38) { thrust.setY(-0.1)}
  if (event.keyCode == 39) { thrust.setX(0.1)}
  if (event.keyCode == 40) { thrust.setY(0.1)}
})

document.body.addEventListener('keyup', (event) => {
  if (event.keyCode == 37) { thrust.setX(0)}
  if (event.keyCode == 38) { thrust.setY(0)} 
  if (event.keyCode == 39) { thrust.setX(0)}
  if (event.keyCode == 40) { thrust.setY(0)}
})

// Animation
function loop() {
  frameCount += 1

  ship.accelerate(thrust)
  ship.move()

  if (ship.position.getX() > width) {
    ship.position.setX(0)
  }
  if (ship.position.getX() < 0) {
    ship.position.setX(width)
  }
  if (ship.position.getY() > height) {
    ship.position.setY(0)
  }
  if (ship.position.getY() < 0) {
    ship.position.setY(height)
  }
  window.requestAnimationFrame(loop)
}

loop()