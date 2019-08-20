<template>
  <article class="video-story">
    <!-- <div class="video-story__cover full-img" :style="{ backgroundImage: `url(/proj-assets/img/background/bg-black-${isLap ? 'lap' : 'mob'}.png)` }"> -->
    <div class="video-story__cover full-img" :style="{ backgroundImage: `url(/proj-assets/img/background/bg-black-mob.png)` }">
      <h2 class="total-center">「我為什麼回來臺灣？」<br>回流青年們的故事</h2>
    </div>
    <div class="video-story__content">
      <h3>陳蔚宣：臺灣女孩三年多港漂歲月的最終章</h3>
      <p>29 歲的陳蔚宣來自新北市，父母離異、時常搬家的童年，讓她覺得出國是奢望。長大後她爭取到工作外派香港的機會，身為團隊內唯一的臺灣人，她帶領香港員工拓展市場、學了一口流利的廣東話，因為父親突然罹癌，她毅然決定回臺補修親情學分。READr 團隊到香港，記錄她從無到有再歸零的香港最後時光。</p>
      <YouTube />
    </div>
  </article>
</template>

<script>
import YouTube from './YouTube.vue'

export default {
  name: 'VideoStory',
  components: {
    YouTube
  }
  // props: ['isLap']
}
</script>

<style lang="stylus">
.video-story
  background-color #fff
  &__cover
    position relative
    height 100vh
  & h2
    width 100%
    color #f8e71c
    text-align center
    font-size 2.4rem
    font-weight 500
    text-shadow 0 2px 4px rgba(0, 0, 0, 0.5)
    line-height 1.5
  &__content
    padding 25px 25px 50px
    font-size 1.4rem
    line-height 1.8
  & h3
    font-size 2.4rem
    line-height 1.3
    font-weight 300
    margin-bottom 25px
</style>