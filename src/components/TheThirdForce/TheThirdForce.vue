<template>
  <div class="the-third-force">
    <HomeCover />
    <ReportList />
    <DonateItem />
    <TheSubscr />
    <footer>© 2020 READr All Rights Reserved</footer>
  </div>
</template>

<script>
import HomeCover from './components/HomeCover.vue'
import ReportList from './components/ReportList.vue'
import DonateItem from './components/DonateItem.vue'
import TheSubscr from './components/TheSubscr.vue'

export default {
  metaInfo: {
    title: '',
    description: '',
    metaUrl: 'the-third-force',
    metaImage: 'the-third-force/img/og.jpg',
    customScript: ''
  },
  components: {
    HomeCover,
    ReportList,
    DonateItem,
    TheSubscr
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus">
@import './util/reset.css'

html
  font-size 10px
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif
body
  background-color #fff
img
  height auto
.the-third-force
  overflow hidden
footer
  background-color rgba(0, 0, 0, 0.87)
  font-size 1.4rem
  line-height 1.86
  text-align center
  color #fff
  padding 18px 15px
// picture
//   display block
</style>
