<template>
  <canvas id="vuepress-canvas-cursor"></canvas>
</template>

<script>
  import { Boom } from "./boom.js"
  export default {
    name: "CursorEffects",
    data() {
      return {
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

        window.addEventListener('mousedown', this.handleMouseDown.bind(this))
        window.addEventListener('pagehide', this.handlePageHide.bind(this))
      },

      setStyle(style) {
        style.position = 'fixed'
        style.top = 0
        style.left = 0
        style.zIndex = '99999999'
        style.pointerEvents = 'none'
        style.width = this.globalWidth
        style.height = this.globalHeight
      },

      handleMouseDown(e) {
        const boom = new Boom({
          origin: { x: e.clientX, y: e.clientY },
          context: this.computerContext,
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

        requestAnimationFrame(this.run.bind(this))

        this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
        this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight)

        this.booms.forEach((boom, index) => {
          if (boom.stop) {
            return this.booms.splice(index, 1)
          }
          boom.move()
          boom.draw()
        })
        this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
      }
    }
  }
</script>
