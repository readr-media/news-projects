<template>
  <figure>
    <h1 v-if="title !== ''" v-text="title" />
    <h2 v-if="subtitle !== ''" v-text="subtitle" />
    <picture>
      <source
        media="(max-width: 768px)"
        :srcset="`/proj-assets/unitedfront/charts/mobile/${name}.png`"
      >
      <img
        :src="`/proj-assets/unitedfront/charts/${name}.png`"
        alt=""
        @load="handleImgLoad"
      >
    </picture>
    <figcaption
      v-if="figcaption !== null"
      :class="{
        center: figcaption.length < 10
      }"
    >
      <span v-text="figcaption" />（<a v-if="showSurveyLink" href="https://docs.google.com/spreadsheets/d/1uBpeRIdYdjJOvMmeA9BiHqflP-DPBY1TZU0ZAFZnsDk" target="_blank" rel="noopener noreferrer">看原始問卷</a>）
    </figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    figcaption: {
      type: String,
      default: null
    },
    showSurveyLink: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleImgLoad() {
      this.$emit('load')
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
    font-weight 500
    line-height 1.25
    margin 10px 0 0 0
  h2
    color #4a4a4a
    font-size 14px
    font-weight normal
    margin 10px 0
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
