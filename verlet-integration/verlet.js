const points = []
const p = new SimpleCircle({
  x: 100,
  y: 100,
  rad: 5,
  oldx: 95,
  oldy: 95,
  bounce: 0.9,
  grav: 0.5,
  friction: 0.999
})
p.setFill('lime')
points.push(p)

loop()
function loop() {
  for (const point of points) {
    point.updatePosition()
    point.updateMarkup()
  }
  requestAnimationFrame(loop)
}
