<template>
  <div class="section-content-explore-lightbox-force-legend">
    <div class="section-content-explore-lightbox-force-legend__row">
      <div :class="[ 'legend', 'legend--pointer', { 'legend--fadeout': !toogleStatus['dpp'] } ]" v-show="hasWonCandidateIn('民主進步黨')" @click="toogleCircle('dpp')">
        <div class="legend__circle legend__circle--dpp"></div>
        民主進步黨
      </div>
      <div :class="[ 'legend', 'legend--pointer', { 'legend--fadeout': !toogleStatus['kmt'] } ]" v-show="hasWonCandidateIn('中國國民黨')" @click="toogleCircle('kmt')">
        <div class="legend__circle legend__circle--kmt"></div>
        中國國民黨
      </div>
      <div :class="[ 'legend', 'legend--pointer', { 'legend--fadeout': !toogleStatus['npp'] } ]" v-show="hasWonCandidateIn('時代力量')" @click="toogleCircle('npp')">
        <div class="legend__circle legend__circle--npp"></div>
        時代力量
      </div>
      <div :class="[ 'legend', 'legend--pointer', { 'legend--fadeout': !toogleStatus['tpp'] } ]" v-show="hasWonCandidateIn('台灣民眾黨')" @click="toogleCircle('tpp')">
        <div class="legend__circle legend__circle--npp"></div>
        台灣民眾黨
      </div>
      <div :class="[ 'legend', 'legend--pointer', { 'legend--fadeout': !toogleStatus['tsp'] } ]" v-show="hasWonCandidateIn('台灣基進')" @click="toogleCircle('tsp')">
        <div class="legend__circle legend__circle--tsp"></div>
        台灣基進
      </div>
      <div :class="[ 'legend', 'legend--pointer', { 'legend--fadeout': !toogleStatus['pfp'] } ]" v-show="hasWonCandidateIn('親民黨')" @click="toogleCircle('pfp')">
        <div class="legend__circle legend__circle--pfp"></div>
        親民黨
      </div>
      <div :class="[ 'legend', 'legend--pointer', { 'legend--fadeout': !toogleStatus['npsu'] } ]" v-show="hasWonCandidateIn('無黨團結聯盟')" @click="toogleCircle('npsu')">
        <div class="legend__circle legend__circle--npsu"></div>
        無黨團結聯盟
      </div>
      <div :class="[ 'legend', 'legend--pointer', { 'legend--fadeout': !toogleStatus['indie'] } ]" v-show="hasWonCandidateIn('無黨籍')" @click="toogleCircle('indie')">
        <div class="legend__circle legend__circle--indie"></div>
        無黨籍
      </div>
    </div>
    <div class="section-content-explore-lightbox-force-legend__row">
      <div class="legend" v-show="dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedHasLostCandidate">
        <img class="legend__circle" src="/proj-assets/political-contribution/explore/lost.png" alt="">
        未當選立委
      </div>
      <div class="legend">
        <img class="legend__normal" src="/proj-assets/political-contribution/explore/line.png" alt="">
        金流多寡
      </div>
      <div class="legend">
        <img class="legend__multiple-circles" src="/proj-assets/political-contribution/explore/circle.png" alt="">
        總額多寡
      </div>
      <div class="legend">
        <img class="legend__company" src="/proj-assets/political-contribution/explore/group.png" alt="">
        集團
      </div>
      <div class="legend">
        <img class="legend__company" src="/proj-assets/political-contribution/explore/company.png" alt="">
        公司
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty, filter, forEach, } from 'lodash'
import * as d3 from 'd3'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, } = createNamespacedHelpers('PoliticalContribution')

export default {
  watch: {
    dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedWonGroupByParty () {
      forEach(this.toogleStatus, (value, key) => {
        this.toogleStatus[key] = true
      })
    },
    mouseoverIdentityId () {
      forEach(this.toogleStatus, (value, key) => {
        this.toogleStatus[key] = true
      })
    }
  },
  data () {
    return {
      toogleStatus: {
        dpp: true,
        kmt: true,
        npp: true,
        pfp: true,
        npsu: true,
        indie: true,
      }
    }
  },
  computed: {
    ...mapState({
      mouseoverIdentityId: state => state.section.explore.force.mouseoverIdentityId
    }),
    ...mapGetters([
      'dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedWonGroupByParty',
      'dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedHasLostCandidate'
    ]),
    wonPartyNameList () {
      return Object.keys(this.dataCompanyDonateCurrentOrdinalNameLightboxShownRelatedWonGroupByParty)
    },
    wonPartyNameListTranslated () {
      return this.wonPartyNameList.map(partyName => this.$t(`POLITICAL_CONTRIBUTION.PARTY['${partyName}']`))
    },
    isAllToogleOff () {
      return filter(this.toogleStatus, (status, partyName) => {
        return this.wonPartyNameListTranslated.includes(partyName) && !status
      }).length === this.wonPartyNameListTranslated.length
    },
    isAllToogleOn () {
      const wonPartyNameListTranslated = this.wonPartyNameList.map(partyName => this.$t(`POLITICAL_CONTRIBUTION.PARTY['${partyName}']`))
      return filter(this.toogleStatus, (status, partyName) => {
        return this.wonPartyNameListTranslated.includes(partyName) && status
      }).length === this.wonPartyNameListTranslated.length
    },
  },
  methods: {
    hasWonCandidateIn (party) {
      return this.wonPartyNameList.includes(party)
    },
    toogleCircle (party) {
      // this.toogleStatus[party] = !this.toogleStatus[party]

      // d3.selectAll('line')
      //   .style('stroke-opacity', '.08')
      // d3.selectAll('circle')
      //   .style('opacity', '.08')
      // d3.selectAll('image')
      //   .style('opacity', '.08')

      // forEach(this.wonPartyNameListTranslated, party => {
      //   if (this.toogleStatus[party]) {
      //     d3.selectAll(`.circle-${party}`)
      //       .style('opacity', '1')
      //   }
      // })

      // if (this.isAllToogleOff) {
      //   d3.selectAll('line')
      //     .style('stroke-opacity', '.7')
      //   d3.selectAll('circle')
      //     .style('opacity', '1')
      //   d3.selectAll('image')
      //     .style('opacity', '1')
      // }

      // if (this.isAllToogleOn) {
      //   d3.selectAll('line')
      //     .style('stroke-opacity', '.7')
      //   d3.selectAll('circle')
      //     .style('opacity', '1')
      //   d3.selectAll('image')
      //     .style('opacity', '1')
          
      //   forEach(this.wonPartyNameListTranslated, party => {
      //     this.toogleStatus[party] = false
      //   })
      // }
      if (this.toogleStatus[party]) {
        d3.selectAll(`.links-party-${party}`)
          .style('stroke-opacity', '.08')
        d3.selectAll(`.nodes-party-${party}`)
          .style('opacity', '.08')
      } else {
        d3.selectAll(`.links-party-${party}`)
          .style('stroke-opacity', '.7')
        d3.selectAll(`.nodes-party-${party}`)
          .style('opacity', '1') 
      }

      this.toogleStatus[party] = !this.toogleStatus[party]
    }
  },
}
</script>


<style lang="stylus" scoped>
.section-content-explore-lightbox-force-legend
  display flex
  flex-direction column
  background-color white
  &__row
    display flex
    justify-content center
    & + &
      margin 10px 0 0 0

.legend
  display flex
  justify-content flex-start
  align-items center
  font-size 18px
  user-select none
  & + &
    margin 0 0 0 10px
  &--pointer
    cursor pointer
  &--fadeout
    opacity .3
  &__circle
    display inline-block
    width 16px
    height 16px
    border-radius 8px
    margin 0 3px 3px 0
    &--dpp
      background #53a66f
    &--kmt
      background #0071bc
    &--npp
      background #fcc037
    &--npsu
      background #c7195c
    &--indie
      background #736357
    &--pfp
      background #eb6c1f
  &__party-name
    border-bottom 1px solid transparent
  &__normal
    display inline-block
    width 16px
    height 16px
    margin 0 10px 0 0
  &__multiple-circles
    width 24px
    position relative
    left -4px
  &__company
    display inline-block
    width 16px
    margin 0 3px 5px 0
</style>

