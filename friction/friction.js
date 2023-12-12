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
const hue = Math.random()*50 + 100

const circle = new Circle(x, y, rad, speed, dir, grav, friction)
circle.html.style.fill = `hsl(${hue} 80% 60%)`

// Animation
let frameCount = 0
loop()
function loop() {
  frameCount += 1
  circle.move()
  window.requestAnimationFrame(loop)
}