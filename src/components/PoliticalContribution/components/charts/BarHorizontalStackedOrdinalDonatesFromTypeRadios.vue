<template>
  <div class="radios">
    總政治獻金的收入
    <div 
      class="radios__container"
      @click.stop="$emit('update:chartTypePicked', 'percentage')"
    >
      <div
        id="seventh-radio-icon"
        :class="[ 'radios__custom-radio', { 'radios__custom-radio--active': chartTypePicked === 'percentage' } ]"
      >
      </div>
      <label for="seventh-radio-icon">組成</label>
    </div>
    <div 
      class="radios__container"
      @click.stop="$emit('update:chartTypePicked', 'total')"
    >
      <div
        id="seventh-radio-icon"
        :class="[ 'radios__custom-radio', { 'radios__custom-radio--active': chartTypePicked === 'total' } ]"
      >
      </div>
      <label for="seventh-radio-icon">總額</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chartTypePicked: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="stylus" scoped>
.radios
  display flex
  justify-content center
  align-content center
  font-size 24px
  &__container
    display flex
    justify-content center
    align-items center
    text-align center
    & + &
      margin 0 0 0 24px
    > label
      margin 0 0 0 14px
      cursor pointer
  &__custom-radio
    width 20px
    height 20px
    border-radius 20px
    background-color white
    display inline-block
    visibility visible
    border 5px solid white
    box-shadow 0 0 4px 0px rgba(42, 35, 38, 1)
    cursor pointer
    position relative
    bottom 2px
    &--active
      background-color #9e005d

@media (max-width 1024px)
  .radios
    font-size 20px

@media (max-width 375px)
  .radios
    font-size 14px
</style>

