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
        <h1>一統去交流</h1>
        <h2>全方位解析兩岸青年交流團</h2>
      </div>
      <TheReadMore
        class="upper__read-more-wrapper"
      />
    </section>
    <section
      class="landing__lower lower"
    >
      <div
        class="lower__intro intro"
      >
        <p>你知道一個暑假，有多少年輕人去中國「交流」嗎？11 天甘肅絲路之旅、兩個月北京實習、青年創業基地參訪⋯⋯報名簡章上寫的「落地接待」、「補助」、「高規格參訪」有多優待？這些團去中國做了什麼？見了誰？READr 透過深度訪談和數據，呈現「交流」與「統戰」之間千絲萬縷的關係。</p>
      </div>
    </section>
  </section>
</template>

<script>
import TheReadMore from './TheReadMore.vue'

export default {
  components: {
    TheReadMore
  }
}
</script>

<style lang="stylus" scoped>
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
  h1
    margin 0
    font-size 30px
  h2
    margin 10px 0 0 0
    font-size 21px
    font-weight 300

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