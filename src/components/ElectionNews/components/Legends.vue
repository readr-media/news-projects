<template>
  <div class="legends">
    <div class="legends__top top">
      <p>情緒計算方式說明</p>
      <p>我們蒐集了 2018 年 10 月 19 日至 12 月 19 日的新聞，以 Google's Cloud Natural Language API 計算新聞文本的情緒分數，並將分數轉換成 0 - 10 分，再區分為三個情緒區間。</p>
      <p class="top__more">
        <span @click="newTab('https://www.readr.tw/post/1668')" ga-on="click" ga-event-category="projects" ga-event-action="click" ga-event-label="manual legend">（<span class="underline">看詳細</span>）</span>
      </p>
      <transition name="slide-fade">
        <div v-show="showMore">
          <p>新聞來源為零時政府（g0v）people-in-news <a href="https://github.com/g0v/people-in-news/blob/master/etc/news-sites.txt" target="_blank">專案</a>，共 139 家媒體來源從 2018 年 10 月 19 日開始蒐集的新聞內容，會持續更新到 2020 年總統大選。並以 2018 年縣市長候選人、公投議題等分類切成 211 個關鍵字，以 Google's Cloud Natural Language API 計算新聞文本的情緒分數，並將分數轉換成 0 - 10 分，再區分為 3 個情緒區間。</p>
          <p>對於新聞中每一段語句，Google's Cloud Natural Language API 會回傳兩個數值，分別為情緒分數 (score) ，由正面（1 分）到負面（-1 分）代表文件的整體情緒，情緒幅度 (magnitude) 則是由強（1 分）到弱（0 分），代表文件內容出現的情緒強度。為了避免非新聞內容的文字被列入統計，例如字體大小選擇、新聞作者姓名等等，我們排除了所有情緒幅度小於 0.1 的語句。新聞的情緒分數為該新聞中所有沒被排除的語句的情緒分數之平均。關鍵字的情緒分數計算方式，則為該日所有包含該關鍵字的新聞情緒分數之平均。</p>
        </div>
      </transition>
    </div>
    <div class="legends__bottom bottom">
      <div class="bottom__left sentiment">
        <img src="/proj-assets/election-news/img/sentiment-bad-arrow.svg" alt="">
        <p>0 ~ 3.75</p>
      </div>
      <div class="bottom__middle sentiment">
        <img src="/proj-assets/election-news/img/sentiment-normal-arrow.svg" alt="">
        <p>3.75 ~ 6.25</p>
      </div>
      <div class="bottom__right sentiment">
        <img src="/proj-assets/election-news/img/sentiment-good-arrow.svg" alt="">
        <p>6.25 ~ 10</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showMore: false
    }
  },
  methods: {
    toggleMore () {
      this.showMore = !this.showMore
    },
    newTab (url) {
      window.open(url)
    }
  }
}
</script>

<style lang="stylus" scoped>
.legends
  &__bottom
    margin 42px 0 0 0

.top
  p
    margin 12px 0
    line-height 1.5
    font-size 14px
    text-align justify
  &__more
    color #4a90e2
    span
      cursor pointer
      user-select none
    span.underline
      border-bottom 1px solid #4a90e2

.bottom
  display flex

.sentiment
  display flex
  flex-direction column
  justify-content center
  align-items center
  img
    width 34px
  p
    margin 3px 0 0 0
    font-size 14px
  & + &
    margin 0 0 0 12px

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease-out;
}
.slide-fade-leave-active {
  transition: all .3s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}

@media (min-width 1024px)
  .top
    p
      font-size 14px

  .sentiment
    p
      margin 3px 0 0 0
      font-size 14px
    & + &
      margin 0 0 0 20px
</style>