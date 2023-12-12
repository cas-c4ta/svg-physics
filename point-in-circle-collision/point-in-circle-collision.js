const circle = new Circle(width/2, height/2, 150)
circle.setFill("lightgreen")

loop()
function loop() {
  requestAnimationFrame(loop)
}

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX
  const mouseY = e.clientY

  if (utils.pointInCircle(mouseX, mouseY, circle)) {
    circle.setFill("blue")
  } else {
    circle.setFill("lightgreen")
  }
})