const utils = {
  norm: function(value, min, max) {
    return (value - min) / (max - min)
  },

  lerp: function(norm, min, max) {
    return (max - min) * norm + min
  },

  map: function(value, sourceMin, sourceMax, destMin, destMax) {
    return this.lerp(this.norm(value, sourceMin, sourceMax), destMin, destMax)
  },

  clamp: function(value, min, max) {
    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max))
  },

  distance: function(p1, p2) {
    const dx = p1.getX() - p2.getX()
    const dy = p1.getY() - p2.getY()
    return Math.sqrt(dx*dx + dy*dy)
  },

  distanceXY: function(x0, y0, x1, y1) {
    const dx = x1 - x0
    const dy = y1 - y0
    return Math.sqrt(dx*dx + dy*dy)
  },

  circleCollision: function(c0, c1) { // colliding circles
    return this.distance(c0.position, c1.position) <= c0.radius + c1.radius
  },

  pointInCircle: function(x, y, circle) { // point collides with circle
    const cx = circle.position.getX()
    const cy = circle.position.getY()
    return this.distanceXY(x, y, cx, cy) < circle.getRadius() 
  },

  inRange: function(value, min, max) {
    // fun fact: max can be smaller than min,
    // e.g. on a negative scale
    // thus, be safe and use Math.min() & Math.max()
    return value >= Math.min(min, max) && value <= Math.max(min, max)
  },

  pointInRect: function(x, y, rect) { // point collides with rect
    const rLeft = rect.getX()
    const rRight = rect.getX() + rect.getWidth()
    const rTop = rect.getY()
    const rBottom = rect.getY() + rect.getHeight()
    return this.inRange(x, rLeft, rRight) && this.inRange(y, rTop, rBottom)
  },

  rangeIntersect: function(min0, max0, min1, max1) {
    // make sure min is min, and max is max
    const minA = Math.min(min0, max0)
    const maxA = Math.max(min0, max0)
    const minB = Math.min(min1, max1)
    const maxB = Math.max(min1, max1)
    return !(maxA < minB || maxB < minA)
  },

  rectIntersect: function(rect1, rect2) { // colliding rects
    rect1left = rect1.position.getX()
    rect1right = rect1.position.getX() + rect1.getWidth()
    rect1top = rect1.position.getY()
    rect1bottom = rect1.position.getY() + rect1.getHeight()

    rect2left = rect2.position.getX()
    rect2right = rect2.position.getX() + rect2.getWidth()
    rect2top = rect2.position.getY()
    rect2bottom = rect2.position.getY() + rect2.getHeight()

    const rangeX_Intersect = this.rangeIntersect(rect1left, rect1right, rect2left, rect2right)
    const rangeY_Intersect = this.rangeIntersect(rect1top, rect1bottom, rect2top, rect2bottom)

    return rangeX_Intersect && rangeY_Intersect
  }
}