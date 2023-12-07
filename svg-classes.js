class Path {
  // ‘ship’ in coding math
  constructor(points, angle, speed, direction, grav) {
    this.d = ''
    for (const [index, point] of points.entries()) {
      if (index == 0) {
        this.d += `M ${point.getX()} ${point.getY()} `
      } else {
        this.d += `L  ${point.getX()} ${point.getY()} `
      }
      if (index == points.length - 1) {
        this.d += 'Z' // close path
      }
    }
    const newPath = document.createElementNS(svgNS, 'path')
    newPath.setAttribute('d', this.d)
    newPath.setAttribute('fill', 'red')
    // newPath.style.stroke = 'black'
    // SVG-Node
    this.html = newPath

    this.position = new Vector(points[0].getX(), points[0].getY()) // kein Sinn für Pfad
    // Velocity = Speed & Direction
    this.velocity = new Vector(0, 0)
    // Speed = this.velocity.getLength()
    // angle the «ship» is pointing
    this.angle = angle
    // Direction = this.velocity.getAngle()
    this.direction = direction || 0
    this.speed = speed || 0
    // Acceleration = change of velocity over time (also a vector)
    this.gravity = new Vector(0, grav || 0)
    svg.appendChild(newPath)
  }
  /*
  getW() {
    return this.html.getAttribute('width')
  }
  getH() {
    return this.html.getAttribute('height')
  }
  */
  getX() {
    return this.position.getX()
  }
  getY() {
    return this.position.getY()
  }
  getAngle() {
    return this.angle
  }
  setAngle(a) {
    this.angle = a % (Math.PI * 2)
    console.log('set angle')
  }
  setFill(c) {
    this.html.setAttribute('fill', c)
  }
  setStroke(s) {
    this.html.setAttribute('stroke', s)
  }
  move() {
    this.velocity.addTo(this.gravity)
    this.position.addTo(this.velocity)
    // moving all points in a path is awful
    // transform seems good enough for the time being
    const x = this.position.getX()
    const y = this.position.getY()
    const translateString = `translate(${Math.trunc(x)} ${Math.trunc(y)})`
    // beware:
    // turning point for angle is hard coded garbage!
    const rotateString = `rotate(${
      ((this.angle - Math.PI / 2) * 180) / Math.PI
    }, 10, 10)` /* 🤡🐒 */
    // also: stupid discrepancy between vector-angle and transform-angle
    this.html.setAttribute('transform', `${translateString} ${rotateString}`)
  }
  accelerate(accel) {
    this.velocity.addTo(accel)
  }
}

class Rect {
  // ‘particle’ in coding math
  // constructor(x, y, speed, direction, grav) {
  constructor(x, y, speed, direction, gravity, friction) {
    const newRect = document.createElementNS(svgNS, 'rect')
    newRect.setAttribute('x', x)
    newRect.setAttribute('y', y)
    newRect.setAttribute('width', 10) // hard coded for now
    newRect.setAttribute('height', 10)

    this.html = newRect
    this.position = new Vector(x, y)
    // Velocity = Speed & Direction
    this.velocity = new Vector(0, 0)
    this.mass = 10
    // Speed = this.velocity.getLength()
    // Direction = this.velocity.getAngle()
    this.direction = direction || 0
    this.gravity = new Vector(0, gravity || 0)
    this.speed = speed || 0
    this.friction = friction || 1
    // Acceleration = change of velocity over time (also a vector)
    this.velocity.setLength(this.speed)
    this.velocity.setAngle(this.direction)
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
  move() {
    this.position.addTo(this.velocity)
    this.velocity.addTo(this.gravity)
    this.velocity.multiplyBy(this.friction)
    this.html.setAttribute('x', this.position.getX())
    this.html.setAttribute('y', this.position.getY())
  }
  accelerate(accel) {
    this.velocity.addTo(accel)
  }
  angleTo(p2) {
    // angle to body pulling on particle
    return Math.atan2(
      p2.position.getY() - this.position.getY(),
      p2.position.getX() - this.position.getX()
    )
  }
  distanceTo(p2) {
    // returns distance to other particle
    const dx = p2.position.getX() - this.position.getX()
    const dy = p2.position.getY() - this.position.getY()
    return Math.sqrt(dx * dx + dy * dy) // Pythagoras
  }
  gravitateTo(p2) {
    // returns gravity of p2 on this object
    const grav = new Vector(0, 0)
    const dist = this.distanceTo(p2)
    grav.setLength(p2.mass / (dist * dist))
    grav.setAngle(this.angleTo(p2))
    this.velocity.addTo(grav)
  }
  /*
  checkPosition() {
    if ( this.getX() > (vw() - this.getW()) || this.getX() < 0 )
      { this.direction.x = this.direction.x * -1 }
    if ( this.getY() > (vh() - this.getH()) || this.getY() < 0 )
      { this.direction.y = this.direction.y * -1 }

  }
  */
}

class Circle {
  // ‘particle’ in coding math
  // constructor(x, y, speed, direction, grav) {
  constructor(x, y, rad, speed, direction, gravity, friction) {
    const newCircle = document.createElementNS(svgNS, 'circle')
    newCircle.setAttribute('cx', x)
    newCircle.setAttribute('cy', y)
    newCircle.setAttribute('r', rad) // hard coded for now

    this.html = newCircle
    this.position = new Vector(x, y)
    this.radius = 0 || rad
    this.bounce = -1
    // Velocity = Speed & Direction
    this.velocity = new Vector(0, 0)
    this.mass = 1
    // Speed = this.velocity.getLength()
    // Direction = this.velocity.getAngle()
    this.direction = direction || 0
    this.gravity = new Vector(0, gravity || 0)
    this.speed = speed || 0
    this.friction = friction || 1
    // Acceleration = change of velocity over time (also a vector)
    this.velocity.setLength(this.speed)
    this.velocity.setAngle(this.direction)

    newCircle.setAttribute('transform-origin', `${x} ${y}`)

    svg.appendChild(newCircle)
  }
  getR() {
    return this.html.getAttribute('r')
  }
  getX() {
    return parseInt(this.html.getAttribute('cx'))
  }
  getY() {
    return parseInt(this.html.getAttribute('cy'))
  }
  setFill(c) {
    this.html.setAttribute('fill', c)
  }
  setStroke(s) {
    this.html.setAttribute('stroke', s)
  }
  move() {
    this.position.addTo(this.velocity)

    // apply gravity if "in the air"
    // unbefriedigend, to say the least
    if (this.position.getY() + this.radius - height <= 0.1) {
      // should be set to floor eventually
      this.velocity.addTo(this.gravity) // test this!
    } else {
      this.position.setY(height - this.radius)
    }

    // apply friction only "on the floor"
    // unbefriedigend, to say the least
    if (Math.trunc(this.position.getY()+this.radius - height) <= 1) {
      // this.velocity.multiplyBy(this.friction)
      const xVel = this.velocity.getX()
      this.velocity.setX(xVel * this.friction)
      // stop eventually
      if (this.velocity.getLength() < 0.1) {
        this.velocity.setLength(0)
      }
    }
    this.html.setAttribute('cx', this.position.getX())
    this.html.setAttribute('cy', this.position.getY())
  }
  accelerate(accel) {
    this.velocity.addTo(accel)
  }
  angleTo(p2) {
    // angle to body pulling on particle
    return Math.atan2(
      p2.position.getY() - this.position.getY(),
      p2.position.getX() - this.position.getX()
    )
  }
  distanceTo(p2) {
    // returns distance to other particle
    const dx = p2.position.getX() - this.position.getX()
    const dy = p2.position.getY() - this.position.getY()
    return Math.sqrt(dx * dx + dy * dy) // Pythagoras
  }
  gravitateTo(p2) {
    // returns gravity of p2 on this object
    const grav = new Vector(0, 0)
    const dist = this.distanceTo(p2)
    grav.setLength(p2.mass / (dist * dist))
    grav.setAngle(this.angleTo(p2))
    this.velocity.addTo(grav)
  }
  /*
  checkPosition() {
    if ( this.getX() > (vw() - this.getW()) || this.getX() < 0 )
      { this.direction.x = this.direction.x * -1 }
    if ( this.getY() > (vh() - this.getH()) || this.getY() < 0 )
      { this.direction.y = this.direction.y * -1 }

  }
  */
}