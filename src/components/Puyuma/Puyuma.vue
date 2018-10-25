<template>
  <section id="puyuma" class="puyuma">
    <AppHeader
      class="puyuma__header"
      :stationPrev="'台北'"
      :time="'01:01:01'"
      :stationNext="'台北'"
    />
    <AppConversations
      class="puyuma__conversations"
      :style="{ paddingBottom: `${footerHeight + 10}px` }"
      :timeline="TIMELINE"
    />
    <AppConversationsLegends
      class="puyuma__legends"
      :style="{ bottom: `${footerHeight}px` }"
    />
    <AppFooter class="puyuma__footer"/>
  </section>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppConversations from './components/AppConversations.vue'
import AppConversationsLegends from './components/AppConversationsLegends.vue'
import AppFooter from './components/AppFooter.vue'

import { TIMELINE, } from './PuyumaTimeline.js'

export default {
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: '',
      metaImage: '/ogimage.jpg'
    }
  },
  components: {
    AppHeader,
    AppConversations,
    AppConversationsLegends,
    AppFooter
  },
  data () {
    return {
      TIMELINE,
      footerHeight: 0
    }
  },
  beforeMount () {
    require('intersection-observer')
    const scrollama = require('scrollama')
  },
  mounted () {
    window.ga('send', 'pageview')

    this.footerHeight = document.querySelector('.puyuma__footer').offsetHeight
    window.onresize = () => {
      this.footerHeight = document.querySelector('.puyuma__footer').offsetHeight
    }
  }
}
</script>

<style lang="stylus">
#puyuma
  // color red
  h1
    margin 0
  p
    margin 0
  ol
    margin 0
    padding 0
    list-style none

.puyuma
  height 100vh
  display flex
  flex-direction column
  &__header
    position fixed
    top 0
    left 0
    z-index 2
  &__legends
    width 100%
    position fixed
    left 0
  &__footer
    position fixed
    bottom 0
    left 0
    z-index 2

// @media (min-width 321px)
//   #puyuma
//     color blue

// @media (min-width 376px)
//   #puyuma
//     color yellow

// @media (min-width 415px)
//   #puyuma
//     color orange
</style>

