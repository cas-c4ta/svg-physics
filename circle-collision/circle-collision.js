
const circle1 = new Circle(30, 30, 30)
circle1.setFill("hotpink")

const circle2 = new Circle(width/2, height/2, 150)
circle2.setFill("lightgreen")

loop()
function loop() {
  requestAnimationFrame(loop)
}

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX
  const mouseY = e.clientY
  circle1.setX(mouseX)
  circle1.setY(mouseY)

  if (utils.circleCollision(circle1, circle2)) {
    circle1.setFill("red")
    circle2.setFill("blue")
  } else {
    circle1.setFill("hotpink")
    circle2.setFill("lightgreen")
  }
})