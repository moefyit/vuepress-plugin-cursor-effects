<template>
  <canvas id="vuepress-canvas-cursor"></canvas>
</template>

<script>
  import { Boom } from "./assets/js/boom.js"
  export default {
    name: "CursorEffects",
    data() {
      return {
        shape: EFFECTS_SHAPE,
        size: EFFECTS_SIZE,
        zIndex: EFFECTS_Z_INDEX,
        computerCanvas: null,
        renderCanvas: null,
        computerContext: null,
        renderContext: null,
        globalWidth: 0,
        globalHeight: 0
      }
    },
    mounted() {
      this.computerCanvas = document.createElement('canvas')
      this.renderCanvas = document.getElementById('vuepress-canvas-cursor')

      this.computerContext = this.computerCanvas.getContext('2d')
      this.renderContext = this.renderCanvas.getContext('2d')

      this.globalWidth = window.innerWidth
      this.globalHeight = window.innerHeight

      this.booms = []
      this.running = false
      this.init()
    },

    methods: {
      init() {
        this.setStyle(this.renderCanvas.style)
        this.renderCanvas.width = this.computerCanvas.width = this.globalWidth
        this.renderCanvas.height = this.computerCanvas.height = this.globalHeight

        window.addEventListener('mousedown', this.handleMouseDown)
        window.addEventListener('pagehide', this.handlePageHide)
      },

      setStyle(style) {
        style.position = 'fixed'
        style.top = 0
        style.left = 0
        style.zIndex = this.zIndex
        style.pointerEvents = 'none'
        style.width = this.globalWidth
        style.height = this.globalHeight
      },

      handleMouseDown(e) {
        const boom = new Boom({
          origin: { x: e.clientX, y: e.clientY },
          context: this.computerContext,
          size: this.size,
          shape: this.shape,
          area: {
            width: this.globalWidth,
            height: this.globalHeight
          }
        })
        boom.init()
        this.booms.push(boom)
        this.running || this.run()
      },

      handlePageHide() {
        this.booms = []
        this.running = false
      },

      run() {
        this.running = true
        if (this.booms.length == 0) {
          return this.running = false
        }

        requestAnimationFrame(this.run)

        this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
        this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight)

        this.booms.forEach((boom, index) => {
          if (boom.stop) {
            delete this.booms.splice(index, 1)
            return
          }
          boom.move()
          boom.draw()
        })
        this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
      }
    }
  }
</script>
