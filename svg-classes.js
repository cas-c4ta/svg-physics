class Path {
  // ‘ship’ in coding math
  constructor(points, angle, speed, direction, grav) {
    this.d = ''
    for (const [index, point] of points.entries()) {
      if (index == 0) {
        this.d += `M ${point.x} ${point.y} `
      } else {
        this.d += `L  ${point.x} ${point.y} `
      }
      if (index == points.length - 1) {
        this.d += 'Z' // close path
      }
    }
    const newPath = document.createElementNS(svgNS, 'path')
    newPath.setAttribute('d', this.d)
    newPath.setAttribute('fill', 'red')

    // SVG-Node
    this.html = newPath

    this.angle = angle
    this.direction = direction || 0
    this.speed = speed || 0
    // Acceleration = change of velocity over time (also a vector)
    svg.appendChild(newPath)
  }
  updatePoints(points) {
    this.d = ''
    for (const [index, point] of points.entries()) {
      if (index == 0) {
        this.d += `M ${point.x} ${point.y} `
      } else {
        this.d += `L  ${point.x} ${point.y} `
      }
      if (index == points.length - 1) {
        this.d += 'Z' // close path
      }
    }
    this.html.setAttribute('d', this.d)
  }
  getX() {
    return parseInt(this.position.getX())
  }
  getY() {
    return parseInt(this.position.getY())
  }
  getAngle() {
    return parseFloat(this.angle)
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
  constructor(x, y, w, h, speed, direction, gravity, friction) {
    const newRect = document.createElementNS(svgNS, 'rect')
    newRect.setAttribute('x', x)
    newRect.setAttribute('y', y)
    newRect.setAttribute('width', w) // hard coded for now
    newRect.setAttribute('height', h)

    this.html = newRect

    this.x = x
    this.y = y
    this._width = w
    this._height = h

    this.vx = Math.cos(direction) * speed
    this.vy = Math.sin(direction) * speed
    this.gravity = gravity || 0

    this.bounce = -1
    this.mass = 1
    this.direction = direction || 0
    this.speed = speed || 0
    this.friction = friction || 1
    svg.appendChild(newRect)
  }

  getWidth() {
    return parseInt(this.html.getAttribute('width'))
  }

  getHeight() {
    return parseInt(this.html.getAttribute('height'))
  }

  getX() {
    return parseInt(this.html.getAttribute('x'))
  }

  getY() {
    return parseInt(this.html.getAttribute('y'))
  }

  setX(x) {
    this.x = x
    this.html.setAttribute('x', x)
  }

  setY(y) {
    this.y = y
    this.html.setAttribute('y', y)
  }

  setWidth(w) {
    this._width = w
    this.html.setAttribute('width', w)
  }

  setHeight(h) {
    this._height = h
    this.html.setAttribute('height', h)
  }

  setFill(c) {
    this.html.setAttribute('fill', c)
  }

  setStroke(s) {
    this.html.setAttribute('stroke', s)
  }

  move() {
    this.vx *= this.friction
    this.vy *= this.friction
    this.vy += this.gravity
    this.x += this.vx
    this.y += this.vy
    this.html.setAttribute('x', this.x)
    this.html.setAttribute('y', this.y)
  }

  accelerate(ax, ay) {
    this.vx += ax
    this.vy += ay
  }

  angleTo(p2) { // angle to body pulling on particle
    return Math.atan2(p2.y - this.y, p2.x - this.x)
  }

  distanceTo(p2) { // returns distance to other particle
    const dx = p2.x - this.x
    const dy = p2.y - this.y
    return Math.sqrt(dx * dx + dy * dy) // Pythagoras
  }

  gravitateTo(p2) {
    const dx = p2.x - this.x
    const dy = p2.y - this.y
    const distSQ = dx * dx + dy * dy
    const dist = Math.sqrt(distSQ)
    const force = p2.mass / distSQ
    const ax = (dx / dist) * force
    const ay = (dy / dist) * force
    this.vx += ax
    this.vy += ay
  }
}

class Circle {
  // ‘particle’ in coding math
  constructor(x, y, rad, speed, direction, gravity, friction) {
    const newCircle = document.createElementNS(svgNS, 'circle')
    newCircle.setAttribute('cx', x)
    newCircle.setAttribute('cy', y)
    newCircle.setAttribute('r', rad) // hard coded for now
    newCircle.setAttribute('transform-origin', `${x} ${y}`)

    this.html = newCircle

    this.x = x
    this.y = y
    this.radius = 0 || rad

    this.vx = Math.cos(direction) * speed
    this.vy = Math.sin(direction) * speed
    this.gravity = gravity || 0

    this.bounce = -1
    this.mass = 1
    this.direction = direction || 0
    this.speed = speed || 0
    this.friction = friction || 1
    svg.appendChild(newCircle)
  }

  getRadius() {
    return this.radius
  }

  getX() {
    return this.position.getX()
  }

  getY() {
    return this.position.getY()
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

  move() {
    this.vx *= this.friction
    this.vy *= this.friction
    this.vy += this.gravity
    this.x += this.vx
    this.y += this.vy
    this.html.setAttribute('cx', this.x)
    this.html.setAttribute('cy', this.y)
  }

  accelerate(ax, ay) {
    this.vx += ax
    this.vy += ay
  }

  angleTo(p2) { // angle to body pulling on particle
    return Math.atan2(p2.y - this.y, p2.x - this.x)
  }

  distanceTo(p2) { // returns distance to other particle
    const dx = p2.x - this.x
    const dy = p2.y - this.y
    return Math.sqrt(dx * dx + dy * dy) // Pythagoras
  }

  gravitateTo(p2) {
    const dx = p2.x - this.x
    const dy = p2.y - this.y
    const distSQ = dx * dx + dy * dy
    const dist = Math.sqrt(distSQ)
    const force = p2.mass / distSQ
    const ax = (dx / dist) * force
    const ay = (dy / dist) * force
    this.vx += ax
    this.vy += ay
  }
}
