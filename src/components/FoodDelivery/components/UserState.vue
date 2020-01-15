<template>
  <div class="the-user">
    <div class="the-user__state" ref="userState"></div>
    <picture>
      <source type="image/webp" srcset="/proj-assets/food-delivery/img/driver.webp">
      <img src="/proj-assets/food-delivery/img/driver.png" alt="" loading="lazy">
    </picture>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('FoodDelivery')

export default {
  name: 'UserState',
  data () {
    return {
      stateTl: null
    }
  },
  computed: {
    ...mapState([
      'userState'
    ])
  },
  methods: {
    typingBack () {
      // 1.25 / 2 = 0.625
      this.stateTl.timeScale(3).reverse()
    },
    typing () {
      this.stateTl = gsap.timeline()
      this.stateTl.to(this.$refs.userState, {
        text: this.userState,
        duration: 1.25,
        ease: 'power1.out',
        onReverseComplete: () => { this.typing() }
      })
      return this.stateTl
    },
    setState () {
      gsap.set(this.$refs.userState, {
        text: this.userState
      })
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'

.the-user
  display flex
  align-items center
  justify-content center
  position relative
  height 84px
  // ((50 / 2) + 24 + 88) * 2
  max-width 274px
  margin-left auto
  margin-right auto
  @media (min-width $mobile)
    height 120px
    // ((70 / 2) + 24 + 113) * 2
    max-width 344px
  &__state
    position absolute
    color #fff
    text-align right
    font-size 1.4rem
    line-height normal
    left 0
    max-width 88px
    width 100%
    @media (min-width $mobile)
      font-size 1.8rem
      max-width 113px
  & picture
    display block
  & img
    width 50px
    border-radius 50%
    @media (min-width $mobile)
      width 70px
</style>