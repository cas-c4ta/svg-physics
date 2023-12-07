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
    return Math.min(Math.max(value, min), max)
  },

  distance: function(p1, p2) {
    const dx = p1.getX() - p2.getX()
    const dy = p1.getY() - p2.getY()
    return Math.sqrt(dx*dx + dy*dy)
  },

  distanceXY: function(x0, y0, x1, y1) {
    const dx = x1 - c0
    const dy = y1 - y0
    return Math.sqrt(dx*dx + dy*dy)
  },

  circleCollision: function(c0, c1) {
    return this.distance(c0.position, c1.position) <= c0.radius + c1.radius
  }
}