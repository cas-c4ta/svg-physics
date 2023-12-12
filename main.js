const height = window.innerHeight
const width = window.innerWidth
const PI = Math.PI
const TAU = Math.PI * 2

const svgNS = 'http://www.w3.org/2000/svg'
const svg = document.createElementNS(svgNS, 'svg')
svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
document.body.appendChild(svg)



// Entfernen aller Elemente ausserhalb des
// sichtbaren Bereichs
// Wenn die Viewbox nicht gleich gross wie
// der Viewport ist, müsste das angepasst werden.

/*
function removeDeadElements() {
  // nicht getestet!
  for (let i = elements.length - 1; i >= 0; i -= 1) {
    const el = elements[i]
    if (
      el.position.getX() - el.radius > width ||
      el.position.getX() + el.radius < 0 ||
      el.position.getY() - el.radius > height ||
      el.position.getY() + el.radius < 0
    ) {
      elements.splice(i, 1)
    }
  }
}
*/


/*
// Recycling
// if circle goes past bottom edge,
// reset it.
if (circle.position.getY() - circle.radius > height) {
  circle.position.setX(width/2)
  circle.position.setY(height)
  circle.velocity.setLength(Math.random()*8+5)
  circle.velocity.setAngle(-Math.PI / 2 + (Math.random() * .2 - .1))
  */