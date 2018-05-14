<template>
  <div :class="[ 'tag-promise-done', `tag-promise-done--${tagType}` ]" v-text="wording"></div>
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
.tag-promise-done
  width 90px
  height 30px
  border-radius 15px
  border solid 2px #b2dbd5
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
    background-color #b2dbd5
  
@media (max-width 425px)
  .tag-promise-done
    width 76px
    font-size 16px
</style>

