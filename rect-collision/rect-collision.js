const rect1 = new Rect(20, 30, 40, 20, null, null, null, null)
rect1.setFill("hotpink")

const rect2 = new Rect(300, 120, 180, 200, null, null, null, null)
rect2.setFill("lightgreen")

let frameCount = 0
loop()
function loop() {
  frameCount += 1
  
  requestAnimationFrame(loop)
}

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX
  const mouseY = e.clientY
  rect1.setX(mouseX)
  rect1.setY(mouseY)

  if (utils.rectIntersect(rect1, rect2)) {
    rect1.setFill("red")
    rect2.setFill("blue")
  } else {
    rect1.setFill("hotpink")
    rect2.setFill("lightgreen")
  }
})