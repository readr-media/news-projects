<template>
  <nav class="app-nav-sidebar">
    <a class="app-nav-sidebar__nav-item nav-item" @click="navigateRoute('dashboard')">
      <div class="nav-item__icon" :style="{ maskImage: `url(/proj-assets/political-contribution/chart-g.png)` }"></div>
      <p class="nav-item__hint">圖表區</p>
    </a>
    <a class="app-nav-sidebar__nav-item nav-item" @click="navigateRoute('explore')">
      <div class="nav-item__icon" :style="{ maskImage: `url(/proj-assets/political-contribution/tool-g.png)` }"></div>
      <p class="nav-item__hint">查找政商關係</p>
    </a>
    <a class="app-nav-sidebar__nav-item nav-item" @click="navigateRoute('story1')">
      <div class="nav-item__icon" :style="{ maskImage: `url(/proj-assets/political-contribution/article-g.png)` }"></div>
      <p class="nav-item__hint">獻金解析文章</p>
    </a>
    <a class="app-nav-sidebar__nav-item app-nav-sidebar__nav-item--dimmed-border nav-item" @click="navigateRoute('story1')">
      <div class="nav-item__icon-circle"></div>
      <p class="nav-item__hint nav-item__hint--story">選一次立委，金流超過 28 億！</p>
    </a>
    <a class="app-nav-sidebar__nav-item app-nav-sidebar__nav-item--dimmed-border nav-item" @click="navigateRoute('story2')">
      <div class="nav-item__icon-circle"></div>
      <p class="nav-item__hint nav-item__hint--story">立委篇／<br>老鳥與新秀，募款能力差了 6.6 倍</p>
    </a>
    <a class="app-nav-sidebar__nav-item app-nav-sidebar__nav-item--dimmed-border nav-item" @click="navigateRoute('story3')">
      <div class="nav-item__icon-circle"></div>
      <p class="nav-item__hint nav-item__hint--story">企業篇／<br>金權遊戲？翻開金主的投資名冊</p>
    </a>
    <a class="app-nav-sidebar__nav-item app-nav-sidebar__nav-item--dimmed-border nav-item" @click="navigateRoute('story4')">
      <div class="nav-item__icon-circle"></div>
      <p class="nav-item__hint nav-item__hint--story">政治獻金開放了嗎？</p>
    </a>
    <a class="app-nav-sidebar__nav-item app-nav-sidebar__nav-item--dimmed-border nav-item" @click="navigateRoute('story5')">
      <div class="nav-item__icon-new">NEW</div>
      <p class="nav-item__hint nav-item__hint--story">資料怎麼看？政治獻金的五個發現</p>
    </a>
    <a class="app-nav-sidebar__nav-item nav-item" @click="navigateRoute('story6')">
      <div class="nav-item__icon-new">NEW</div>
      <p class="nav-item__hint nav-item__hint--story">政治獻金資料到底解密了什麼？</p>
    </a>
    <a class="app-nav-sidebar__nav-item nav-item" @click="newTab('http://www.readr.tw/series/political-contribution')">
      <div class="nav-item__icon" :style="{ maskImage: `url(/proj-assets/political-contribution/star.png)` }"></div>
      <p class="nav-item__hint">追蹤最新進度</p>
    </a>
    <a class="app-nav-sidebar__nav-item nav-item" @click="newTab('https://github.com/mirror-media/politicalcontribution')">
      <div class="nav-item__icon" :style="{ maskImage: `url(/proj-assets/political-contribution/paper-g.png)` }"></div>
      <p class="nav-item__hint">原始素材資料</p>
    </a>
    <a class="app-nav-sidebar__nav-item app-nav-sidebar__nav-item--disable-border nav-item" @click="toogleRelatedLightbox">
      <div class="nav-item__icon" :style="{ maskImage: `url(/proj-assets/political-contribution/text-g.png)` }"></div>
      <p class="nav-item__hint">查看相關討論</p>
    </a>
  </nav>
</template>

<script>
export default {
  methods: {
    navigateRoute (path) {
      this.$router.push(path)
      this.$emit('closeNavSidebar')
      this.$scrollTo('.section-content')
    },
    newTab (url) {
      window.open(url)
      this.$emit('closeNavSidebar')
    },
    toogleRelatedLightbox () {
      this.$emit('toogleRelatedLightbox')
      this.$emit('closeNavSidebar')
    }
  }  
}
</script>

<style lang="stylus" scoped>
.app-nav-sidebar
  background-color #152438
  &__nav-item
    display inline-block
    width 100%
    height 150px
    border-bottom 3px solid white
    &--dimmed-border
      border-bottom 1px solid gray
    &--disable-border
      border-bottom none

.nav-item
  display flex
  justify-content flex-start
  align-items center
  text-decoration none
  padding 0 30px 0 calc((100% - 182px) / 2)
  line-height 1.25
  &__icon
    min-width 40px
    width 40px
    min-height 40px
    height 40px
    mask-position center center
    mask-size 100% auto
    mask-repeat no-repeat
    background-color white
    margin 0 10px 0 0
  &__icon-circle
    min-width 30px
    width 30px
    min-height 30px
    height 30px
    border-radius 30px
    background-color transparent
    margin 0 20px 0 0
  &__icon-new
    min-width 40px
    width 40px
    min-height 30px
    height 30px
    border-radius 50%
    border 1px solid white
    color white
    display flex
    justify-content center
    align-items center
    margin 0 10px 0 0
    font-size 12px
  &__hint
    color white
    font-size 22px
    &--story
      font-size 18px
      font-weight 300
</style>

