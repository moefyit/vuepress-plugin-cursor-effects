<template>
  <canvas id="vuepress-canvas-cursor"></canvas>
</template>

<script>
import { Popper } from '@moefy-canvas/theme-popper'

export default {
  name: 'CursorEffects',
  data() {
    return {
      popper: new Popper(
        {
          shape: EFFECTS_SHAPE,
          size: EFFECTS_SIZE,
        },
        { opacity: 1, zIndex: EFFECTS_Z_INDEX }
      ),
    }
  },
  mounted() {
    this.popper.mount(this.$el)
  },

  beforeDestroy() {
    this.popper.unmount()
  },
}
</script>
