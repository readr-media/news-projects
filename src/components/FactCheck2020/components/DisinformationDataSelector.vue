<template>
  <div class="data-selector">
    <div class="selector-container">
      <div class="selector__heading">
        <p>候選人</p>
        <button @click="selectCandidate()">都看</button>
      </div>
      <div class="selector__options">
        <button
          :class="{ active: candidate === '蔡英文' }"
          @click="selectCandidate('蔡英文')"
        >
          蔡英文
        </button>
        <button
          :class="{ active: candidate === '韓國瑜' }"
          @click="selectCandidate('韓國瑜')"
        >
          韓國瑜
        </button>
      </div>
    </div>
    <div class="selector-container">
      <div class="selector__heading">
        <p>真的假的</p>
        <button @click="selectAuthenticity()">都看</button>
      </div>
      <div class="selector__options">
        <button
          :class="{ active: authenticity === '真實' }"
          @click="selectAuthenticity('真實')"
        >
          正確
        </button>
        <button
          :class="{ active: authenticity === '含有錯誤訊息' }"
          @click="selectAuthenticity('含有錯誤訊息')"
        >
          含有錯誤訊息
        </button>
        <button
          :class="{ active: authenticity === '片面事實' }"
          @click="selectAuthenticity('片面事實')"
        >
          片面事實
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DisinformationDataSelector',
  props: {
    authenticity: {
      type: String,
      required: true
    },
    candidate: {
      type: String,
      required: true
    }
  },
  methods: {
    selectCandidate (value = '') {
      this.candidate === value ? this.$emit('update:candidate', '') : this.$emit('update:candidate', value)
    },
    selectAuthenticity (value = '') {
      this.authenticity === value ? this.$emit('update:authenticity', '') : this.$emit('update:authenticity', value)
    }
  }
}
</script>
<style lang="stylus" scoped>

.selector-container
  padding 15px 10px
  background-color rgba(255, 255, 255, .1)
  border-radius 4px
  & + .selector-container
    margin-top 5px
  button
    cursor pointer
.selector
  &__heading
    display flex
    justify-content space-between
    align-items center
    p
      margin-left 5px
    button
      padding-right 5px
      color #e56300
      font-size .875rem
  &__options
    display flex
    flex-wrap wrap
    margin-top 10px
    button
      width calc( (100% - 30px) / 3 )
      margin 10px 5px 0
      padding .5em
      color #fff
      text-align center
      background-color rgba(155, 155, 155, .5)
      border-radius 4px
      transition background-color .5s
      &:hover, &.active
        background-color #e56300

</style>