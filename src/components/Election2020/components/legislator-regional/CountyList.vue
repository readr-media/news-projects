<template>
  <ul class="list">
    <h1 class="list__title">
      <span class="mobile">點擊選區</span><span class="desktop">移動滑鼠至選區</span>以查看詳情
    </h1>
    <div class="list-item-wrapper">
      <div class="list-item-wrapper__catalog list-item-wrapper__catalog--first">
        <CountyListItem
          class="list__list-item"
          :countyName="'台北市'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'新北市'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'桃園市'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'台中市'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'台南市'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'高雄市'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'基隆市'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'宜蘭縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'新竹縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'新竹市'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'苗栗縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'彰化縣'"
        />
      </div>
      <div class="list-item-wrapper__catalog list-item-wrapper__catalog--second">
        <CountyListItem
          class="list__list-item"
          :countyName="'南投縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'雲林縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'嘉義縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'嘉義市'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'屏東縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'台東縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'花蓮縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'澎湖縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'金門縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'連江縣'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'山地原住民'"
        />
        <CountyListItem
          class="list__list-item"
          :countyName="'平地原住民'"
        />
      </div>
    </div>
  </ul>
</template>

<script>
import CountyListItem from './CountyListItem.vue'

export default {
  components: {
    CountyListItem
  }
}
</script>

<style lang="stylus" scoped>
.list
  list-style none
  margin 0
  padding 0
  &__title
    font-size 15px
    color $color-black-light
    text-align left
    margin 0 0 0 65px
    padding 12px 10px
    border-left solid 1px rgba(0, 0, 0, 0.4)
    font-weight normal
    span
      font-weight 600
      &.desktop
        display none

@media (min-width 768px)
  .list
    &__title
      text-align right
      border-left none
      margin 0
      span
        &.mobile
          display none
        &.desktop
          display inline

  .list-item-wrapper
    display flex
    &__catalog
      width 576px
      &--first
        padding 0 51px 0 0
      &--second
        border-left 2px solid rgba(0, 0, 0, .1)
        padding 0 0 0 51px
</style>
