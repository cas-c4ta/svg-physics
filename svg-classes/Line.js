class Line {
  constructor(start, end) {
    const newLine = document.createElementNS(svgNS, 'line')
    newLine.setAttribute('x1', start.x)
    newLine.setAttribute('y1', start.y)
    newLine.setAttribute('x2', end.x)
    newLine.setAttribute('y1', end.y)

    this.start = { x: start.x, y: start.y }
    this.end = { x: end.x, y: end.y }
    this.html = newLine
    svg.appendChild(newLine)
  }

  setPoints(a, b) {
    this.start.x = a.x
    this.start.y = a.y
    this.end.x = b.x
    this.end.y = b.y
    this.html.setAttribute('x1', a.x)
    this.html.setAttribute('y1', a.y)
    this.html.setAttribute('x2', b.x)
    this.html.setAttribute('y2', b.y)
  }

  setStroke(c) {
    this.html.setAttribute('stroke', c)
  }

  setStrokeWidth(w) {
    this.html.setAttribute('stroke-width', w)
  }

  setLinecap(c) {
    // 'butt' | sround' | 'square'
    this.html.setAttribute('stroke-linecap', c)
  }
}
