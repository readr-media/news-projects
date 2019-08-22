<template>
  <div class="hong-kong">
    <Header
      :showMessageBoard="showMessageBoard"
      @openMessageBoard="showMessageBoard = !showMessageBoard"
    />
    <div
      :is="currentComponent"
      class="hong-kong__main"
    />
    <MessageBoard
      :class="{ open: showMessageBoard }"
      class="hong-kong__message-board"
      @closeMessageBoard="showMessageBoard = false"
    />
  </div>
</template>
<script>
import Header from './components/Header.vue'
import LennonWall from './components/LennonWall.vue'
import MessageBoard from './components/MessageBoard.vue'
import Timeline from './components/Timeline.vue'

import storeModule from '../../store/modules/HongKongProtests2019'

export default {
  name: 'HongKongProtests2019',
  components: {
    Header,
    LennonWall,
    MessageBoard,
    Timeline
  },
  metaInfo() {
    const isTimeline = this.$route.params.params === 'timeline'

    let title = '連儂牆留言撐香港'
    let description = '連儂牆源自於捷克，最早的牆上都是約翰・藍儂風格的塗鴉與樂團披頭四的歌詞，演變成愛與和平的精神象徵。香港的連儂牆最早出現在 2014 年的雨傘運動，群眾用便利貼在牆上留下理念或打氣的字眼，成為代表性的地標。在反送中運動裡，連儂牆更是在香港的大街小巷遍地開花。READr 在線上打造了一座連儂牆，歡迎留下對港人想說的話。'
    let metaUrl = 'hong-kong-protests-2019/lennon-wall'

    if (isTimeline) {
      title = '一國兩制 22 年，香港民主運動軌跡'
      description = '1984 年，香港回歸中國，當時前中國領導人鄧小平承諾「港人治港」的方針 50 年不變，近年卻出現巨大變化。港人對民主進步的追求從未停歇，從最早聲援中國六四的遊行、四年前的雨傘運動、到今年反對中國干預司法獨立性的「反送中」，READr 帶你從 1989 年開始回顧。'
      metaUrl = 'hong-kong-protests-2019/timeline'
    }

    return {
      title,
      description,
      metaUrl,
      metaImage: '',
      customScript: `
        <script>
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:1424298,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        <\/script>
      `
    }
  },
  data () {
    return {
      showMessageBoard: false
    }
  },
  computed: {
    currentComponent () {
      if (this.$route.params.params === 'timeline') {
        return 'Timeline'
      }
      return 'LennonWall'
    }
  },
  serverPrefetch () {
    this.registerStoreModule()
    return Promise.resolve()
  },
  beforeMount () {
    this.registerStoreModule(true)
  },
  mounted () {
    window.ga('send', 'pageview')
  },
  beforeDestroy () {
    this.$store.unregisterModule('HongKongProtests')
  },
  methods: {
    registerStoreModule (shouldPreserveState = false) {
      this.$store.registerModule('HongKongProtests', storeModule, { preserveState: shouldPreserveState })
    }
  }
}
</script>
<style lang="stylus" scoped>
.hong-kong
  &__message-board
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    width 100%
    opacity 0
    visibility hidden
    transition opacity .5s .2s
    &.open
      opacity 1
      visibility visible

</style>
