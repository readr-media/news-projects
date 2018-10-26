<template>
  <section class="conversations">
    <div class="conversations__list-container list-container">
      <ConversationsList
        v-for="(time, i) in timeline"
        :key="i"
        class="list-container__list"
        :time="time"
      />
    </div>
  </section>
</template>

<script>
import ConversationsList from './ConversationsList.vue'

export default {
  watch: {
    footerHeight () {
      if (this.footerHeight !== 0) {
        this.createScroller()
      }
    }
  },
  props: {
    timeline: {
      type: Array,
      required: true
    },
    footerHeight: {
      type: Number,
      required: true,
    }
  },
  components: {
    ConversationsList,
  },
  computed: {
  },
  methods: {
    createScroller () {
      require('intersection-observer')
      const scrollama = require('scrollama')
      const scroller = scrollama()

      const windowHeight = window.innerHeight
      const offsetFooter = this.footerHeight / windowHeight
      const offsetLegends = 38 / windowHeight
      const offset = 1 - offsetFooter - offsetLegends

      scroller
        .setup({
          step: '.list-container__list', // required - class name of trigger steps
          offset: offset,
          // once: true,
          // debug: true,
        })
        .onStepEnter(({element, index, direction}, stepsRef) => {
          this.$emit('stepsRefChange', stepsRef)
        })
        // .onStepExit(({element, index, direction}) => {
        //   // console.log('exit:' + index);
        // })

      window.addEventListener('resize', scroller.resize)
    }
  },
  mounted () {
  },
}
</script>

<style lang="stylus" scoped>
.conversations
  background-color #e6e6e6
  padding 0 10px
  padding-top calc(70px + 10px)
  position relative
  &__list-container
    height 100%
    overflow-y scroll
    padding 0 0 38px 0 !important
  &__legends
    width calc(100% - 20px)
    position absolute
    bottom 0

.list-container
  &__list
    & + &
      margin 13px 0 0 0 !important
</style>

