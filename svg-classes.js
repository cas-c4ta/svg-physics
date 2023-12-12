class Path {
  // ‘ship’ in coding math
  constructor(points, angle, transformOrigin, speed, direction, gravity, friction) {
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

    this.html = newPath

    this.points = points
    this.translation = { x: 0, y: 0 }

    this.vx = Math.cos(direction) * speed
    this.vy = Math.sin(direction) * speed
    this.gravity = gravity || 0

    this.angle = angle
    this.transformOrigin = transformOrigin || {x: points[0].x, y: points[0].y}
    this.updateOrigin(this.transformOrigin.x, this.transformOrigin.y)
    this.direction = direction || 0
    this.speed = speed || 0
    this.friction = friction || 1

    svg.appendChild(newPath)
  }

  updateOrigin(x, y) {
    this.html.setAttribute('transform-origin', `${x} ${y}`)
  }

  setPoints(points) {
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
    this.points = points
  }

  getAngle() {
    return parseFloat(this.angle)
  }

  setAngle(a) {
    this.angle = a % (Math.PI * 2)
  }

  setFill(c) {
    this.html.setAttribute('fill', c)
  }

  setStroke(s) {
    this.html.setAttribute('stroke', s)
  }

  move() {
    // moving all points in a path is awful
    // transform seems good enough for the time being
    this.vx *= this.friction
    this.vy *= this.friction
    this.vy += this.gravity
    console.log(`velocity: ${this.vx}, ${this.vy}`)

    this.translation.x += this.vx
    this.translation.y += this.vy

    const x = Math.trunc(this.translation.x)
    const y = Math.trunc(this.translation.y)
    const translateString = `translate(${x} ${y})`

    const a = ((this.angle - Math.PI / 2) * 180) / Math.PI 
    const tx = this.transformOrigin.x
    const ty = this.transformOrigin.y
    const rotateString = `rotate(${a})`
    // beware: stupid discrepancy between vector-angle and transform-angle
    // ev. muss hinter rotate noch drehpunkt angegeben werden und zu transform-origin dazugezählt werden?
    this.html.setAttribute('transform', `${translateString} ${rotateString}`)
  }
  
  accelerate(ax, ay) {
    this.vx += ax
    this.vy += ay
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
