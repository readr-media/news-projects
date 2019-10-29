<template>
  <div>
    <HeaderIcons />
    <TableOfContents />
  </div>
</template>

<script>
import HeaderIcons from './components/HeaderIcons.vue'
import TableOfContents from './components/TableOfContents.vue'

export default {
  name: 'FoodDelivery',
  metaInfo () {
    return {
      title: '',
      description: '',
      metaUrl: 'food-delivery',
      metaImage: ''
    }
  },
  components: {
    TableOfContents,
    HeaderIcons
  }
}
</script>

<style lang="stylus">
html
  font-size 10px
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif
img
  max-width 100%
  height auto
html, div, h1, h2, p, a, strong, figure, figcaption, footer, header, section, ul, li
  margin 0
  padding 0
  border 0
  vertical-align baseline
ul
  list-style none
// .op0
//   opacity 0
</style>