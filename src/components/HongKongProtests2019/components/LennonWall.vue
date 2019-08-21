<template>
  <div class="lw">
    <div class="horizontal-scroll-wrapper" @scroll="handleScroll">
      <div class="lw__list">
        <div class="landing">
          <div class="message">
            <h1>香港民運</h1>
          </div>
          <div class="message">
            <h2>這裡可以放副標</h2>
          </div>
          <div class="message">
            <p>立語的正的想確土你第過交行？活中他名位所少，且教臺不才快走間理！傳得許成意用地才。</p>
          </div>
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
    })
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
  padding 80px 10px 20px !important
  background-color #000
  h1, h2
    text-align center
  h1
    font-size 3rem
  h2
    font-size 2rem
  p
    font-size 1.125rem
    text-align justify
    line-height 1.6
  &__list
    display flex
    flex-wrap wrap
    flex-direction column
    width calc(100vw - 20px)
    height calc(100vh - 140px)
    margin calc(100vw - 20px) 0 0 0
  &__messages
    width calc(100vw - 20px)
  .horizontal-scroll-wrapper
    display flex
    flex-wrap wrap
    justify-content flex-end
    width calc(100vh - 100px)
    height calc(100vw - 20px)
    transform rotate(-90deg) translateY(calc(-100vh + 100px))
    transform-origin right top
    overflow-y auto
    overflow-x hidden
    > div
      transform rotate(90deg)
      transform-origin right top
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

@media (min-width: 768px)
  .lw
    padding 100px 20px 50px !important
    .horizontal-scroll-wrapper
      width calc(100vh - 150px)
      transform rotate(-90deg) translateY(calc(-100vh + 150px))
    &__list
      height calc(100vh - 150px)
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
      margin 100% 0 0
    .landing
      .message
        width 620px
</style>
