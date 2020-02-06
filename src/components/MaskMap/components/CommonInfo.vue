<template>
  <section class="common-info">
    <div v-if="isShow" class="common-info__long">
      <h2>{{ today }}</h2>
      <p>今日身分證／居留證號尾數為<span class="common-info__highlight">雙數</span>可購買</p>
      <div class="common-info__divider" />
      <ul>
        <li>星期一、三、五：身分證／居留證號尾數為單數者可購買</li>
        <li>星期二、四、六：身分證／居留證號尾數為雙數者可購買</li>
        <li>星期日皆可購買</li>
        <li>購買後 7 日才可再次購買</li>
      </ul>
      <svg @click="toggleInfo" class="common-info__close" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m310 13.4-1.4-1.4-5.6 5.6-5.6-5.6-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z" fill="#fff" fill-rule="evenodd" transform="translate(-296 -12)"/></svg>
    </div>
    <div v-else class="common-info__short" @click="toggleInfo">
      <p v-html="shortInfo"></p>
      <svg height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="m301 27.299c-.716 0-1.3-.58-1.3-1.299 0-.717.584-1.299 1.3-1.299.717 0 1.3.582 1.3 1.299 0 .719-.583 1.299-1.3 1.299zm-1.001-10.299h2v5.999h-2zm4.729-4h-7.457l-5.271 5.272v7.456l5.271 5.271h7.457l5.273-5.271v-7.456z" fill="#fff" fill-rule="evenodd" transform="translate(-292 -13)"/></svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CommonInfo',
  data () {
    return {
      isShow: false,
      weekdays: [ '日', '一', '二', '三', '四', '五', '六' ]
    }
  },
  computed: {
    weekday () {
      const now = new Date()
      return this.weekdays[ now.getDay() ]
    },
    today () {
      const now = new Date()
      const month = now.getMonth() + 1
      const day = now.getDate()
      return `${month} 月 ${day} 日 星期${this.weekday}`
    },
    shortInfo () {
      if (this.weekday !== '日') {
        const isOdd = (this.weekday === '一' || this.weekday === '三' || this.weekday === '五')
        return `今日身分證／居留證號尾數為<span class="common-info__highlight">${isOdd ? '單數' : '雙數'}</span>者可購買`
      } else {
        return `今日身分證／居留證號尾數<span class="common-info__highlight">無論單雙</span>皆可購買`
      }
    }
  },
  methods: {
    toggleInfo () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="stylus">
.common-info
  background-color rgba(0, 0, 0, 0.87)
  position absolute
  left 0
  bottom 0
  width 100%
  color #fff
  font-size 1.5rem
  line-height normal
  &__short
    display flex
    padding 12px 10px
    justify-content space-between
    align-items center
    cursor pointer
    user-select none
    & > *
      flex 0 0 auto
  &__long
    padding 16px 10px 23px 10px
  & h2
    font-size 2.1rem
    font-weight 700
    margin-bottom 14px
  &__highlight
    font-weight 700
    color #f5a623
  &__divider
    border solid 1px rgba(255, 255, 255, 0.5)
    margin-top 16px
    margin-bottom 16px
  & ul
    font-size 1.3rem
    color rgba(255, 255, 255, 0.87)
    padding-left 24px
    list-style-type disc
    & li + li
      margin-top 8px
  &__close
    position absolute
    top 0
    right 0
    padding 10px 10px 6px 6px
    box-sizing content-box
    // top 10px
    // right 10px
    cursor pointer
    user-select none
</style>
