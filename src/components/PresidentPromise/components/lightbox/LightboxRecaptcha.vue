<template>
  <div class="lightbox-recaptcha">
    <vue-recaptcha :sitekey="sitekey" @verify="onVerify" size="invisible">
      <button :class="[ 'validate-button', { 'validate-button--alert': alert } ]">
        <div class="validate-button__check-icon" v-show="isHuman"></div>
      </button>
    </vue-recaptcha>
    <p class="lightbox-recaptcha__hint">我不是機器人</p>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
import { GOOGLE_RECAPTCHA_SITE_KEY, } from 'api/config'

export default {
  props: {
    isHuman: {
      type: Boolean,
      required: true,
    },
    alert: {
      type: Boolean,
      default: false
    },
  },
  components: {
    VueRecaptcha,
  },
  data () {
    return {
      sitekey: GOOGLE_RECAPTCHA_SITE_KEY
      // sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    }
  },
  methods: {
    onVerify (response) {
      this.$emit('update:isHuman', true)
    },
  }
}
</script>

<style lang="stylus" scoped>
.lightbox-recaptcha
  margin 42px 0 0 0
  display flex
  justify-content center
  align-items center
  &__hint
    margin 0 0 0 17px
    font-size 22px
    line-height 1.09
    color #b5b5b5
.validate-button
  side = 30px
  width side
  height side
  border-radius 5px
  background-color transparent
  border solid 2px #b5b5b5
  cursor pointer
  // display flex
  // justify-content center
  // align-items center
  padding 0
  &:focus
    outline none
  &--alert
    outline 1px solid red
  &__check-icon
    width (side / 1.8)
    height (side / 1.8)
    background-color #b5b5b5
    transition background-color .15s
    transform rotate(45deg)
    clip-path polygon(85% 0, 100% 0, 100% 100%, 43% 100%, 43% 85%, 85% 85%)
    position relative
    bottom 3px
    right 1px
    margin auto

@media (max-width 425px)
  .lightbox-recaptcha
    margin 36px 0 0 0
    &__hint
      margin 0 0 0 11px
</style>


