<template>
  <footer class="rich-footer">
    <img
      class="rich-footer__square-word square-word"
      src="/proj-assets/china-company/發.svg"
      alt=""
    >
    <div class="rich-footer__banner banner">
      <div
        class="banner-mobile"
      >
        <a
          v-show="currentCatalog !== '0'"
          :href="`#h2-${currentCatalog - 1}`"
        >
          <img
            class="banner-mobile__arrow banner-mobile__arrow--left"
            src="/proj-assets/china-company/arrow.png"
            alt=""
          >
        </a>
        <p
          class="banner-mobile__current-catalog"
          v-text="currentCatalogTitle"
        />
        <a
          v-show="currentCatalog !== '7'"
          :href="`#h2-${currentCatalog + 1}`"
        >
          <img
            class="banner-mobile__arrow banner-mobile__arrow--right"
            src="/proj-assets/china-company/arrow.png"
            alt=""
          >
        </a>
      </div>
    </div>
    <img
      class="rich-footer__square-word square-word"
      src="/proj-assets/china-company/財.svg"
      alt=""
    >
    <div class="rich-footer__catalog-wrapper catalog-wrapper">
      <img
        class="catalog-wrapper__img"
        src="/proj-assets/china-company/索引bg.png"
        alt=""
      >
      <nav
        class="catalog-wrapper__catalog catalog"
      >
        <ol class="catalog__list catalog__list--left">
          <li>
            <a href="#h2-0">
              <IconStar
                :class="[
                  'star',
                  { 'star--show': currentCatalog === 0 }
                ]"
              />
              <span>
                誰領中國補助款
              </span>
            </a>
          </li>
          <li>
            <a href="#h2-1">
              <IconStar
                :class="[
                  'star',
                  { 'star--show': currentCatalog === 1 }
                ]"
              />
              <span>
                旺旺至中國插旗
              </span>
            </a>
          </li>
          <li>
            <a href="#h2-2">
              <IconStar
                :class="[
                  'star',
                  { 'star--show': currentCatalog === 2 }
                ]"
              />
              <span>
                富士康的重要性
              </span>
            </a>
          </li>
          <li>
            <a href="#h2-3">
              <IconStar
                :class="[
                  'star',
                  { 'star--show': currentCatalog === 3 }
                ]"
              />
              <span>
                為什麼要給補助款
              </span>
            </a>
          </li>
        </ol>
        <ol class="catalog__list catalog__list--right">
          <li>
            <a href="#h2-4">
              <IconStar
                :class="[
                  'star',
                  { 'star--show': currentCatalog === 4 }
                ]"
              />
              <span>
                領中國補助的隱憂
              </span>
            </a>
          </li>
          <li>
            <a href="#h2-5">
              <IconStar
                :class="[
                  'star',
                  { 'star--show': currentCatalog === 5 }
                ]"
              />
              <span>
                香港也受中資影響
              </span>
            </a>
          </li>
          <li>
            <a href="#h2-6">
              <IconStar
                :class="[
                  'star',
                  { 'star--show': currentCatalog === 6 }
                ]"
              />
              <span>
                官方擴大讓利對象
              </span>
            </a>
          </li>
          <li>
            <a href="#h2-7">
              <IconStar
                :class="[
                  'star',
                  { 'star--show': currentCatalog === 7 }
                ]"
              />
              <span>
                臺灣青年的中國夢
              </span>
            </a>
          </li>
        </ol>
      </nav>
    </div>
  </footer>
</template>

<script>
import IconStar from '../../../components/IconStar.vue'

export default {
  components: {
    IconStar
  },
  data () {
    return {
      currentCatalog: 0,
      currentCatalogTitle: '誰領中國補助款',
      catalogTitles: [
        '誰領中國補助款',
        '旺旺至中國插旗',
        '富士康的重要性',
        '為什麼要給補助款',
        '領中國補助的隱憂',
        '香港也受中資影響',
        '官方擴大讓利對象',
        '臺灣青年的中國夢'
      ]
    }
  },
  mounted () {
    // This is mobile only feature
    this.initIntersectionObserver()
  },
  methods: {
    initIntersectionObserver () {
      require('intersection-observer')

      const options = {
        root: document.querySelector('#china-company'),
        rootMargin: '-75px 0px 0px 0px',
        threshold: 0
      }

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          // Each entry describes an intersection change for one observed
          // target element:
          //   entry.boundingClientRect
          //   entry.intersectionRatio
          //   entry.intersectionRect
          //   entry.isIntersecting
          //   entry.rootBounds
          //   entry.target
          //   entry.time

          // console.log(entry.target)
          // console.log('isIntersecting: ', entry.isIntersecting)
          // console.log(entry.intersectionRect)
          const step = Number(entry.target.dataset.step)
          if (entry.isIntersecting) {
            this.currentCatalog = step
            const h2 = entry.target.querySelector('h2')
            const anchorTitle = h2.dataset.anchorTitle
            this.currentCatalogTitle = anchorTitle
          } else {
            const exitFromTop = this.currentCatalog >= step
            const exitFromBottom = this.currentCatalog < step

            if (exitFromTop) {
              this.currentCatalog = step + 1
              const anchorTitle = this.catalogTitles[this.currentCatalog]
              this.currentCatalogTitle = anchorTitle
            } else if (exitFromBottom) {
              this.currentCatalog = step - 1
              const anchorTitle = this.catalogTitles[this.currentCatalog]
              this.currentCatalogTitle = anchorTitle
            }
          }
        })
      }, options)

      const targets = document.querySelectorAll('.article-subsection')
      targets.forEach(target => { observer.observe(target) })
    }
  }
}
</script>

<style lang="stylus" scoped>
.rich-footer
  z-index 10000
  display flex
  align-items center
  // background linear-gradient(to bottom, transparent 50%, #e9dbb6 50%)
  &__square-word
    height 54px
  &__banner
    flex 1 1 auto 
    background-color #000537
    height 54px 
    // margin 0 5px
    z-index 10000
  &__catalog-wrapper
    position absolute
    right 74px
    bottom 34px
    z-index 10000

.banner-mobile
  display none

.catalog-wrapper
  width 550px
  pointer-events none
  &__img
    width 100%
  &__catalog
    position absolute
    top 80px
    left 100px
    // width 200px
    // height 50px
    // border 1px solid red

.catalog
  pointer-events auto
  display flex
  &__list
    list-style none
    margin 0
    padding 0
    li
      a
        font-size 18px
        color white
        text-decoration none
        line-height 2
        display flex
        align-items center
        .star
          margin 0 5px 0 0
          opacity 0
          &--show
            opacity 1
    &--right
      margin 70px 0 0 20px


@media (max-width 1400px)
  .rich-footer
    background linear-gradient(to bottom, transparent 50%, #e9dbb6 50%)
    &__square-word
      height 50px
    &__banner
      height 30px
    &__catalog-wrapper  
      display none
  
  .banner-mobile
    padding 6px
    width 100%
    height 100%
    display flex
    align-items center
    &__arrow
      width 20px
      height 14px
      &--right
        transform rotate(180deg)
    &__current-catalog
      margin 0 5px
      color white
      flex 1 1 auto 
      width 0
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      text-align center
</style>
