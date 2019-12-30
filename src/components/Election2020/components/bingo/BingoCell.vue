<template>
  <div class="bingo-cell bingo-bs">
    <div class="party celltexts">黨名字太多會點點</div>
    <div class="name celltextl">人名也會點點</div>
    <div class="region celltexts">選區一</div>
  </div>
</template>

<script>
export default {
  props: {
    cells: Object
  },
}
</script>

<style lang="stylus" scoped>

  .bingo-cell
    margin-top -4px
    margin-left -4px
    padding 10%
    box-sizing border-box
    box-shadow: inset 0 0 0 4px rgba(151, 151, 151, 0.25)
    overflow hidden
    display flex
    flex-direction column
    justify-content space-between

  .bingo-cell div
    white-space nowrap
    overflow hidden
    text-overflow ellipsis

  .bingo-cell:hover
    box-shadow: inset 0 0 0 4px rgba(101, 101, 101, 0.5)

  .celltextl
    font-size 1.75rem
    font-weight bold
  
  .celltexts
    font-size 0.8rem
    line-height 1.2

  .bongo-cell-elected
    background white
  .bingo-v
    background linear-gradient(#000, #000) no-repeat center/2px 100%
  .bingo-h
    background linear-gradient(180deg, transparent calc(50% - 1px), black calc(50%), transparent calc(50% + 1px))
  .bingo-s
    background linear-gradient(to bottom right, transparent calc(50% - 1px),  black calc(50% - 1px), black 50%, transparent calc(50% + 1px))
  .bingo-bs
    background linear-gradient(to bottom left, transparent calc(50% - 1px),  black calc(50% - 1px), black 50%, transparent calc(50% + 1px))

</style>