<template>
  <section class="pharmacy-info" v-show="isShow">
    <h2>{{ infoData.name }}</h2>
    <p>{{ infoData.tel }}</p>
    <p>{{ infoData.add }}</p>
    <div class="pharmacy-info__divider" />
    <p class="pharmacy-info__mask-total">• 成人口罩數量：{{ infoData.adult }}</p>
    <p class="pharmacy-info__mask-total">• 兒童口罩數量：{{ infoData.child }}</p>
    <p class="pharmacy-info__update-time">{{ infoData.update }}</p>
    <svg @click="$emit('close')" class="pharmacy-info__close" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m310 13.4-1.4-1.4-5.6 5.6-5.6-5.6-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z" fill="rgba(0, 0, 0, 0.87)" fill-rule="evenodd" transform="translate(-296 -12)"/></svg>
  </section>
</template>

<script>
export default {
  name: 'PharmacyInfo',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    infoData: {
      type: Object,
      default: () => ({
        id: '',
        name: '',
        tel: '',
        add: '',
        adult: '',
        child: '',
        update: ''
      })
    }
  }
}
</script>

<style lang="stylus">
.pharmacy-info
  position absolute
  bottom 0
  left 0
  background-color #fff
  width 100%
  box-shadow 0 -2px 2px 0 rgba(0, 0, 0, 0.15)
  padding 16px 10px 58px 10px
  font-size 1.5rem
  line-height normal
  // color rgba(0, 0, 0, 0.87)
  & h2
    font-size 2.1rem
    font-weight 700
    margin-bottom 14px
  & p + p
    margin-top 8px
  &__divider
    border solid 1px rgba(0, 0, 0, 0.15)
    margin-top 16px
    margin-bottom 16px
  &__mask-total
    color rgba(0, 0, 0, 0.66)
  &__update-time
    text-align right
    color rgba(0, 0, 0, 0.66)
    font-size 1.3rem
  &__close
    position absolute
    top 10px
    right 10px
    cursor pointer
</style>
