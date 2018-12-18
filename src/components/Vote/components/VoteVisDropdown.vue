<template>
  <div class="dropdown-wrapper">
    <div class="dropdown-wrapper__dropdown" @click="toggleDropdown" v-click-outside="closeDropdown" v-text="placeholder"></div>
    <ul v-show="showDropdown" class="dropdown-wrapper__list list">
      <li class="list__list-item" @click="clickListItem('')">看全部縣市</li>
      <li class="list__list-item" @click="clickListItem('基隆市')">基隆市</li>
      <li class="list__list-item" @click="clickListItem('臺北市')">臺北市</li>
      <li class="list__list-item" @click="clickListItem('新北市')">新北市</li>
      <li class="list__list-item" @click="clickListItem('桃園市')">桃園市</li>
      <li class="list__list-item" @click="clickListItem('新竹市')">新竹市</li>
      <li class="list__list-item" @click="clickListItem('新竹縣')">新竹縣</li>
      <li class="list__list-item" @click="clickListItem('苗栗縣')">苗栗縣</li>
      <li class="list__list-item" @click="clickListItem('臺中市')">臺中市</li>
      <li class="list__list-item" @click="clickListItem('彰化縣')">彰化縣</li>
      <li class="list__list-item" @click="clickListItem('南投縣')">南投縣</li>
      <li class="list__list-item" @click="clickListItem('雲林縣')">雲林縣</li>
      <li class="list__list-item" @click="clickListItem('嘉義市')">嘉義市</li>
      <li class="list__list-item" @click="clickListItem('嘉義縣')">嘉義縣</li>
      <li class="list__list-item" @click="clickListItem('臺南市')">臺南市</li>
      <li class="list__list-item" @click="clickListItem('高雄市')">高雄市</li>
      <li class="list__list-item" @click="clickListItem('屏東縣')">屏東縣</li>
      <li class="list__list-item" @click="clickListItem('宜蘭縣')">宜蘭縣</li>
      <li class="list__list-item" @click="clickListItem('花蓮縣')">花蓮縣</li>
      <li class="list__list-item" @click="clickListItem('臺東縣')">臺東縣</li>
      <li class="list__list-item" @click="clickListItem('澎湖縣')">澎湖縣</li>
      <li class="list__list-item" @click="clickListItem('金門縣')">金門縣</li>
      <li class="list__list-item" @click="clickListItem('連江縣')">連江縣</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    countyFilter: {
      type: String,
      default: '',
    }
  },
  data () {
    return {
      showDropdown: false,
    }
  },
  computed: {
    placeholder () {
      return this.countyFilter === '' ? '點選看個別縣市' : this.countyFilter
    }
  },
  methods: {
    toggleDropdown () {
      this.showDropdown = !this.showDropdown
    },
    clickListItem (county) {
      this.$emit('update:countyFilter', county)
      this.showDropdown = false
    },
    closeDropdown () {
      this.showDropdown = false
    }
  },
  directives: {
    'click-outside': {
      bind (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          // here I check that click was outside the el and his childrens
          if (!(el == event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      },
    },
  },  
}
</script>

<style lang="stylus" scoped>
.dropdown-wrapper
  position relative
  user-select none
  &__dropdown
    width 500px
    height 60px
    border-radius 8px
    background-color #061c37
    color white
    border 2px solid white
    font-size 30px
    font-weight 300
    display flex
    justify-content center
    align-items center
    cursor pointer
    transition background-color .15s ease-out, color .15s ease-out, font-weight .15s ease-out
    &:focus
      outline none
    &:hover, &--active
      background-color white
      color #061c37
      font-weight 400
  &__list
    position absolute
    top 70px
    left 0
    width 100%
    list-style none
    margin 0
    padding 0
    border-radius 8px
    background-color #061c37
    color white
    border 2px solid white
    font-size 30px
    font-weight 300
    text-align center
    padding 10px 0
    z-index 10000

.list
  height 313px
  overflow-y scroll
  &__list-item
    cursor pointer
    margin 5px 0
    transition background-color .15s ease-out, color .15s ease-out, font-weight .15s ease-out
    padding 10px 0
    &:hover
      background-color white
      color #061c37
      font-weight 400
  &::-webkit-scrollbar
    -webkit-appearance none
  &::-webkit-scrollbar:vertical
    width 11px
  &::-webkit-scrollbar:horizontal
    height 11px
  &::-webkit-scrollbar-thumb
    border-radius 8px
    border 2px solid white /* should match background, can't be transparent */
    background-color rgba(0, 0, 0, .5)

@media (max-width 768px)
  .dropdown-wrapper
    &__dropdown
      width 100%
      height 40px
      font-size 20px
    &__list
      font-size 20px
</style>
