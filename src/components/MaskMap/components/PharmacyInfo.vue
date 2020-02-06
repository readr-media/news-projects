<template>
  <section class="pharmacy-info" v-show="isShow">
    <h2>{{ infoData.name || dataStatus }}</h2>
    <p>{{ infoData.tel || dataStatus }}</p>
    <p>{{ infoData.add || dataStatus }}</p>
    <div class="pharmacy-info__divider" />
    <ul>
      <li>成人口罩數量：{{ infoData.adult || dataStatus }}</li>
      <li>兒童口罩數量：{{ infoData.child || dataStatus }}</li>
    </ul>
    <p class="pharmacy-info__update-time">{{ infoData.update || dataStatus }} 更新</p>
    <svg @click="$emit('closeInfo')" class="pharmacy-info__close" height="14" viewBox="0 0 14 14" width="14" xmlns="http://www.w3.org/2000/svg"><path d="m310 13.4-1.4-1.4-5.6 5.6-5.6-5.6-1.4 1.4 5.6 5.6-5.6 5.6 1.4 1.4 5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z" fill="rgba(0, 0, 0, 0.87)" fill-rule="evenodd" transform="translate(-296 -12)"/></svg>
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
        // id: '',
        name: '',
        tel: '',
        add: '',
        adult: '',
        child: '',
        update: ''
      })
    }
  },
  computed: {
    dataStatus () {
      const { status } = this.infoData
      switch (status) {
        case 'N':
          return '無資料'
        default:
          return '取得資料中⋯'
      }
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
  & ul
    color rgba(0, 0, 0, 0.66)
    padding-left 24px
    list-style-type disc
    & li
      margin-bottom 8px
    // & li + li
    //   margin-top 8px
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
