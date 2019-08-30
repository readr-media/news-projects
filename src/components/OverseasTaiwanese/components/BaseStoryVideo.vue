<template>
  <article class="base-story base-story--video">
    <h3>陳蔚宣：臺灣女孩三年多港漂歲月的最終章</h3>
    <div class="base-story__content">
      <p>29 歲的陳蔚宣來自新北市，父母離異、時常搬家的童年，讓她覺得出國是奢望。長大後她爭取到工作外派香港的機會，身為團隊內唯一的臺灣人，她帶領香港員工拓展市場、學了一口流利的廣東話，因為父親突然罹癌，她毅然決定回臺補修親情學分。READr 團隊到香港，記錄她從無到有再歸零的香港最後時光。</p>
    </div>
    <YouTube />
  </article>
</template>

<script>
import YouTube from './YouTube.vue'

export default {
  name: 'BaseStoryVideo',
  components: {
    YouTube
  }
}
</script>

<style lang="stylus">
.base-story--video
  min-height 100vh
  & h3
    margin-bottom 20px
</style>
