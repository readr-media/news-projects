<template>
  <nav class="nav">
    <div class="nav__category-icon" :style="{ maskImage: `url(/proj-assets/president-promise/category/內政.png)` }"></div>
    <div class="nav__category-icon" :style="{ maskImage: `url(/proj-assets/president-promise/category/兩岸.png)` }"></div>
    <div class="nav__category-icon" :style="{ maskImage: `url(/proj-assets/president-promise/category/動保.png)` }"></div>
    <div class="nav__category-icon" :style="{ maskImage: `url(/proj-assets/president-promise/category/勞動.png)` }"></div>
    <div class="nav__buttons-container nav-buttons-container">
      <ButtonNavigateMoveTo class="nav-buttons-container__button" :navigateType="'see-promise-done'" @click.native="openPresidentPromiseInterest"/>
      <ButtonNavigateMoveTo class="nav-buttons-container__button" :navigateType="'see-statistic'" @click.native="moveToResult"/>
    </div>
    <div class="nav__category-icon" :style="{ maskImage: `url(/proj-assets/president-promise/category/司法.png)` }"></div>
    <div class="nav__category-icon" :style="{ maskImage: `url(/proj-assets/president-promise/category/國防.png)` }"></div>
    <div class="nav__category-icon" :style="{ maskImage: `url(/proj-assets/president-promise/category/外交.png)` }"></div>
    <div class="nav__category-icon" :style="{ maskImage: `url(/proj-assets/president-promise/category/建設.png)` }"></div>
  </nav>
</template>

<script>
import fullPageMixin from '../../../_vue-fullpage/fullPageMixin'
import ButtonNavigateMoveTo from '../../button/ButtonNavigateMoveTo.vue'

export default {
  components: {
    ButtonNavigateMoveTo,
  },
  mixins: [ fullPageMixin, ],
  methods: {
    moveToSurvey () {
      this.moveSectionDown()
    },
    moveToResult () {
      this.moveTo('section-result')
    },
    openPresidentPromiseInterest () {
      window.open('/project/president-promise-interest')
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav
  display flex
  justify-content space-around
  align-items center
  width 100%
  height 140px
  background-color #1f464f
  &__category-icon
    width 77px
    height 77px
    background-color #2b616d
    mask-position center center
    mask-size 100% auto
    mask-repeat no-repeat

.nav-buttons-container
  display flex
  &__button
    & + &
      margin 0 0 0 48px

@media (max-width 1280px)
  .nav
    &__category-icon
      &:nth-child(4), &:nth-child(8)
        display none

@media (max-width 1024px)
  .nav
    &__category-icon
      &:nth-child(3), &:nth-child(4), &:nth-child(7), &:nth-child(8)
        display none

@media (max-width 768px)
  .nav
    &__category-icon
      display none

@media (max-width 425px)
  .nav-buttons-container
    &__button
      & + &
        margin 0 0 0 20px
</style>


