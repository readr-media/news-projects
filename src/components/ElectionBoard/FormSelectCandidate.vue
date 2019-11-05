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
        <optgroup label="總統">
          <option v-for="item in presidentCandidatesFiltered" :key="item.uid" :value="item.name" v-text="item.name"></option>
        </optgroup>
        <optgroup label="立法委員">
          <option v-for="item in legislatorCandidatesFiltered" :key="item.uid" :value="item.name" v-text="item.name"></option>
        </optgroup>
      </select>
    </div>
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
    legislatorCandidates: {
      type: Array,
    },
    presidentCandidates: {
      type: Array,
    },
    selectedIds: {
      type: Array,
    }
  },
  data () {
    return {
      selectedId: '',
      selectedName: ''
    }
  },
  computed: {
    selectedIdsWithoutSelf () {
      return this.selectedIds.filter((id) => id !== this.selectedId)
    },
    candidates () {
      return this.presidentCandidates.concat(this.legislatorCandidates)
    },
    legislatorCandidatesFiltered () {
      return this.legislatorCandidates.filter((item) => !this.selectedIdsWithoutSelf.includes(item.id))
    },
    presidentCandidatesFiltered () {
      return this.presidentCandidates.filter((item) => !this.selectedIdsWithoutSelf.includes(item.id))
    }
  },
  watch: {
    selectedName (newValue) {
      const id = this.candidates.filter((candidate) => candidate.name === newValue)[0].id
      this.selectedId = id
    },
    selectedId (newValue, oldValue) {
      this.$emit('updateSelectedId', newValue, oldValue)
    }
  },
  methods: {
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
      background-color transparent
      border none
      appearance none
</style>
