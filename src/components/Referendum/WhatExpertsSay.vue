<template>
  <div class="what-experts-say">
    <div class="what-experts-say__title"><h2><span v-text="$t('REFERENDUM.WHAT_EXPERTS_SAY.TITLE')"></span></h2></div>
    <WhatExpertsSayDetail
      :avatar="`/proj-assets/referendum/icons/${$t('REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.0.AVATAR')}.png`"
      :name="$t('REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.0.NAME')"
      :saying="$t('REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.0.SAYING')"
      :title="$t('REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.0.TITLE')"></WhatExpertsSayDetail>
    <WhatExpertsSayDetail
      :avatar="`/proj-assets/referendum/icons/${$t('REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.1.AVATAR')}.png`"
      :name="$t('REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.1.NAME')"
      :saying="$t('REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.1.SAYING')"
      :title="$t('REFERENDUM.WHAT_EXPERTS_SAY.ITEMS.1.TITLE')"></WhatExpertsSayDetail>
  </div>
</template>
<script>
  import WhatExpertsSayDetail from './WhatExpertsSayDetail.vue'
  export default {
    name: 'WhatExpertsSay',
    components: {
      WhatExpertsSayDetail,
    },
    methods: {},
    mounted () {},
  }
</script>
<style lang="stylus" scoped>
  .what-experts-say
    padding 50px 0
    &__title
      h2
        font-size 1.5rem
        font-weight 600
        font-style normal
        font-stretch normal
        line-height 1.42
        letter-spacing normal
        text-align center
        color #a40035 
  @media screen and (min-width: 600px) 
    .what-experts-say
      padding 100px 0
      &__title
        h2
          font-size 1.875rem
          line-height 1.48
</style>