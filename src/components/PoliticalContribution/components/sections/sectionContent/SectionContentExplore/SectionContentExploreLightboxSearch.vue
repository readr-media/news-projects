<template>
	<div class="section-content-explore-lightbox-search">
    <vue-autosuggest
      :class="[ 'autosuggest-container', { 'autosuggest-container--available': isSuggestionAvailable } ]"
      :suggestions="suggestions"
      :inputProps="inputProps"
      :sectionConfigs="sectionConfigs"
      :renderSuggestion="renderSuggestion"
		/>
	</div>
</template>

<script>
import { get, forEach, isEmpty, groupBy, mapValues, find, union, isNaN } from 'lodash'
import axios from 'axios'
import { VueAutosuggest } from 'vue-autosuggest'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  components: {
    VueAutosuggest
  },
  watch: {
    isSuggestionAvailable () {
      if (this.isSuggestionAvailable) {
        this.inputProps.placeholder = '搜尋候選人、集團、公司名稱'
      }
    },
  },
  data () {
    return {
      inputProps: {
        id: 'autosuggest__input',
        onInputChange: this.onInputChange,
        placeholder: 'Loading...',
        class: 'form-control',
        name: 'hello'
      },
      suggestions: [],
      sectionConfigs: {
        seventh: {
          limit: 6,
          label: '第七屆',
          onSelected: selected => {
            this.$router.replace(`explore?name=${selected.item.name}&ordinal=${this.getOrdinalNum(selected.name)}`)
            this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_RADIO_PICKED', selected.name)
          }
        },
        eighth: {
          limit: 6,
          label: '第八屆',
          onSelected: selected => {
            this.$router.replace(`explore?name=${selected.item.name}&ordinal=${this.getOrdinalNum(selected.name)}`)
            this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_RADIO_PICKED', selected.name)
          }
        },
        ninth: {
          limit: 6,
          label: '第九屆',
          onSelected: selected => {
            this.$router.replace(`explore?name=${selected.item.name}&ordinal=${this.getOrdinalNum(selected.name)}`)
            this.$store.commit('PoliticalContribution/SET_SECTION_EXPLORE_RADIO_PICKED', selected.name)
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      corpNameTaxIdMapping: state => state.corpNameTaxIdMapping
    }),
    ...mapGetters([
      'rawDataBasicAllOrdinalGroupByCandidate',
    ]),
    rawDataBasicAllOrdinalGroupByCandidateSuggestion () {
      return mapValues(this.rawDataBasicAllOrdinalGroupByCandidate, ordinalObj => {
        return Object.values(ordinalObj).map(candidate => {
          return {
            type: 'candidate',
            name: candidate[0]['候選人'],
            isWon: candidate[0]['當選註記'] === '*',
            party: candidate[0]['推薦政黨'],
          }
        })
      })
    },
    corpNameTaxIdMappingGroupByOrdinal () {
      return mapValues(groupBy(this.corpNameTaxIdMapping, '屆數'), corpArray => corpArray.map(corp => {
        return {
          type: 'corp',
          name: corp['名稱'],
          isGroup: isNaN(Number(corp['名稱／統一編號'])),
        }
      }))
    },
    isSuggestionAvailable () {
      return !isEmpty(this.corpNameTaxIdMapping) && !isEmpty(this.rawDataBasicAllOrdinalGroupByCandidate)
    }
  },
  methods: {
    onInputChange (val) {
      if (val === '' || val === undefined || val === null) {
        return
      }

      this.suggestions = []
      forEach(this.rawDataBasicAllOrdinalGroupByCandidateSuggestion, (value, key) => {
        const filtering = this.filterResults(value, val, 'name')
        this.suggestions.push({ name: key, data: filtering })
      })
      forEach(this.corpNameTaxIdMappingGroupByOrdinal, (value, key) => {
        const filtering = this.filterResults(value, val, 'name')
        const pushTargetOrdinal = find(this.suggestions, [ 'name', this.getOrdinalString(key) ])
        if (pushTargetOrdinal) {
          pushTargetOrdinal.data = union(pushTargetOrdinal.data, filtering)
        }
        // this.suggestions.push({ name: this.getOrdinalString(key), data: filtering })
      })
    },
    filterResults (data, text, field) {
      return data
        .filter(item => {
          if (item[field].toLowerCase().indexOf(text.toLowerCase()) > -1) {
            return item[field]
          }
        })
        .sort()
    },
    renderSuggestion (suggestion) {
      return (
        <div class="suggestion-container">
          <img class={{ avatar: true }} src={ this.getAvatarSrc(suggestion.item) } />
          <span class={ `suggestion-container__name--${this.$t(`POLITICAL_CONTRIBUTION.PARTY['${suggestion.item.party}']`)}` }>{suggestion.item.name}</span>
        </div>
      )
    },
    getAvatarSrc (suggestionItem) {
      if (suggestionItem.type === 'candidate') {
        return `/proj-assets/political-contribution/candidate-portraits/${suggestionItem.isWon ? suggestionItem.name : 'lost'}.png`
      } else if (suggestionItem.type === 'corp') {
        return `/proj-assets/political-contribution/explore/${suggestionItem.isGroup ? 'group' : 'company'}.png`
      }
    },
    getOrdinalNum (ordinalString) {
      switch (ordinalString) {
        case 'seventh':
          return 7
        case 'eighth':
          return 8
        case 'ninth':
          return 9
      }
    },
    getOrdinalString (ordinalNum) {
      switch (ordinalNum) {
        case '7':
          return 'seventh'
        case '8':
          return 'eighth'
        case '9':
          return 'ninth'
      }
    },
  },
  created () {
    if (this.isSuggestionAvailable) {
      this.inputProps.placeholder = '搜尋候選人、集團、公司名稱'
    }
  }
}
</script>

<style lang="stylus">
.section-content-explore-lightbox-search
  // -webkit-font-smoothing antialiased
  // -moz-osx-font-smoothing grayscale
  width 300px
  height 36px
  border 1px solid gray
  background-color white

.autosuggest-container
  #autosuggest__input
    cursor wait
  &--available
    #autosuggest__input
      cursor initial

.suggestion-container
  display flex
  align-items center
  background-color white
  filter brightness(100%)
  transition filter .25s
  padding 15px
  &:hover
    filter brightness(90%)
  &__name
    &--dpp
      color #53a66f
    &--kmt
      color #0071bc
    &--npp
      color #fcc037
    &--npsu
      color #c7195c
    &--indie
      color #736357
    &--pfp
      color #eb6c1f

.avatar
  height 25px
  width 25px
  border-radius 20px
  margin-right 10px

#autosuggest__input
  outline none
  position relative
  display block
  border 1px solid #616161
  padding 10px
  width 100%
  box-sizing border-box
  -webkit-box-sizing border-box
  -moz-box-sizing border-box
  &.autosuggest__input-open
    border-bottom-left-radius 0
    border-bottom-right-radius 0

.autosuggest__results-container
  position relative
  width 100%

.autosuggest__results
  font-weight 400
  margin 0
  position absolute
  z-index 10000001
  width 100%
  border 1px solid #e0e0e0
  border-bottom-left-radius 4px
  border-bottom-right-radius 4px
  background white
  padding 0px
  max-height 400px
  overflow-y scroll
  ul
    list-style none
    padding-left 0
    margin 0
  .autosuggest__results_item
    cursor pointer
    // padding 15px
  .autosuggest__results_title
    color gray
    font-size 11px
    margin-left 0
    padding 15px 13px 5px
    border-top 1px solid lightgray

#autosuggest
  ul
    &:nth-child(1)
      & > .autosuggest__results_title
        border-top none

.autosuggest__results .autosuggest__results_item:active,
.autosuggest__results .autosuggest__results_item:hover,
.autosuggest__results .autosuggest__results_item:focus,
.autosuggest__results
  .autosuggest__results_item.autosuggest__results_item-highlighted
    background-color #f6f6f6

// .section-content-explore-lightbox-search
//   width 300px
//   height 36px
//   border 1px solid gray
//   background-color white

@media (max-width 1440px)
  .section-content-explore-lightbox-search
    width 150px 
</style>

