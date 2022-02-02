const { resolve } = require('path')

module.exports = (options = {}, context) => ({
  define() {
    const { size = 2, shape = 'star', zIndex = 999999999 } = options

    return {
      EFFECTS_SIZE: size,
      EFFECTS_SHAPE: shape,
      EFFECTS_Z_INDEX: zIndex,
    }
  },

  enhanceAppFiles: resolve(__dirname, './lib/enhanceAppFile.js'),
  globalUIComponents: 'CursorEffects',
})
