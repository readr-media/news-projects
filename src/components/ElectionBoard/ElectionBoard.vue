<template>
  <div class="election-board">
    <Logo v-show="currentComponent === 'ElectionBoardLanding'" class="no-sprite" href="https://www.readr.tw/" top="15px" left="15px" bgImage="/proj-assets/election-board/images/readr-logo.png" />
    <Share v-show="currentComponent === 'ElectionBoardLanding'" :shareUrl="shareLink" class="election-board__share" top="10px" left="70px" bgColor="#000" direction="right" />
    <section :is="currentComponent"></section>
  </div>
</template>
<script>
import ElectionBoardData from './ElectionBoardData.vue'
import ElectionBoardLanding from './ElectionBoardLanding.vue'
import ElectionBoardUpload from './ElectionBoardUpload.vue'
import ElectionBoardVerify from './ElectionBoardVerify.vue'
import Logo from '../Logo.vue'
import Share from '../Share.vue'

import ElectionBoardStoreModule from '../../store/modules/ElectionBoard'

const fetchElections = (store, year = 2018) => {
  return store.dispatch('ElectionBoard/FETCH_ELECTIONS', year)
}

export default {
  name: 'ElectionBoard',
  components: {
    ElectionBoardData,
    ElectionBoardLanding,
    ElectionBoardUpload,
    ElectionBoardVerify,
    Logo,
    Share,
  },
  metaInfo() {
    const metaUrl = this.$route.fullPath.split('/project/')[1];
    const metaImage = `election-board/images/og.jpg`;
    const ogLocale = 'zh_TW';

    return {
      title: '看板追追追',
      description: '每到選舉季節，街上就會掛滿大大小小的候選人看板，如果候選人不申報，就會在選舉之後隨著卸下的看板消失無蹤。我們邀請你拍下身邊的看板，一起為這次的選舉留下紀錄！',
      locale: ogLocale,
      metaUrl,
      metaImage,
      customScript: `
        <script src="//www.readr.tw/proj-assets/election-board/scripts/exif.js" async><\/script>
      `,
    };
  },
  computed: {
    currentComponent() {
      if (this.$route.params.params) {
        const part = this.$route.params.params.charAt(0).toUpperCase() + this.$route.params.params.slice(1)
        return `ElectionBoard${part}` 
      }
      return 'ElectionBoardLanding'
    },
    shareLink () {
      return this.$route.fullPath
    }
  },
  beforeCreate () {
    const route = this.$route.params.params || '';
    const regex = /^(upload)$/
    // const regex = /^(upload|verify|data)$/
    if (!route.match(regex)) {
      this.$router.replace({ path: '/project/election-board' });
    }
  },
  created () {
    this.$store.registerModule('ElectionBoard', ElectionBoardStoreModule)
  },
  beforeMount () {
    fetchElections(this.$store)
  },
  mounted () {
    window.ga('send', 'pageview')
  },
  destroyed () {
    this.$store.unregisterModule('ElectionBoard')
  },
}
</script>
<style lang="stylus">
.election-board
  color #000
  font-size 16px
  font-style normal
  font-family "source-han-sans-traditional", sans-serif
  line-height 1.67
  h3, p
    margin 0
  a
    color #000
    text-decoration none
    cursor pointer
  &__share
    &.share
      .toggle
        background-image url(/proj-assets/election-board/images/share.png) !important
        background-size 34px auto !important
        background-position center center !important
</style>

