<template>
  <div class="intro-info" v-show="isShow">
    <div>
      <h1>即時口罩存量<br>查詢地圖</h1>
      <p>因應新型冠狀病毒（武漢肺炎）疫情，從 2 月 6 日起，口罩採實名制購買，民眾得依照身分證／居留證號尾數在指定日期，攜帶健保卡前往藥局購買，一人 7 天只能購買 2 片（共 10 元），可代買一份，但被代買者的證件號尾數也要符合日期規則。</p>
      <p>提醒您，台灣尚未進入社區感染，中央流行疫情指揮中心多次提醒，僅有有發燒或呼吸道症狀者、慢性病患者、出入通風不良密閉場所者需要戴口罩。請將資源留給需要的人。</p>
      <p class="intro-info__credit">設計：weiweihsu&nbsp;&nbsp;工程：林昱帆</p>
      <button type="button" @click="isShow = false">我瞭解了</button>
    </div>
  </div>
</template>

<script>
import Cookie from 'vue-cookie'

export default {
  name: 'IntroInfo',
  beforeMount () {
    this.getIntroCookie()
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    getIntroCookie () {
      const hasCookie = Cookie.get('mm-intro')
      if (!hasCookie) {
        this.isShow = true
        Cookie.set('mm-intro', true, { expires: '4M' })
      }
    }
  }
}
</script>

<style lang="stylus">
.intro-info
  position absolute
  background-color rgba(0, 0, 0, 0.87)
  width 100%
  min-height 100%
  top 0
  left 0
  z-index 199
  padding 30px 10px
  font-size 1.5rem
  color rgba(255, 255, 255, 0.87)
  line-height 2
  display flex
  justify-content center
  align-items center
  & h1
    font-weight 700
    color #f5a623
    text-align center
    line-height 1.37
    font-size 3.8rem
    margin-bottom 20px
  & p + p
    margin-top 8px
  &__credit
    font-size 1.3rem
    text-align center
    margin-bottom 14px
  & button
    border-radius 4px
    background-color #f5a623
    font-weight 700
    color rgba(0, 0, 0, 0.87)
    width 100%
    height 44px
    border none
    cursor pointer
    outline 0
    &:active
      background-color #d98c0f
</style>
