/**
 * based on:
 * https://github.com/DIYgod/diygod.me/blob/master/themes/sagiri/src/cursor-effects.js
 **/

class Particle {
  constructor({ origin, size, speed, color, angle, context }) {
    this.origin = origin
    this.position = { ...this.origin }
    this.size = size
    this.color = color
    this.speed = speed
    this.angle = angle
    this.context = context
    this.renderCount = 0
  }

  draw() {}

  move() {
    this.position.x = Math.sin(this.angle) * this.speed + this.position.x
    this.position.y = Math.cos(this.angle) * this.speed + this.position.y + this.renderCount * 0.3
    this.renderCount++
  }
}

class Circle extends Particle {
  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    this.context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2)
    this.context.fill()
  }
}

class Star extends Particle {
  constructor({ origin, size, speed, color, angle, context }) {
    super({ origin, size, speed, color, angle, context })
    this.rotate = 0
  }

  draw() {
    this.context.fillStyle = this.color
    this.context.beginPath()
    const R = this.size * 2
    const r = this.size
    for (let i = 0; i < 5; i++) {
      this.context.lineTo(
        Math.cos(((18 + 72 * i - this.rotate) / 180) * Math.PI) * R + this.position.x,
        -Math.sin(((18 + 72 * i - this.rotate) / 180) * Math.PI) * R + this.position.y
      )
      this.context.lineTo(
        Math.cos(((54 + 72 * i - this.rotate) / 180) * Math.PI) * r + this.position.x,
        -Math.sin(((54 + 72 * i - this.rotate) / 180) * Math.PI) * r + this.position.y
      )
    }
    this.context.fill()
    this.rotate += 5
  }
}

class Boom {
  constructor({ origin, context, shape = 'star', size = 2, particleCount = 10, clientSize }) {
    this.origin = origin
    this.context = context
    this.shape = shape
    this.size = size
    this.particleCount = particleCount
    this.clientSize = clientSize
    this.stop = false
    this.particles = []
  }

  randomArray(range) {
    const length = range.length
    const randomIndex = Math.floor(length * Math.random())
    return range[randomIndex]
  }

  randomColor() {
    const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    return (
      '#' +
      this.randomArray(range) +
      this.randomArray(range) +
      this.randomArray(range) +
      this.randomArray(range) +
      this.randomArray(range) +
      this.randomArray(range)
    )
  }

  randomRange(start, end) {
    return (end - start) * Math.random() + start
  }

  getShape(shape) {
    const shapeMap = {
      star: Star,
      circle: Circle,
    }
    return shapeMap[shape]
  }

  init() {
    for (let i = 0; i < this.particleCount; i++) {
      const Shape = this.getShape(this.shape)
      const particle = new Shape({
        context: this.context,
        origin: this.origin,
        size: this.size,
        color: this.randomColor(),
        angle: this.randomRange(Math.PI - 1, Math.PI + 1),
        speed: this.randomRange(1, 6),
      })
      this.particles.push(particle)
    }
  }

  move() {
    this.particles.forEach((particle, index) => {
      if (
        particle.position.x < 0 ||
        particle.position.x > this.clientSize.width ||
        particle.position.y > this.clientSize.height
      ) {
        this.particles.splice(index, 1)
        return
      }
      particle.move()
    })
    if (this.particles.length == 0) {
      this.stop = true
    }
  }

  draw() {
    this.particles.forEach((particle) => particle.draw())
  }
}

export { Boom }
