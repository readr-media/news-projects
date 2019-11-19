<template>
  <svg viewBox="0 0 71 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <circle id="b" cx="35.556" cy="37.333" r="23.111" />
      <filter x="-8.7%" y="-4.3%" width="117.3%" height="117.3%" filterUnits="objectBoundingBox" id="a">
        <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1" />
      </filter>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <path
        class="marker-color"
        d="M35.306 0C15.807 0 0 15.751 0 35.181c0 12.954 11.769 34.412 35.306 64.375C58.843 69.593 70.612 48.135 70.612 35.18 70.612 15.751 54.805 0 35.306 0z"
        fill-rule="nonzero" />
      <g fill-rule="nonzero">
        <use fill="#000" filter="url(#a)" xlink:href="#b" />
        <use fill="#FFF" xlink:href="#b" />
      </g>
      <text font-size="30" fill="#4A4A4A">
        <tspan x="26" y="48">{{ num }}</tspan>
      </text>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'MapMarker',
  props: [ 'num' ]
}
</script>

<style lang="stylus">
@import '../util/global.styl'
// todo transition
.marker-color
  fill #9b9b9b
  transition fill 0.45s $easeOutCirc
</style>