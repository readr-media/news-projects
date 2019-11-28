<template>
  <figure>
    <!-- <h1 v-text="'test title'" /> -->
    <img :src="src" alt="">
    <figcaption
      v-if="figcaption !== null"
      :class="{
        center: figcaption.length < 10
      }"
    >
      <span v-text="figcaption" />（<a v-if="showSurveyLink" href="http://www.google.com" target="_blank" rel="noopener noreferrer">看原始問卷</a>）
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    figcaption: {
      type: String,
      default: null
    },
    showSurveyLink: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
figure
  margin 0
  display flex
  flex-direction column
  align-items center
  h1
    color #4a4a4a
    font-size 21px
    margin 0
  img
    display block
    width 100%
    background-color white
    // margin 10px 0 0 0
  a
    color #1061C0
  figcaption
    margin 10px 0 0 0
    color #4a4a4a
    font-size 14px
    line-height 1.5
    width 80%
    text-align justify
    &.center
      text-align center
</style>
