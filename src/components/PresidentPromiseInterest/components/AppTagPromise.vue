<template>
  <div :class="[ 'app-tag-promise', `app-tag-promise--${tagType}` ]" v-text="wording"></div>
</template>

<script>
export default {
  props: {
    tagType: {
      type: String,
      default: 'success'
    }
  },
  computed: {
    wording () {
      return this.tagType === 'success' ? '已完成' : '卡關中'
    }
  }  
}
</script>

<style lang="stylus" scoped>
.app-tag-promise
  width 90px
  height 30px
  border-radius 15px
  border solid 2px #ffc1a9
  font-size 18px
  font-weight 900
  line-height 1.89
  text-align center
  display flex
  justify-content center
  align-items center
  &--stuck
    color #b2dbd5
    background-color #1f464f
  &--success
    color #1f464f
    background-color #ffc1a9
  
@media (max-width 425px)
  .app-tag-promise
    width 76px
    font-size 16px
</style>

