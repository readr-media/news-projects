<template>
  <section class="chapter helpless">

    <div class="centerwpr">

      <h2>農民困境：前有斷崖，後有追兵</h2>
      <p>有了興建農舍的「吸力」，自然也有讓農民賣農地、農舍的推力。宜蘭老農葉慶文感嘆：<strong>「活著才重要。農業讓我們農民看不到希望，也活不下去，你說要守護農田，好啊我第一個把地賣給你，讓你一起來守護，好不好？來啊！」</strong></p>

      <p>葉慶文分析，雖然宜蘭一直被視為傳統農業縣，但殘酷的現實是，宜蘭雨水多、日照少，每年只能一穫，一個擁有一甲地（約 3,000 坪）的又會顧的農民，就算領了休耕補助後，一年頂多也只能賺 20 萬元，扣完工錢剩 10 萬元，到底要如何存活？</p>

      <p>反觀，假如農民將一甲農地完整賣出，就算一坪算一萬元，賣地後所得 3,000 萬元，光是銀行利息每年都有 40 萬元上下<a class="noteTrigger" v-on:click="noteToggleContent">註</a>，<span class="noteBlock">以一年定存平均利率 1.032 計算的話，3,000 萬元的年定存利息大約是 31 萬元。</span>換算等於農民得耕種 4 年才能和一年的孳利打平，有什麼道理要求農民繼續種田？</p>

      <p>「以前農地只能農民買，農發條例後大家都能買，用意就是要富麗農村，不要讓農民一輩子當農奴，因為加入 WTO 後，我們農產價格競爭力不足。結果現在吵農舍，水利會不讓人搭排了，農地變成沒有價格，有經濟壓力的農民去農會說要貸款，都不受理了，以前貸款的也被農會討錢，說因為擔保品不足，很多農民走投無路，這什麼道理？」</p>

      <p><strong>「前有斷崖，後有追兵，這就是農民的困境。」</strong>葉慶文難掩沉痛地說。</p>

      <p>不只農民，就連宜蘭縣農業處長游憲廷也認為，宜蘭農業先天體質不良，農業收入還比不上去便利商店打工，政府如果真的關心農舍問題，那就必須解決農業問題，才是對症下藥。「<strong>不然農民老了需要錢，他們期待可以投資小孩去唸書，在這種情況下，誰不會在乎他們的農地值多少錢？而農舍能不能蓋，就會直接影響他們的農地值多少錢，這是很現實的問題。</strong>」游憲廷說。</p>

      <p>雖然宜蘭縣在大家的傳統印象中，一直都是「農業大縣」的形象，然而，根據主計處 2016 年統計資料，宜蘭縣一年的農業產值不過 67.25 億產值，全國排行第 12 名，總產值僅佔第一名雲林縣的 16%。</p>

      <p>有趣的是，<a href="http://agri.e-land.gov.tw/Default.aspx" target="_blank" @click="clickGA">宜蘭縣農業處官方網頁</a>的「重要農業政策及資源專區」中，首先擺放的就是「農業用地興建農舍辦法」，第三個則是「農舍申請人資格切結書」。</p>

      <p>農業不振，究竟是農舍的因還是果？抑或皆如是？</p>

      <swiper></swiper>

    </div>
  </section>
</template>

<script>

import swiper from './swiper.vue';

export default {

  data () {
    return {

    }
  },
  components: {

    'swiper': swiper

  },
  methods: {

    noteToggleContent: function(event){
        this.$emit('noteToggle',event);
    },

    clickGA () {
      window.ga('send', 'event', 'projects', 'click', `e_land`, { nonInteraction: false })
    },

  },
  mounted: function(){

  }
    
}
</script>

<style scoped>
/* .helpless {padding-top:0; padding-bottom:0;} */


@media screen and (max-width: 800px) {



}

</style>