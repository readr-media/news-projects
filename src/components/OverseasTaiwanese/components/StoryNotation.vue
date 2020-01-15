<template>
  <abbr :title="notation.txt" class="story-notation">
    <svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" :class="notation.color" @[touchOrClick]="toggleNotation">
      <g transform="translate(2, 2)">
        <circle stroke-width="4" fill="#fff" cx="20" cy="20" r="20"></circle>
        <path d="M21.9931741,10 C22.5574545,10 23.0329901,10.1950094 23.4197952,10.585034 C23.8066003,10.9750586 24,11.4467093 24,12 C24,12.5532907 23.8043251,13.0249414 23.4129693,13.414966 C23.0216135,13.8049906 22.5483532,14 21.9931741,14 C21.4470962,14 20.9783865,13.8049906 20.5870307,13.414966 C20.1956749,13.0249414 20,12.5532907 20,12 C20,11.4467093 20.1933997,10.9750586 20.5802048,10.585034 C20.9670099,10.1950094 21.4379949,10 21.9931741,10 Z M23,17 L20.016632,27.4230366 C19.851697,28.0192002 19.7692308,28.4101212 19.7692308,28.5958115 C19.7692308,28.7033164 19.8128894,28.8034899 19.9002079,28.8963351 C19.9875264,28.9891802 20.0796946,29.0356021 20.1767152,29.0356021 C20.3416502,29.0356021 20.5065827,28.9623044 20.6715177,28.8157068 C21.1081103,28.4540994 21.6320136,27.7993067 22.2432432,26.8513089 L22.7380457,27.1445026 C21.2730349,29.7148471 19.715878,31 18.0665281,31 C17.4358943,31 16.9338203,30.8216423 16.5602911,30.4649215 C16.1867618,30.1082007 16,29.6561982 16,29.1089005 C16,28.7472931 16.0824663,28.2879609 16.2474012,27.7308901 L18.2702703,20.7235602 C18.4643114,20.0492113 18.5613306,19.5410139 18.5613306,19.1989529 C18.5613306,18.9839431 18.4691624,18.7933691 18.2848233,18.6272251 C18.1004842,18.4610812 17.8482344,18.3780105 17.5280665,18.3780105 C17.3825357,18.3780105 17.2079012,18.382897 17.004158,18.3926702 L17.1933472,17.8062827 L22.1268191,17 L23,17 Z"></path>
      </g>
    </svg>
    <p :class="[notation.color, 'story-notation__txt']" v-if="isNotationTxt" v-html="notation.txt"></p>
  </abbr>
</template>

<script>
export default {
  name: 'StoryNotation',
  props: ['notation'],
  data () {
    return {
      isNotationTxt: false
    }
  },
  computed: {
    touchOrClick () {
      return this.$parent.$parent.touchOrClick
    }
  },
  methods: {
    toggleNotation (evt) {
      evt.currentTarget.classList.toggle('active')
      this.isNotationTxt = !this.isNotationTxt
    }
  }
}
</script>

<style lang="stylus">
@import '../util/global-var.styl'

.story-notation
  padding-right 3px
  padding-left 3px
  @media (min-width $tab-breakpoint)
    padding-right 4px
    padding-left 4px
  & svg
    position relative
    top 2px
    width 14px
    height 14px
    cursor: pointer
    @media (min-width $tab-breakpoint)
      top 4px
      width 20px
      height 20px
    &.green
      & circle
        stroke #4f7e7a
      & path
        fill #4f7e7a
      &.active circle
        fill #4f7e7a
    &.pink
      & circle
        stroke #c68664
      & path
        fill #c68664
      &.active circle
        fill #c68664
    &.active path
      fill #fff
  &__txt
    width 100%
    display inline-block
    border-radius 6px
    box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.5)
    padding 12px 16px
    line-height 1.6
    margin-top 16px
    margin-bottom 16px
    color #4a4a4a
    background-color #fff
    @media (min-width $tab-breakpoint)
      padding 16px 20px
      margin-top 20px
      margin-bottom 20px
    &.green a
      color #4f7e7a
    &.pink a
      color #c68664
</style>