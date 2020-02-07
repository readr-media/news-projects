<template>
  <transition name="slide">
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
      <div class="pharmacy-info__loading" v-show="isLoading">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50"><path fill="#fff" d="M25.25 6.46c-10.318 0-18.683 8.365-18.683 18.683h4.068a14.62 14.62 0 0 1 14.615-14.615V6.46z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/></path></svg>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'PharmacyInfo',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    },
    infoData: {
      type: Object,
      default: () => ({
        name: '',
        tel: '',
        add: '',
        adult: '',
        child: '',
        update: ''
      })
    },
    infoDataStatus: {
      type: String,
      default: 'U'
    }
  },
  computed: {
    dataStatus () {
      switch (this.infoDataStatus) {
        case 'N':
          return '無資料'
        default:
          return '⋯'
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
  &__update-time
    text-align right
    color rgba(0, 0, 0, 0.66)
    font-size 1.3rem
  &__close
    position absolute
    top 2px
    right 2px
    padding 8px
    box-sizing content-box
    cursor pointer
  &__loading
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    background-color rgba(#000, 0.5)
    display flex
    justify-content center
    align-items center
</style>
