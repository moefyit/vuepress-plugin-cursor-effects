# vuepress-plugin-cursor-effects <GitHubLink repo="moefyit/vuepress-plugin-cursor-effects"/>

:tada: Add a cute click effect to your mouse in your vuepress!

<p align="center">
   <a href="https://www.npmjs.com/package/vuepress-plugin-cursor-effects" target="_blank"><img alt="npm" src="https://img.shields.io/npm/v/vuepress-plugin-cursor-effects.svg"></a>
   <a href="https://github.com/moefyit/vuepress-plugin-cursor-effects/stargazers" target="_blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/moefyit/vuepress-plugin-cursor-effects"></a>
   <a href="https://www.npmjs.com/package/vuepress-plugin-cursor-effects" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dt/vuepress-plugin-cursor-effects.svg"></a>
   <a href="https://www.npmjs.com/package/vuepress-plugin-cursor-effects" target="_blank"><img alt="downloads" src="https://img.shields.io/npm/dm/vuepress-plugin-cursor-effects.svg"></a>
   <a href="https://github.com/moefyit/vuepress-plugin-cursor-effects/blob/main/LICENSE" target="_blank"><img alt="GitHub license" src="https://img.shields.io/github/license/moefyit/vuepress-plugin-cursor-effects"></a>
</p>

-  Document: [moefy-vuepress](https://moefyit.github.io/moefy-vuepress/)
-  Live demo: [notev](https://nyakku.moe/)

> Want to use it outside of VuePress1.x? Try [moefy-canvas](https://github.com/moefyit/moefy-canvas)!

## Install

```bash
yarn add vuepress-plugin-cursor-effects -D
# or use npm
npm i vuepress-plugin-cursor-effects -D
```

## Usage

```javascript
module.exports = {
   plugins: ['cursor-effects'],
}
```

## Options

```js
module.exports = {
   plugins: [
      [
         'cursor-effects',
         {
            size: 2, // size of the particle, default: 2
            shape: ['star' | 'circle'], // shape of the particle, default: 'star'
            zIndex: 999999999, // z-index property of the canvas, default: 999999999
         },
      ],
   ],
}
```

## Thanks

-  [hexo-theme-sagiri](https://github.com/DIYgod/diygod.me/blob/master/themes/sagiri/src/cursor-effects.js)
