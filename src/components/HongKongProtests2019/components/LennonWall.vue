<template>
  <div class="lw">
    <div
      class="horizontal-scroll-wrapper"
      @scroll="handleScroll">
      <div
        :class="vw > vh ? 'width' : 'height'"
        class="lw__list"
      >
        <div class="landing">
          <div class="message">
            <h1>連儂牆留言<br>撐香港</h1>
          </div>
          <div class="message foreword">
            <p>
              {{ vw >= 414 || showMoreForeword ? '連儂牆源自於捷克，從樂團披頭四成員「約翰‧藍儂」風格的塗鴉演變成愛與和平的象徵。' : '' }}
              香港的連儂牆最早在雨傘運動出現，群眾用便利貼在留下互相打氣的字眼，在反送中運動時期更在香港大街小巷遍地開花。READr 打造了一座線上連儂牆，歡迎留下對港人想說的話。
            </p>
          </div>
          <p class="credit">
            <span>文／劉子維、曾芷筠</span><span>設計／Weiwei Hsu</span><br>
            工程／HY Tan、熊凱文<br>
            攝影／楊子磊、林俊耀、陳毅偉<br>
            監製／簡信昌、Tin Chen、李又如
          </p>
        </div>
        <div class="messages">
          <LennonWallMessage
            v-for="item in messages"
            :key="item[3]"
            :message="item"
            class="message"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LennonWallMessage from './LennonWallMessage.vue'
import viewportMixin from '../mixins/viewport'
import { createNamespacedHelpers } from 'vuex'
import { throttle } from 'lodash'

const LIMIT = 20
const { mapState, mapActions } = createNamespacedHelpers('HongKongProtests')

export default {
  name: 'LennonWall',
  components: {
    LennonWallMessage
  },
  mixins: [
    viewportMixin
  ],
  data () {
    return {
      hasMoreMessage: true,
      loading: false,
      page: 1
    }
  },
  serverPrefetch () {
    return this.FETCH_SHEET({ stateName: 'messages', range: '連儂牆留言板!A2:C21' })
  },
  computed: {
    ...mapState({
      messages: state => state.spreadsheet.messages
    }),
    showMoreForeword () {
      return this.vw === 375 && this.vh === 812
    }
  },
  beforeMount () {
    this.FETCH_SHEET({ stateName: 'likes', range: '留言讚總數!A2:B' })
  },
  methods: {
    ...mapActions([
      'FETCH_SHEET',
      'LOAD_MORE_MESSAGES'
    ]),
    handleScroll: throttle(function (e) {
      const lastMessage = document.querySelector('.lw-message:last-child')
      if (this.hasMoreMessage && lastMessage) {
        const rect = lastMessage.getBoundingClientRect()
        if (rect.left < this.vw && !this.loading) {
          this.loading = true
          this.LOAD_MORE_MESSAGES({
            range: `連儂牆留言板!A${this.page * LIMIT + 2}:C${(this.page + 1) * LIMIT + 1}`
          })
            .then(res => {
              this.loading = false
              !Array.isArray(res) ? this.hasMoreMessage = false : this.page += 1
            })
        }
      }
      
    }, 300)
  }
}
</script>
<style lang="stylus" scoped>
.lw
  height 100vh
  background-image url(/proj-assets/hong-kong-protests-2019/bg.jpg)
  background-position center bottom
  background-repeat no-repeat
  background-size cover
  background-color #000
  h1
    text-align center
  h1
    font-size 3rem
  p
    font-size 1.125rem
    text-align justify
    line-height 1.6
  &__list
    display flex
    flex-wrap wrap
    flex-direction column
    width calc(100vw - 20px)
    height calc(100vh - 100px)
    transform rotate(90deg)
    transform-origin right top
    &.width 
      margin calc(100vh - 100px) 0 0 0
    &.height
      margin calc(100vw - 20px) 0 0 0
  &__messages
    width calc(100vw - 20px)
  .horizontal-scroll-wrapper
    display flex
    justify-content flex-end
    position fixed
    top 80px
    left 10px
    width calc(100vh - 100px)
    height calc(100vw - 20px)
    margin 0 auto 0 0
    transform rotate(-90deg) translateY(calc(-100vh + 100px))
    transform-origin right top
    overflow-y auto
    overflow-x hidden
  .landing
    display flex
    flex-direction column
    
  .messages
    display flex
    flex-wrap wrap
    flex-direction column
    height 100%
    .message
      margin-left 10px
  .message
    width calc(100vw - 20px)
    margin-bottom 20px
    padding 15px 10px
    background-color #fff
    border-radius 4px
    > *
      margin 0
  .credit
    padding-left 10px
    margin auto 0 0 0
    color #fff
    font-size 1rem
    span
      & + span
        margin-left 1em
// iPhone SE
@media (max-width: 320px)
  .lw
    h1
      font-size 2rem
    .landing
      .message
        padding 12px 8px
        margin-bottom 10px
    .foreword
      p
        font-size 1rem
    .credit
      padding-left 8px
      font-size .875rem
        
// iPhone XS, XR, XS Max
@media only screen and (device-width : 375px) and (device-height : 812px),
  (device-width: 414px) and (device-height: 896px)
  .lw
    .horizontal-scroll-wrapper
      width calc(100vh - 200px)
      transform rotate(-90deg) translateY(calc(-100vh + 200px))
    .lw__list
      height calc(100vh - 200px)
    .landing
      padding-bottom 0

@media (max-width: 767px)
  .lw
    .landing
      height calc(100vh - 100px)
      padding-bottom 55px

@media (min-width: 768px)
  .lw
    padding 100px 20px 50px !important
    .horizontal-scroll-wrapper
      top 100px
      left 20px
      width calc(100vh - 150px)
      height calc(100vw - 40px)
      transform rotate(-90deg) translateY(calc(-100vh + 150px))
    &__list
      width calc(100vw - 40px)
      height calc(100vh - 150px)
      &.width 
        margin calc(100vh - 150px) 0 0 0
      &.height
        margin calc(100vw - 40px) 0 0 0
    .landing
      .message
        width 500px
    .messages
      .message
        width 300px
        margin-left 20px

@media (min-width: 800px)
  .lw
    &__list
      width 620px
      &.width, &.height
        margin 620px 0 0 0
    .landing
      .message
        width 620px
</style>
