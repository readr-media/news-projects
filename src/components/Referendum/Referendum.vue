<template>
  <div class="referendum">
    <ReferendumHeader></ReferendumHeader>
    <Intro></Intro>
    <Finding></Finding>
    <Pk v-if="isDesktop && isClientSide && isDataDone"></Pk>
    <WhatPeopleSay></WhatPeopleSay>
    <WhatExpertsSay></WhatExpertsSay>
    <Conclusion></Conclusion>
    <div class="referendum__credit">
      <div class="mirrormedia"><img src="/proj-assets/referendum/icons/logo-mm.png"></div>
      <div class="people"><span v-html="$t('REFERENDUM.CREDIT')"></span></div>
    </div>
    <footer>
      <RelatedReports theme="light" :displayTitle="true"></RelatedReports>    
    </footer>    
  </div>
</template>
<script>
  import Conclusion from './Conclusion.vue'
  import Finding from './Finding.vue'
  import Intro from './Intro.vue'
  import Pk from './Pk.vue'
  import RelatedReports from 'src/components/RelatedReports.vue'
  import ReferendumHeader from './ReferendumHeader.vue'
  import ReferendumStoreModule from 'src/store/modules/Referendum'
  import WhatExpertsSay from './WhatExpertsSay.vue'
  import WhatPeopleSay from './WhatPeopleSay.vue'
  import axios from 'axios'
  import { get, map } from 'lodash' 

  const debug = require('debug')('CLIENT:Referendum')
  const fetchRefAppDetail = (store, targ_ref) => store.dispatch('Referendum/FETCH_APP_DETAIL', { targ_ref })
  export default {
    name: 'Referendum',
    components: {
      Conclusion,
      Finding,
      Intro,
      Pk,
      ReferendumHeader,
      RelatedReports,
      WhatExpertsSay,
      WhatPeopleSay,
    },
    computed: {
      isDesktop () {
        return get(this.$store, 'state.useragent.isDesktop')
      },
    },
    data () {
      return {
        isClientSide: false,
        isDataDone: false,
      }
    },
    metaInfo () {
      return {
        // title: this.$t('RENT.TITLE'),
        // description: this.$t('RENT.DESCRIPTION'),
        metaUrl: 'rent',
        metaImage: 'rent/og-image-rent.jpg',
      }
    },
    methods: {

    },
    mounted () {
      this.isClientSide = process.browser
      this.$store.registerModule('Referendum', ReferendumStoreModule)
      if (this.isDesktop) {
        Promise.all(map(new Array(10), (o, i) => fetchRefAppDetail(this.$store, `no${i + 7}`))).then(() => {
          debug('GOT ALL DATA')
          // this.raw = get(this.$store, `state.Referendum.applicationDetail`)
          // this.$forceUpdate()
          this.isDataDone = true
        })
      }
    },
  }
</script>
<style lang="stylus" scoped>
.referendum
  &__credit
    margin-top 100px
    position relative
    z-index 10    
    .mirrormedia
      height 28px
      text-align center
      img
        height 100%
        object-position center
        object-size contain
    .people
      margin-top 20px
      font-size 0.875rem
      font-weight 100
      font-style normal
      font-stretch normal
      line-height normal
      letter-spacing normal
      text-align center
      color #313131
footer
  margin 60px 0
  position relative
  z-index 10

@media screen and (min-width: 415px)
  footer
    margin 140px 0
</style>