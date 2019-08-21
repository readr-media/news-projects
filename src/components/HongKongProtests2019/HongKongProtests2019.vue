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
    return {
      title: '',
      description: '',
      metaUrl: '',
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
  &__main
    padding 60px 0 0 0
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

// @media (min-width: 768px)
//   .hong-kong
    
</style>

