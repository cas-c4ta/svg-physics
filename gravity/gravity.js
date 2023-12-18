const numCircles = 30
const circles = []
for (let i = 0; i < numCircles; i += 1) {
  const s = { // circle specs
    x: Math.random() * width/3 + width/3,
    y: Math.random() * height/2 + height/2,
    rad: Math.random() * 10 + 3,
    speed: 20,
    dir: -Math.PI/2 + Math.random() * 0.2 * Math.PI - 0.1 * Math.PI,
    grav: 1,
    fric: 1,
    hue: Math.random() * 40
  }
  const circle = new Circle(s.x, s.y, s.rad, s.speed, s.dir, s.grav, s.fric)
  circle.setFill(`hsl(${s.hue} 90% 60%)`)
  circles.push(circle)
}

loop()
function loop() {
  for (circle of circles) {
    checkEdges(circle)
    circle.move()
  }
  window.requestAnimationFrame(loop)
}


function checkEdges(p) {
  if (p.y + p.radius > height) {
    p.setY(height-p.radius)
    p.vy *= -0.95
  }
  if (p.x + p.radius < 0 || p.x - p.radius > width) {
    p.vx *= -0.9
  }
}