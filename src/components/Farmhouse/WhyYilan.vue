<template>
  <section class="chapter whyYilan">

    <div class="centerwpr dark">

      <h2>為什麼是宜蘭？</h2>

      <p>宜蘭為什麼會從好山好水的農業大縣，走上今天這步田地？</p>
      <p>最直接的原因，就是因為宜蘭離台北太近了。在搜尋引擎鍵入「台北後花園」，首當其衝跳出來的關聯字就是「宜蘭」，緊接著也能找到不少和農舍（與農舍民宿）有關的網頁。自從 2006 年雪山隧道通車後，台北到宜蘭的車程不用一小時，卻能買到具備田園風光、價格低廉的別墅型農舍住宅，這對飽受高房價之苦的台北人來說，自然有其吸引力。</p>
      <p>根據內政部營建署統計，宜蘭縣自《農發條例》通過後所取得的農舍使用執照量全國第一，而且其核可量很明顯是在 2006 年國道五號雪山隧道通車後，才開始一飛沖天。2014 年，宜蘭縣一共發出了 674 筆農舍使用執照，接近同年度苗栗、南投、新竹縣的總和。當年，宜蘭的農舍交易量達到歷史高峰。</p>
      <p>換言之，便利的交通、相鄰的地理位置，加上不合理的台北房價和無法被滿足的購屋需求，使宜蘭農舍成了台北房屋市場的替代選擇商品，也成了宜蘭農舍氾濫的重大「吸力」。</p>

      <div class="chartwpr">
        <!-- <div class="chart--title">歷年農舍使用執照核可數統計</div>
        <div class="chart--source">營建署</div> -->
        <div class="chart--header">
          <div class="chart--title">各縣市農舍佔用農地面積</div>
          <div class="chart--source">資料來源：農委會</div>
        </div>
        <highcharts :options="chartDataF_1_3()" ref="highcharts"></highcharts>
        <div class="chart--note">註：此處所列出的五個縣市，為營建署統計全國發出最多農舍使用執照的前五名，與農委會盤查全國五大農舍數量縣市有所出入。會有排名和數量的落差，是因為農委會並非建築物主管機關，且進行的是農地現況盤查，所以總量會包含農發條例修正前已建農舍，還有許多違法農舍，而且單位是「農地筆數」，不是「農舍數量」。至於營建署統計資料，只包含農發條例修訂後的，合法領有使用執照的「農舍棟數」，特此說明。</div>
      </div>

      <!-- http://jsfiddle.net/weiweihsu/p12tyzbz/2/
      圖 1-3 歷年農舍使用執照核可數統計（註：此處所列出的五個縣市，為營建署統計全國發出最多農舍使用執照的前五名，與農委會盤查全國五大農舍數量縣市有所出入。會有排名和數量的落差，是因為農委會並非建築物主管機關，且進行的是農地現況盤查，所以總量會包含農發條例修正前已建農舍，還有許多違法農舍，而且單位是「農地筆數」，不是「農舍數量」。至於營建署統計資料，只包含農發條例修訂後的，合法領有使用執照的「農舍棟數」，特此說明。）（資料來源：營建署） -->

      <p>只是，如果上述的理由得以成立，為什麼同樣毗鄰大台北都會區的桃園市，其農舍氾濫狀況就沒有如此嚴重呢？</p>
      <p>可能的原因有兩個。首先，桃園的農地被優先拿去種工廠了。根據農委會農地盤查結果，全國農地遭違章工廠佔用面積排行前五名分別是彰化縣、台中市、高雄市、台南市和桃園市，而桃園市農地工廠面積也高達 1,598 公頃，是農舍的 4 倍，說明這兩項農產品的需求迫切性有巨大落差。</p>
      <p>另一個可能的原因，是桃園終究成不了「台北前花園」。宜蘭縣內並不存在太多工業設施，「好山好水」和「田園風光」為農舍的居住品質，還有其可能伴隨的美好退休想像加了不少分數。簡言之，在農舍的「產品定位」上，桃園和宜蘭終究不同。</p>

      <!-- http://jsfiddle.net/weiweihsu/qxzfhjns/1/
      表 1-1 農委會農地現況盤查，宜蘭農舍最多，違規情況最嚴重。（註1：此農舍統計只包含平地農業土地，不包含山坡地。註2：此處單位為「土地筆數」，因此一筆土地上可能會有數棟建築。註3：此處所註記的違規，是農舍興建後剩餘農地沒有農用，也就是所謂的農地違規；至於農舍建築違規，因非農委會主管項目，故不列入統計。）（資料來源：農委會） -->

      <!-- <div class="chartwpr">
        <div class="chart--title">農委會農地現況盤查，宜蘭農舍最多，違規情況最嚴重。</div>
        <div class="chart--source">資料來源：農委會</div>
        <highcharts :options="chartDataF_1_1()" ref="highcharts"></highcharts>
        <div class="chart--note"></div>
      </div>

      <p>宜蘭、台中、彰化、桃園、高雄分別是在農地上「種」出最多農舍的縣市，全國總計有 4,930 公頃的平地農業區（不含山坡宜農牧地）成了農舍天堂，共 6 萬 6 千棟農舍中，違法的數量高達三分之一。</p>
      <p>值得關注的是，宜蘭縣不僅農舍數量高居全國之冠，其違規量甚至比合法量還多。從下面的圖表可進一步看出，宜蘭縣農舍所佔用的農地也是全國最多，高達 925 公頃（約為 1,300 個足球場面積），大約佔去全縣可耕種面積 4%，比例是全國平均值 4 倍。</p>

      <div class="chartwpr">
        <div class="chart--title">各縣市農舍佔用農地面積</div>
        <div class="chart--source">資料來源：農委會</div>
        <highcharts :options="chartDataF_1_2()" ref="highcharts"></highcharts>
        <div class="chart--note"></div>
      </div> -->











    </div>
  </section>
</template>

<script>

import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
Vue.use(VueHighcharts);

import chartDataF_1_3 from './chart/F_1-3.js';
// import chartDataF_1_2 from './chart/F_1-2.js';
// import chartData2_3 from './chart/f2-1.js';
// import chartData2_4 from './chart/f2-2.js';
// import chartData2_5 from './chart/f2-3.js';
// import chartData2_6 from './chart/f2-4.js';

export default {

  data () {
    return {
      chartDataF_1_3: chartDataF_1_3
      // chartDataF_1_2: chartDataF_1_2
    }
  },

  methods: {
    /*
    setScene: function(){

      let ScrollMagic = require("scrollmagic");
      let controller = new ScrollMagic.Controller();

      let dialogQ1 = new ScrollMagic.Scene({
        //dialog Q1
        triggerElement: "#dialogTdQ1",
        triggerHook: "onEnter"
      }).setClassToggle("#dialogTdQ1", "active");

      let dialogA1 = new ScrollMagic.Scene({
        //dialog A1
        triggerElement: "#dialogTdA1",
        triggerHook: "onEnter",
        offset: 200
      }).setClassToggle("#dialogTdA1", "active");

      controller.addScene([
        dialogQ1,
        dialogA1
      ]);

    }
    */
  },
  mounted: function(){

    // if (process.browser) {
    //   this.setScene();
    // }

  }
    
}
</script>

<style scoped>
.whyYilan {padding-top:0; padding-bottom:0;
background-color:#273947; color:#fff;
}
.whyYilan h2 {color:#fff;}
/* .chapter.tradeData {padding-top:0;}
.tradeData .chapter--header {
  background-image:url("/proj-assets/farmhouse/images/newsmarket/material-08.jpg");
} */



</style>