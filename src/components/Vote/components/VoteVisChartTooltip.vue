<template>
  <div class="tooltip-wrapper">
    <div class="tooltip-wrapper__line"></div>
    <div class="tooltip-wrapper__tooltip">
      <template v-if="viewStatus === 'relationship'">
        {{ data['姓名'] }}，{{ data['所屬議員'] }}的{{ data['親屬關係'] }}。<br>
        曾任{{ data['親屬任職議會縣市'] }}議會 <span class="highlight">{{ data['當選次數'] }}</span> 屆議員 
      </template>
      <template v-else-if="viewStatus === 'legislator'">
        {{ data['key'] }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    view: {
      type: Number,
      required: true
    },
  },
  computed: {
    viewStatus () {
      if ([ 1, 2, 3, 4, 6 ].includes(this.view)) {
        return 'relationship'
      } else if ([ 5 ].includes(this.view)) {
        return 'legislator'
      }
    },
  }  
}
</script>

<style lang="stylus" scoped>
.tooltip-wrapper
  display flex
  flex-direction column
  align-items center
  &__line
    width 2px
    height 10px
    background-color white
  &__tooltip
    width max-content
    background-color white
    padding 10px 20px
    color black
    font-size 20px
    font-weight 400
    line-height 1.5

.highlight
  font-weight 600
  color #ef5233
</style>

