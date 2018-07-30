<template>
  <div class="section-content-explore-sorts">
    <h1 class="section-content-explore-sorts__title">排列方式</h1>
    <div class="section-content-explore-sorts__container">
      <button
        :class="[ 'section-content-explore-sorts__sort', { 'section-content-explore-sorts__sort--active': sort === 'GroupByParty' } ]"
        @click="sortBy('GroupByParty')"
      >
        政黨
      </button>
      <button
        :class="[ 'section-content-explore-sorts__sort', { 'section-content-explore-sorts__sort--active': sort === 'SortByDonateTotal' } ]"
        @click="sortBy('SortByDonateTotal')"
      >
        總收入
      </button>
      <button
        :class="[ 'section-content-explore-sorts__sort', { 'section-content-explore-sorts__sort--active': sort === 'SortByDonateCompany' } ]"
        @click="sortBy('SortByDonateCompany')"
      >
        營利事業收入
      </button>
      <button
        :class="[ 'section-content-explore-sorts__sort', { 'section-content-explore-sorts__sort--active': sort === 'SortByDonateCompanyCount' } ]"
        @click="sortBy('SortByDonateCompanyCount')"
      >
        捐贈公司數
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    sort () {
      return this.$store.state.PoliticalContribution.section.explore.navs.sortedBy
    }
  },
  methods: {
    sortBy (type) {
      this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_SORT_BY', type)
    },
  },  
}
</script>

<style lang="stylus" scoped>
.section-content-explore-sorts
  display flex
  flex-direction column
  justify-content center
  align-items center
  &__title
    font-size 19px
    font-weight 600
    text-align center
    color #808080
    margin 6px 0
  &__sort
    height 40px
    // border none
    // border-left 1px solid #808080
    border-radius 24px
    border 1px solid #808080
    cursor pointer
    background-color transparent
    font-size 19px
    color #808080
    padding 0px 17px
    margin 0 5px
    &:focus
      outline none
    // &:last-of-type
    //   border-right 1px solid #808080
    &--active
      color white
      border 1px solid #9e005d
      background-color #9e005d
</style>

