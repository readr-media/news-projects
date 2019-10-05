<template>
  <div class="data-selector">
    <div class="selector-container">
      <div class="selector__heading">
        <p>候選人</p>
        <button @click="selectCandidate()">都看</button>
      </div>
      <div class="selector__options">
        <button
          :class="{ active: candidate === '蔡英文' }"
          @click="selectCandidate('蔡英文')"
        >
          蔡英文
        </button>
        <button
          :class="{ active: candidate === '韓國瑜' }"
          @click="selectCandidate('韓國瑜')"
        >
          韓國瑜
        </button>
      </div>
    </div>
    <div class="selector-container">
      <div class="selector__heading">
        <p>真的假的</p>
        <button @click="selectAuthenticity()">都看</button>
      </div>
      <div class="selector__options authenticity">
        <button
          :class="{ active: authenticity === '真實' }"
          @click="selectAuthenticity('真實')"
        >
          <span class="real">正確</span>
        </button>
        <button
          :class="{ active: authenticity === '含有錯誤訊息' }"
          @click="selectAuthenticity('含有錯誤訊息')"
        >
          <span class="wrong">含有錯誤訊息</span>
        </button>
        <button
          :class="{ active: authenticity === '片面事實' }"
          @click="selectAuthenticity('片面事實')"
        >
          <span class="controversial">片面事實</span>
        </button>
      </div>
      <div class="selector__legend">
        <button @click="showLegend = !showLegend">差別在哪？</button>
        <ul v-show="showLegend">
          <li>正確：內容皆為事實</li>
          <li>含有錯誤訊息：內容含有不實訊息</li>
          <li>片面事實：內容無誤，但隱匿部分關鍵事實</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

import { throttle } from 'lodash'

export default {
  name: 'DisinformationDataSelector',
  props: {
    authenticity: {
      type: String,
      required: true
    },
    candidate: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showLegend: false
    }
  },
  computed: {
    viewportWidth () {
      return this.$store.state.viewport[0] || 0
    }
  },
  mounted () {
    (this.viewportWidth >= 1024) && window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll: throttle(function () {
      const viewportHeight = this.$store.state.viewport[1] || 0
      const element = document.querySelector('.d-data')
      const selector = document.querySelector('.data-selector')
      const selectorHeight = selector ? selector.clientHeight : 0
      const headerHeight = 50
      const rect = element.getBoundingClientRect()
      if (rect.bottom < selectorHeight + headerHeight + 10) {
        selector.classList.remove('fixed')
        selector.classList.add('fixed-bottom')
      } else if (rect.top < headerHeight + 10) {
        selector.classList.remove('fixed-bottom')
        selector.classList.add('fixed')
      } else {
        selector.classList.remove('fixed')
        selector.classList.remove('fixed-bottom')
      }
    }, 100),
    selectCandidate (value = '') {
      this.candidate !== value ? this.sendGaClickEvent(value ? `篩選「${value}」` : '候選人全部') : ''
      this.candidate === value ? this.$emit('update:candidate', '') : this.$emit('update:candidate', value)
    },
    selectAuthenticity (value = '') {
      this.authenticity !== value ? this.sendGaClickEvent(value ? `篩選「${value}」` : '查核狀態全部') : ''
      this.authenticity === value ? this.$emit('update:authenticity', '') : this.$emit('update:authenticity', value)
    },
    sendGaClickEvent (label) {
      window.ga && window.ga('send', 'event', 'projects', 'click', label, { nonInteraction: false })
    }
  }
}
</script>
<style lang="stylus" scoped>

.selector-container
  padding 15px 10px
  background-color rgba(255, 255, 255, .1)
  border-radius 4px
  & + .selector-container
    margin-top 5px
  button
    cursor pointer
.selector
  &__heading
    display flex
    justify-content space-between
    align-items center
    p
      margin-left 5px
    button
      padding-right 5px
      color #e56300
      font-size .875rem
  &__options
    display flex
    flex-wrap wrap
    margin-top 10px
    button
      display flex
      align-items center
      margin 10px 5px 0
      padding .2em 1em
      color #fff
      text-align center
      line-height 28px
      background-color rgba(155, 155, 155, .5)
      border-radius 4px
      transition background-color .5s
      &.active
        background-color #e56300
        span
          &.real
            &::before
              background-image url(/proj-assets/fact-check/real_selected.png)
          &.wrong
            &::before
              background-image url(/proj-assets/fact-check/wrong_selected.png)
          &.controversial
            &::before
              background-image url(/proj-assets/fact-check/controversial_selected.png)
      span
        display flex
        align-items center
        &::before
          content ''
          display inline-block
          width 28px
          height 28px
          margin-right .2em
          background-position center center
          background-size contain
          background-repeat no-repeat
        &.real
          &::before
            background-image url(/proj-assets/fact-check/real.png)
        &.wrong
          &::before
            background-image url(/proj-assets/fact-check/wrong.png)
        &.controversial
          &::before
            background-image url(/proj-assets/fact-check/controversial.png)
    &.authenticity
      button
        padding .2em 1em .2em .6em 
  &__legend
    margin-top 20px
    button
      color #9b9b9b
      text-decoration underline
      background-color transparent
      border none
    ul
      margin 10px 0 0
      padding 0 0 0 2em
      color #9b9b9b
      font-size .875rem
      line-height 1.4

@media (min-width: 1024px)
  .data-selector
    &.fixed
      position fixed !important
      top 60px !important
      left calc((100% - 1140px) / 2) !important
    &.fixed-bottom
      position absolute !important
      top auto !important
      bottom 0 !important

  .selector
    &__options
      button
        &:hover
          background-color #e56300
          span
            &.real
              &::before
                background-image url(/proj-assets/fact-check/real_selected.png)
            &.wrong
              &::before
                background-image url(/proj-assets/fact-check/wrong_selected.png)
            &.controversial
              &::before
                background-image url(/proj-assets/fact-check/controversial_selected.png)
</style>
