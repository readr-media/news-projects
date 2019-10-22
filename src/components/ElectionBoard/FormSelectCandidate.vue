<template>
  <div class="select-candidate">
    <div class="select-container">
      <select
        v-model="selectedName"
        @blur="handleSelectBlur"
        @focus="handleSelectFocus"
        @change="handleSelectChange"
      >
        <option disabled value="">請選擇候選人</option>
        <optgroup label="縣 / 市長">
          <option v-for="item in mayorCandidatesFiltered" :key="item.uid" :value="item.name" v-text="item.name"></option>
        </optgroup>
        <optgroup label="縣 / 市議員">
          <option v-for="item in councilorCandidatesFiltered" :key="item.uid" :value="item.name" v-text="item.name"></option>
        </optgroup>
      </select>
    </div>
    <!-- <div v-if="index > 1" class="select-candidate__minus" @click="$emit('minusCandidateAmount', selectedId)">
      &#10134;
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'FormSelectCandidate',
  // directives: {
  //   'click-outside': {
  //     bind (el, binding, vnode) {
  //       el.clickOutsideEvent = function (event) {
  //         if (!(el == event.target || el.contains(event.target))) {
  //           vnode.context[binding.expression](event)
  //         }
  //       }
  //       document.body.addEventListener('click', el.clickOutsideEvent)
  //     },
  //     unbind (el) {
  //       document.body.removeEventListener('click', el.clickOutsideEvent)
  //     }
  //   }
  // },
  props: {
    // index: {
    //   type: Number,
    // },
    councilorCandidates: {
      type: Array,
    },
    mayorCandidates: {
      type: Array,
    },
    selectedIds: {
      type: Array,
    }
  },
  data () {
    return {
      selectedId: '',
      selectedName: '',
      // showCandidateList: false,
    }
  },
  computed: {
    selectedIdsWithoutSelf () {
      return this.selectedIds.filter(id => id !== this.selectedId)
    },
    candidates () {
      return this.mayorCandidates.concat(this.councilorCandidates)
    },
    councilorCandidatesFiltered () {
      return this.councilorCandidates.filter(item => !this.selectedIdsWithoutSelf.includes(item.id))
    },
    mayorCandidatesFiltered () {
      return this.mayorCandidates.filter(item => !this.selectedIdsWithoutSelf.includes(item.id))
    }
  },
  watch: {
    selectedName (newValue) {
      const id = this.candidates.filter(candidate => candidate.name === newValue)[0].id
      this.selectedId = id
    },
    selectedId (newValue, oldValue) {
      this.$emit('updateSelectedId', newValue, oldValue)
    }
  },
  methods: {
    // closeCandidateList () {
    //   this.showCandidateList = false
    // },
    handleSelectBlur (e) {
      e.target.parentNode.classList.remove('open')
    },
    handleSelectChange (e) {
      e.target.parentNode.classList.remove('open')
    },
    handleSelectFocus (e) {
      e.target.parentNode.classList.add('open')
    },
    selectCandidate (id) {
      this.selectedId = id
    }
  }
}
</script>
<style lang="stylus" scoped>
theme-color = #fa6e59

.select-candidate
  display flex
  position relative
  // margin-top .5em
  .select-container
    flex 1
    position relative
    background-color #a0a0a0
    border-radius 2px
    &.open::after
      transform rotate(180deg)
    &::after
      content ''
      position absolute
      top 0
      right 0
      width 30px
      height 30px
      background-image url(/proj-assets/election-board/images/filter.png)
      background-size 16px auto
      background-position center center
      background-repeat no-repeat
      transition transform .5s
    & select
      position relative
      z-index 10
      width 100%
      height 32px
      padding 0 0 0 12px
      // text-indent .5em
      background-color transparent
      border none
      appearance none
    // > input
    //   width 100%
    //   height 30px
    //   padding-left .5em
    //   background-color #a0a0a0
    //   border none
    //   border-radius 0
    // .btn--dropdown
    //   position absolute
    //   top 0
    //   right 0
    //   width 30px
    //   height 30px
    //   background-image url(/proj-assets/election-board/images/filter.png)
    //   background-size 16px auto
    //   background-position center center
    //   background-repeat no-repeat
    //   transition transform .5s
    //   &.open
    //     transform rotate(180deg)
  // &__list
  //   position absolute
  //   top 30px
  //   left 0
  //   right 0
  //   z-index 10
  //   max-height 180px
  //   overflow-y auto
  //   background-color #2b2b2b
  //   > div
  //     height 30px
  //     padding-left .5em
  // &__item
  //   &.type
  //     color #fa6e59
  // &__minus
  //   margin-left 10px
  //   line-height 30px
  //   color transparent
  //   text-shadow 0 0 0 theme-color
</style>
