<template>
  <div class="the-user">
    <div class="the-user__state" ref="state"></div>
    <img src="/proj-assets/food-delivery/img/driver.png" alt="">
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('FoodDelivery')

export default {
  name: 'UserState',
  props: [ 'state' ],
  computed: {
    ...mapState([
      'userState'
    ])
  },
  data () {
    return {
      stateTl: null
    }
  },
  methods: {
    typing () {
      if (this.stateTl) {
        this.stateTl.reverse()
      }
      const state = this.state || this.userState
      this.stateTl = gsap.timeline()
      this.stateTl.to(this.$refs.state, {
        duration: 1.5,
        text: state,
        ease: 'sine.inOut'
      })
      this.stateTl.addLabel('userState')
      return this.stateTl
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
  & img
    width 50px
    border-radius 50%
    @media (min-width $mobile)
      width 70px
</style>