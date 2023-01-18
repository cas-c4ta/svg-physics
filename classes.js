class Rect {
  constructor(x, y, speed, direction, grav) {
    const newRect = document.createElementNS(svgNS, 'rect')
    newRect.setAttribute("x", x)
    newRect.setAttribute("y", y)
    newRect.setAttribute("width", 10) // hard coded for now
    newRect.setAttribute("height", 10)

    this.html = newRect
    this.position = new Vector(x, y)
    // Velocity = Speed & Direction
    this.velocity = new Vector(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5)
    // Speed = this.velocity.getLength()
    // Direction = this.velocity.getAngle()
    this.direction = Math.random() * Math.PI * 2
    this.speed = Math.random() * 3
    // Acceleration = change of velocity over time (also a vector)
    this.gravity = new Vector(0, grav || 0)

    /*
    const cx = x + w/2
    const cy = y + h/2
    newRect.setAttribute('transform-origin', `${cx} ${cy}`)
    */
    svg.appendChild(newRect)

  }
  getW() {
    return this.html.getAttribute('width')
  }
  getH() {
    return this.html.getAttribute('height')
  }
  getX() {
    return parseInt(this.html.getAttribute('x'))
  }
  getY() {
    return parseInt(this.html.getAttribute('y'))
  }
  setFill(c) {
    this.html.setAttribute('fill', c)
  }
  setStroke(s) {
    this.html.setAttribute('stroke', s)
  }
  checkPosition() {
    if ( this.getX() > (vw() - this.getW()) || this.getX() < 0 )
      { this.direction.x = this.direction.x * -1 }
    if ( this.getY() > (vh() - this.getH()) || this.getY() < 0 )
      { this.direction.y = this.direction.y * -1 }

  }
  move() {
    this.velocity.addTo(this.gravity)
    this.position.addTo(this.velocity)
    this.html.setAttribute('x', this.position.getX())
    this.html.setAttribute('y', this.position.getY())
  }
  accelerate(accel) {
    this.velocity.addTo(accel)
  }
}