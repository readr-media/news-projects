<template>
  <div
    class="rect"
    @mouseover="showTooltip = true"
    @mouseout="showTooltip = false"
  >
    <div
      v-show="showTooltip"
      class="rect__tooltip tooltip"
    >
      <p class="tooltip__paragraph">{{ name }} {{ age }} 歲</p>
      <p class="tooltip__paragraph">得票數：{{ tks }} 票</p>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
import moment from 'moment'

export default {
  props: {
    candidate: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      showTooltip: false
    }
  },
  computed: {
    name () {
      return get(this.candidate, 'name', '')
    },
    age () {
      const birthday = get(this.candidate, 'birthday', '')
      const birthdatFormatted = moment(birthday)
      const age = moment().diff(birthdatFormatted, 'years')
      return age
    },
    tks () {
      return get(this.candidate, 'tks', 0).toLocaleString()
    }
  },
}
</script>

<style lang="stylus" scoped>
.rect
  width 40px
  height 40px
  background-color black
  position relative
  &__tooltip
    position absolute
    width 170px
    height 70px
    left calc((-170px + 40px) / 2)
    top calc(-76.3px)

.tooltip
  border 1px solid #979797
  background-color white
  display flex
  flex-direction column
  justify-content center
  padding 5px 10px
  &__paragraph
    font-size 18px
    margin 5px 0
  &:before
    content ''
    width 0
    height 0
    border-style solid
    border-width 14.1px 8.15px 0 8.15px
    border-color #979797 transparent transparent transparent
    position absolute
    left calc((170px - 16.3px) / 2)
    bottom -15.3px
  &:after
    content ''
    width 0
    height 0
    border-style solid
    border-width 13.3px 7.65px 0 7.65px
    border-color white transparent transparent transparent
    position absolute
    left calc((170px - 16.3px) / 2 + 0.5px)
    bottom -13.2px
</style>


