const w = 300
const h = 200
const x = width/2 - w/2
const y = height/2 - h/2

const rect1 = new Rect(x, y, w, h, null, null, null, null)
rect1.setFill("hotpink")

loop()
function loop() {
  requestAnimationFrame(loop)
}

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX
  const mouseY = e.clientY

  if (utils.pointInRect(mouseX, mouseY, rect1)) {
    rect1.setFill("lightgreen")
  } else {
    rect1.setFill("hotpink")
  }
})