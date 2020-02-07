<template>
  <section class="popup-info" v-show="isShow">
    <svg v-if="isLoading" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50"><path fill="#fff" d="M25.25 6.46c-10.318 0-18.683 8.365-18.683 18.683h4.068a14.62 14.62 0 0 1 14.615-14.615V6.46z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg>
    <div v-else>
      <p class="popup-info__question">{{ infoData.question }}</p>
      <div class="popup-info__options">
        <button type="button" @click="chooseOptionA">{{ infoData.optionA }}</button>
        <button type="button" @click="chooseOptionB">{{ infoData.optionB }}</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PopupInfo',
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    infoData: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    chooseOptionA () {
      switch (this.infoData.status) {
        case 'opening':
          this.$parent.getCurrentPosition()
          break
        case 'search error':
          this.focusAddressInput()
          break
        case 'position error':
          this.focusAddressInput()
          break
      }
    },
    chooseOptionB () {
      switch (this.infoData.status) {
        case 'opening':
          this.focusAddressInput()
          break
        case 'search error':
          this.$parent.getCurrentPosition()
          break
        case 'position error':
          this.$parent.getCurrentPosition()
          break
      }
    },
    focusAddressInput () {
      this.$emit('closeInfo')
      document.getElementById('address-input').focus()
    }
  }
}
</script>

<style lang="stylus">
.popup-info
  height 100%
  width 100%
  position absolute
  top 0
  left 0
  display flex
  justify-content center
  align-items center
  padding-left 10px
  padding-right 10px
  font-size 1.7rem
  z-index 99
  font-weight 700
  background-color rgba(#000, 0.75)
  & > div
    width 100%
  &__question
    background-color #fff
    border-radius 4px
    border solid 2px #000
    margin-bottom 2px
    height 70px
    display flex
    align-items center
    justify-content center
  &__options
    display flex
    justify-content space-between
    & button
      padding 0
      border-radius 4px
      border solid 2px #000000
      width calc(50% - 2px)
      height 44px
      display flex
      justify-content center
      font-weight 700
      align-items center
      color rgba(0, 0, 0, 0.87)
      cursor pointer
      outline 0
      user-select none
      &:first-child
        background-color #f5a623
        &:active
          background-color #d98c0f
      &:last-child
        background-color #9b9b9b
        &:active
          background-color #4a4a4a
</style>
