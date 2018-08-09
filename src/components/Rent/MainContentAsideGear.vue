<template>
  <div class="inactive-gear">
    <div class="inactive-gear__question">
      <span v-text="question"></span>
      <span class="mark" v-if="hasDescription" v-text="mark" @click="checkDesc"></span>
    </div>
    <div class="inactive-gear__description" v-show="isDescActive"><span v-text="description"></span></div>
    <div class="inactive-gear__options"><MainContentAsideGearOptions :options="options" :name="name" :isMulti="isMulti"></MainContentAsideGearOptions></div>
  </div>
</template>
<script>
  import MainContentAsideGearOptions from 'src/components/Rent/MainContentAsideGearOptions.vue'
  export default {
    name: 'MainContentAsideGear',
    components: {
      MainContentAsideGearOptions,
    },
    computed: {
      description () {
        return this.$t(`RENT.INACTIVE_GEAR.${this.name}.DESCRIPTION`)
      },
      hasDescription () {
        return this.description
      },
      mark () {
        return this.$t(`RENT.INACTIVE_GEAR.MARK`)
      },
      question () {
        return this.$t(`RENT.INACTIVE_GEAR.${this.name}.QUESTION`)
      },
    },
    data () {
      return {
        isDescActive: false,
      }
    },
    methods: {
      checkDesc () {
        this.isDescActive = true
      },
    },
    mounted () {},
    props: {
      options: {
        type: Object,
        default: {},
      },
      name: {
        type: String,
        default: '',
      },
      isMulti: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>
<style lang="stylus" scoped>
  .inactive-gear
    &:not(:first-child)
      margin-top 65px
    > div
      margin-bottom 22px
      &:not(:first-child)
        margin-top 22px
    &__question
      font-size 1.5rem
      font-weight 100
      color #313131
      line-height normal
      .mark
        color #e97d8f
        line-height normal
        font-size 1rem
        cursor pointer
    &__description
      font-size 1rem
      font-weight 100
      line-height normal
      color #313131
      animation fade-in 0.5s linear
  @keyframes fade-in
    0%
      opacity 0
    100%
      opacity 1
</style>