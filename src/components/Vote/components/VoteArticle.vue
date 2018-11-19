<template>
  <article class="article">
    <h1 class="article__title">政治世家標題標題標題</h1>
    <VoteArticleCredits class="article__credits"/>
    <div class="article__content content">
      <p>去有的表開成縣品期心……名然知數算隨導，方孩青……早個我寫相裡支自的去官在調的解有現要金消代……漸門管長曾綠，面身雖。同會野。童已青作裡土農國歡點要。時保來管。票校在外什校年國世作福國都談民；結具黨府神，引水自一市未目市做片光麼個父父？突思房民本以、到物了想我，藥問樓感她什好應說法、統各詩念……水金毛達可程並微看以說、過水新標視時覺；在開全組辦級油，學心第公又……活比不表知。縣一回表得金分企大命關男很廣，設原提間該人現路型的孩員的每此月，真式念。</p>
      <p>著長決個縣大境接們老化愛件息！合對術方味公公之，種西河分成元較人將，來沒的旅速品些王天初原世明天局覺話回家整。</p>
    </div>
  </article>
</template>

<script>
import VoteArticleCredits from './VoteArticleCredits.vue'

export default {
  components: {
    VoteArticleCredits,
  }
}
</script>

<style lang="stylus" scoped>
.article
  max-width 1000px
  display flex
  flex-direction column
  align-items center
  &__title
    font-size 80px
    font-weight normal
  &__credits
    margin 60px 0 0 0
  &__content
    margin 60px 0 0 0

.content
  font-size 24px
  line-height 1.67
  p + p
    margin 60px 0 0 0
</style>

