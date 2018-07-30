<template>
  <div class="section-content-explore-lightbox-info-donates">
    <p>總收入 <span class="section-content-explore-lightbox-info-donates__highlight" v-text="candidateDonatesTotalComputed"></span> 萬元</p>
    <p>營利事業收入 <span class="section-content-explore-lightbox-info-donates__highlight" v-text="candidateDonatesCompanyComputed"></span> 萬元</p>
    <p>捐贈公司數 <span class="section-content-explore-lightbox-info-donates__highlight" v-text="candidateDonatesCompanyCount"></span> 家</p>
  </div>
</template>

<script>
export default {
  props: {
    candidateDonatesTotal: {
      type: String,
      required: true,
    },
    candidateDonatesCompany: {
      type: String,
      required: true,
    },
    candidateDonatesCompanyCount: {
      type: String,
      required: true,
    },
  },
  computed: {
    candidateDonatesTotalComputed () {
      return (Number(this.candidateDonatesTotal.split(',').join('')) / 10000).toFixed(1)
    },
    candidateDonatesCompanyComputed () {
      return (Number(this.candidateDonatesCompany.split(',').join('')) / 10000).toFixed(1)
    },
  }
}
</script>

<style lang="stylus" scoped>
.section-content-explore-lightbox-info-donates
  p
    font-size 20px
    margin 10px 0
  &__highlight
    font-size 34px
    font-weight 600
    line-height 1
    color #9e005d
</style>


