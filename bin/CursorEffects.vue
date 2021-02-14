<template>
  <canvas id="vuepress-canvas-cursor"></canvas>
</template>

<script>
import { Boom } from './assets/js/boom.js'
export default {
  name: 'CursorEffects',
  data() {
    return {
      shape: EFFECTS_SHAPE,
      size: EFFECTS_SIZE,
      zIndex: EFFECTS_Z_INDEX,
      computerCanvas: null,
      renderCanvas: null,
      computerContext: null,
      renderContext: null,
      clientSize: { width: 0, height: 0 },
      resizeTimeout: null,
    }
  },
  mounted() {
    this.computerCanvas = document.createElement('canvas')
    this.renderCanvas = document.getElementById('vuepress-canvas-cursor')

    this.computerContext = this.computerCanvas.getContext('2d')
    this.renderContext = this.renderCanvas.getContext('2d')

    this.clientSize.width = window.innerWidth
    this.clientSize.height = window.innerHeight

    this.booms = []
    this.running = false
    this.init()
  },

  methods: {
    init() {
      this.setStyle(this.renderCanvas.style)
      this.renderCanvas.width = this.computerCanvas.width = this.clientSize.width
      this.renderCanvas.height = this.computerCanvas.height = this.clientSize.height
      this.makeHighRes(this.renderCanvas, this.renderContext)
      this.makeHighRes(this.computerCanvas, this.computerContext)

      window.addEventListener('mousedown', this.handleMouseDown)
      window.addEventListener('pagehide', this.handlePageHide)
      window.addEventListener('resize', this.handleResize)
    },

    setStyle(style) {
      style.position = 'fixed'
      style.top = 0
      style.left = 0
      style.zIndex = this.zIndex
      style.pointerEvents = 'none'
      style.width = this.clientSize.width
      style.height = this.clientSize.height
    },

    makeHighRes(canvas, ctx) {
      const dpr = window.devicePixelRatio || 1

      const oldWidth = canvas.width
      const oldHeight = canvas.height

      canvas.width = Math.round(oldWidth * dpr)
      canvas.height = Math.round(oldHeight * dpr)
      canvas.style.width = oldWidth + 'px'
      canvas.style.height = oldHeight + 'px'

      ctx.scale(dpr, dpr)
    },

    handleMouseDown(e) {
      const boom = new Boom({
        origin: { x: e.clientX, y: e.clientY },
        context: this.computerContext,
        size: this.size,
        shape: this.shape,
        clientSize: this.clientSize,
      })
      boom.init()
      this.booms.push(boom)
      this.running || this.run()
    },

    handlePageHide() {
      this.booms = []
      this.running = false
    },

    handleResize() {
      if (this.resizeTimeout != null) {
        clearTimeout(this.resizeTimeout)
      }
      this.resizeTimeout = setTimeout(() => {
        this.clientSize.width = window.innerWidth
        this.clientSize.height = window.innerHeight
        this.renderCanvas.width = this.computerCanvas.width = this.clientSize.width
        this.renderCanvas.height = this.computerCanvas.height = this.clientSize.height
        this.makeHighRes(this.renderCanvas, this.renderContext)
        this.makeHighRes(this.computerCanvas, this.computerContext)
      }, 500)
    },

    run() {
      this.running = true
      if (this.booms.length == 0) {
        return (this.running = false)
      }

      requestAnimationFrame(this.run)

      this.computerContext.clearRect(0, 0, this.clientSize.width, this.clientSize.height)
      this.renderContext.clearRect(0, 0, this.clientSize.width, this.clientSize.height)

      this.booms.forEach((boom, index) => {
        if (boom.stop) {
          this.booms.splice(index, 1)
          return
        }
        boom.move()
        boom.draw()
      })
      this.renderContext.drawImage(
        this.computerCanvas,
        0,
        0,
        this.clientSize.width,
        this.clientSize.height
      )
    },
  },
}
</script>
