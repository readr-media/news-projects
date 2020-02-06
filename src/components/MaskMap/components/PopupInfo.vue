<template>
  <section class="popup-info" v-show="isShow">
    <div>
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
    }
  },
  methods: {
    chooseOptionA () {
      this.closeInfo()
      switch (this.infoData.status) {
        case 'opening':
          this.$parent.getCurrentPosition()
          break
        case 'search error':
          document.getElementById('address-input').focus()
          break
      }
    },
    chooseOptionB () {
      this.closeInfo()
      switch (this.infoData.status) {
        case 'opening':
          document.getElementById('address-input').focus()
          break
        case 'search error':
          this.$parent.getCurrentPosition()
          break
      }
    },
    closeInfo () {
      this.$emit('closeInfo')
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
