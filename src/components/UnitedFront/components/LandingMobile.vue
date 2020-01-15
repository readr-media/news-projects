<template>
  <section
    class="landing"
  >
    <section
      class="landing__upper upper"
    >
      <div
        class="upper__titles titles"
      >
        <h1>
          <img src="/proj-assets/unitedfront/title.png" alt="">
        </h1>
        <h2>全方位解析兩岸青年交流團</h2>
      </div>
      <TheReadMore
        class="upper__read-more-wrapper"
        @click.native="handleReadMore"
      />
    </section>
    <section
      class="landing__lower lower"
      id="landing-mobile-lower"
    >
      <div
        class="lower__intro intro"
      >
        <p>你知道一個暑假，至少有 3000 名臺灣青年去中國「交流」嗎？ 11 天甘肅絲路之旅、兩個月北京實習、青年創業基地參訪⋯⋯盤點已知的交流團形式，就能發現其「無孔不入」的程度：從小學就有機會參與，大學則是交流黃金期，甚至到畢業實習都有包辦。但這些交流真的只是平凡的交流嗎？READr 透過深度訪談和數據，呈現「交流」與「統戰」之間千絲萬縷的關係。</p>
      </div>
    </section>
  </section>
</template>

<script>
import TheReadMore from './TheReadMore.vue'

export default {
  components: {
    TheReadMore
  },
  methods: {
    handleReadMore() {
      this.$scrollTo('#landing-mobile-lower')
      window.ga('send', 'event', 'projects', 'click', 'read more', { nonInteraction: false })
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -50%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.upper
  height 100vh
  background-image: url(/proj-assets/unitedfront/landing-mobile.png)
  background-position center center
  background-size cover
  background-repeat norepeat
  display flex
  flex-direction column
  align-items center
  justify-content space-between
  padding 50px 0 25px 0
  position relative
  z-index 200

.titles
  text-align center
  color white
  margin 20px 0 0 0
  opacity 0
  animation-name fadeInDown
  animation-duration .5s
  animation-delay 1.5s
  animation-fill-mode forwards
  h1
    margin 0
    font-size 30px
    img
      width 50%
  h2
    margin 0
    font-size 21px
    font-weight 300
    color #f8e71c

.lower
  height 100vh
  background-image linear-gradient(to bottom, #44516e, #37445d)
  display flex
  flex-direction column
  align-items center
  justify-content center
  padding 0 20px
  position relative
  z-index 200

.intro
  font-size 16px
  line-height 1.75
  text-align: justify
  color white
</style>