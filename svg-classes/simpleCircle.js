class SimpleCircle {
  // simpler Circle, as used in Episode
  // Verlet Integration pt.1
  // https://www.youtube.com/watch?v=3HjO_RGIjCU
  // stores it’s position, it’s previous position
  // and calculates it’s velocity by subtracting
  // the previous position.
  constructor(args) {
    const newCircle = document.createElementNS(svgNS, 'circle')
    newCircle.setAttribute('cx', args.x)
    newCircle.setAttribute('cy', args.y)
    newCircle.setAttribute('r', args.rad)

    this.html = newCircle

    this.x = args.x
    this.y = args.y
    this.oldx = args.oldx
    this.oldy = args.oldy
    this.radius = 0 || args.rad
    // modificators
    this.bounce = args.bounce || 1 // loose energy on rebound
    this.gravity = args.grav || 0
    this.friction = args.friction || 1

    svg.appendChild(newCircle)
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  setX(newX) {
    this.x = newX
    this.html.setAttribute('cx', newX)
  }

  setY(newY) {
    this.y = newY
    this.html.setAttribute('cy', newY)
  }

  setFill(c) {
    this.html.setAttribute('fill', c)
  }

  setStroke(s) {
    this.html.setAttribute('stroke', s)
  }
  updatePosition() {
    const vx = (this.x - this.oldx) * this.friction
    const vy = (this.y - this.oldy) * this.friction
    this.oldx = this.x
    this.oldy = this.y
    this.x += vx
    this.y += vy
    this.y += this.gravity

    if (this.x + this.radius > width) {
      this.x = width - this.radius
      this.oldx = this.x + vx * this.bounce // flip to other side
    } else if (this.x - this.radius < 0) {
      this.x = this.radius
      this.oldx = this.x + vx * this.bounce // flip to other side
    }
    if (this.y + this.radius > height) {
      this.y = height - this.radius
      this.oldy = this.y + vy * this.bounce
    } else if (this.y - this.radius < 0) {
      this.y = this.radius
      this.oldy = this.y + vy * this.bounce
    }
  }
  updateMarkup() {
    this.html.setAttribute('cx', this.x)
    this.html.setAttribute('cy', this.y)
  }
}
