<template>
  <div class="foreword">
    <div class="foreword__nav">
      <p>專題前言</p>
      <button @click="showAll">看完整前言</button>
    </div>
    <div class="foreword__text">
      <p></p>
    </div>
    <div class="foreword__action">
      <button>相片 / 影片</button>
      <button>標註朋友</button>
      <button>感受 / 活動</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FakeNewsForeword',
  props: {
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      instance: undefined
    }
  },
  mounted () {
    this.autoPlay ? this.type() : ''
  },
  methods: {
    type () {
      this.instance = new TypeIt('.foreword__text > p', {
        strings: '假訊息問題嚴重，但解決方案很容易牴觸言論自由，人權與自由之間該如何權衡？READr 想和你一起從各個面向探索假訊息與它們的產地。'
      }).go()
    },
    showAll () {
      this.instance.pause()
      document.querySelector('.foreword__text > p').innerHTML = '假訊息問題嚴重，但解決方案很容易牴觸言論自由，人權與自由之間該如何權衡？READr 想和你一起從各個面向探索假訊息與它們的產地。'
    }
  }
}
</script>
<style lang="stylus" scoped>
.foreword
  background-color #fff
  border 1px solid #dddfe2
  border-left none
  border-right none
  > div
    padding .5em
  &__nav
    display flex
    background-color #f5f6f7
    border-bottom 1px solid #dddfe2
    > p
      color #4a4a4a
    > button
      margin 0 0 0 auto
      color #032669
      padding 0
  &__text
    min-height 120px
    background-color #fff
  &__action
    width calc(100% - 1em)
    margin 0 auto
    padding .4em 0 !important
    background-color #fff
    border-top 1px solid #dddfe2
    button
      padding .9em
      color #9b9b9b
      background-color #f5f6f7
      border-radius 18px
      cursor default
      outline none
      & + button
        margin-left 10px

@media (min-width: 1024px)
  .foreword
    border-left 1px solid #dddfe2
    border-right 1px solid #dddfe2
    border-radius 4px

</style>
