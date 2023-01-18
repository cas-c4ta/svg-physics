const svgNS = 'http://www.w3.org/2000/svg'

const svg = document.createElementNS(svgNS, 'svg')
svg.setAttribute('viewBox', `0 0 ${vw()} ${vh()}`)
document.body.appendChild(svg)

function vh() {
  return window.innerHeight
}

function vw() {
  return window.innerWidth
}

const numRects = 200
const rects = []
for (let i=0; i<numRects; i++) {
  newRect = new Rect(vw()/2, vh()/3, 2 + Math.random() * 5, Math.random() * Math.PI * 2, 0.1)
  newRect.html.style.fill = `hsl(${Math.trunc(Math.random()*360)} 100% 50%)`
  rects.push(newRect)
}

let frameCount = 0
function loop() {
  frameCount += 1

  for (let rect of rects) {
    rect.move()
  }
  // rect1.checkPosition()

  window.requestAnimationFrame(loop)
}

loop()