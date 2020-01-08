<template>
  <div class="news-ticker">
    <template v-for="tickerIndex in 2">
      <div
        :key="`news-ticker-${tickerIndex}`"
        class="news-ticker-item"
      >
        <div class="news-ticker__decor" />
        <div
          v-if="news.length > tickerIndex - 1"
          class="news-ticker__news"
          :class="{ isTransiting: isTransiting }"
          :style="{ transform: `translateY(${slideIndex * -100 / 3}%)` }"
          @transitionend="tickerIndex === 1 ? handleTransitionEnd() : ''"
          @oTransitionEnd="tickerIndex === 1 ? handleTransitionEnd() : ''"
          @webkitTransitionEnd="tickerIndex === 1 ? handleTransitionEnd() : ''"
        >
          <span
            v-for="index in 3"
            :key="`news-${tickerIndex}-${index}-${(new Date()).valueOf}`"
          >
            {{ news[getItemIndex(index + tickerIndex - 1)].zone }} {{ news[getItemIndex(index + tickerIndex - 1)].name }}（{{ news[getItemIndex(index + tickerIndex - 1)].party }}）以 {{ news[getItemIndex(index + tickerIndex - 1)].tks | comma }} 票{{ news[getItemIndex(index + tickerIndex - 1)].isElected ? '確定當選' : '暫時領先' }}。
          </span>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { setInterval } from 'timers'
export default {
  name: 'NewsTicker',
  filters: {
    comma (value) {
      return value ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : ''
    } 
  },
  props: {
    news: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      current: 0,
      isTransiting: false,
      slideIndex: 0,
    }
  },
  mounted () {
    this.autoSlide()
  },
  methods: {
    getItemIndex (index) {
      const calcIndex = this.current + index - 1
      if (calcIndex > this.news.length - 1) {
        return calcIndex - this.news.length
      }
      return calcIndex
    },
    autoSlide () {
      setTimeout(() => {
        this.isTransiting = true
        if (this.slideIndex + 1 > 2) {
          this.slideIndex = 0
        } else {
          this.slideIndex += 1
        }
        this.autoSlide()
      }, 5000)
    },
    handleTransitionEnd () {
      this.isTransiting = false
      this.slideIndex -= 1
      if (this.current + 1 > this.news.length - 1) {
        this.current = 0
      } else {
        this.current += 1
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.news-ticker
  &-item
    display flex
    align-items center
    height calc((.9375rem * 1.87 * 2) + 32px)
    padding 0 10px
    color rgba(255, 255, 255, .87)
    border-bottom 2px solid #fff
    overflow hidden
  &__decor
    width 16px
    height 16px
    background-color #fff
  &__news
    flex 1
    align-self flex-start
    margin-left 14px
    &.isTransiting
      transition transform 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95)
    span
      display inline-flex
      align-items center
      width 100%
      height calc((.9375rem * 1.87 * 2) + 32px)
      font-size .9375rem
      font-weight 600
      line-height 1.87

@media (min-width: 1024px)
  .news-ticker
    &-item
      height 64px
      &:nth-child(2)
        border none
    &__news
      span
        height 64px
</style>