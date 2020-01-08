<template>
  <div class="the-third-force">
    <HomeCover ref="homeCover" />
    <ReportList ref="reportList" />
    <DonateItem />
    <TheSubscr />
    <footer ref="footer">© 2020 READr All Rights Reserved</footer>
  </div>
</template>

<script>
import { isTouchDevice } from './util/tool.js'

import HomeCover from './components/HomeCover.vue'
import ReportList from './components/ReportList.vue'
import DonateItem from './components/DonateItem.vue'
import TheSubscr from './components/TheSubscr.vue'

export default {
  metaInfo: {
    title: '第三勢力投票指南',
    description: '明年的國會選舉是有史以來最多政黨票選擇的一次！除了兩大黨民進黨、國民黨以外，剩下的 17 個政黨分別是什麼來頭？ READr 跟關鍵評論網合作，透過數據與專訪，全方位解析第三勢力！',
    metaUrl: 'the-third-force',
    metaImage: 'the-third-force/img/og.jpg',
    customScript: ''
  },
  beforeMount () {
    if (!isTouchDevice()) {
      document.documentElement.classList.add('hovermq')
    }
  },
  mounted () {
    window.addEventListener('scroll', this.sendGaHomeCover)
    window.addEventListener('scroll', this.sendGaReportList)
    window.addEventListener('scroll', this.sendGaFooter)
  },
  components: {
    HomeCover,
    ReportList,
    DonateItem,
    TheSubscr
  },
  data () {
    return {
      gaSentProfileIds: []
    }
  },
  methods: {
    sendGaHomeCover () {
      const { bottom } = this.$refs[ 'homeCover' ].$el.getBoundingClientRect()
      const wh = this.$store.state.viewport[ 1 ]
      if ((bottom - wh * 0.5) < 0) {
        window.ga('send', 'event', 'projects', 'scroll', '1', 1)
        window.removeEventListener('scroll', this.sendGaHomeCover)
      }
    },
    sendGaReportList () {
      const { bottom } = this.$refs[ 'reportList' ].$el.getBoundingClientRect()
      const wh = this.$store.state.viewport[ 1 ]
      if ((bottom - wh * 0.5) < 0) {
        window.ga('send', 'event', 'projects', 'scroll', '2', 2)
        window.removeEventListener('scroll', this.sendGaReportList)
      }
    },
    sendGaFooter () {
      const scrollH = window.pageYOffset
      const bodyH = document.body.offsetHeight
      const wh = this.$store.state.viewport[ 1 ]
      if (scrollH >= (bodyH - wh)) {
        window.ga('send', 'event', 'projects', 'scroll', 'end', 3)
        window.removeEventListener('scroll', this.sendGaFooter)
      }
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
picture
  display block

.hovermq
  & .report-list__report > a:hover
    box-shadow 10px 10px 0 #000
  & .donate-item a:hover
    box-shadow 5px 5px 0 #000
  & .subscr .subscription-wrapper .subscription__btn:hover
    box-shadow 5px 5px 0 #000
</style>
