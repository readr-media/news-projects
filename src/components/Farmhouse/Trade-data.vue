<template>
  <section class="chapter tradeData">

    <!-- <div class="chapter--header">
      <div class="header--content">
        <div class="centerwpr">
          <h2>農舍買賣狀況大公開</h2>
          <p>根據內政部實價登錄公開資訊，從 2012 ～ 2017 這 5 年之間，宜蘭縣共有 1,471 筆農舍交易，總量高居全國第一。宜蘭縣農舍交易中，共計 1,183 筆農舍（80.4%）交易位在特定農業區中，土地移轉總面積達 165.64 公頃。</p>
        </div>
      </div>
    </div> -->

    <div class="centerwpr">

      <h2>農舍買賣狀況大公開</h2>
      <p>農舍成為住宅產品，在當前的法規要求下，自然也需要公開透明，讓所有人了解農舍的交易狀況。而我們從資料中發現，宜蘭農舍的主力賣家，是在西元 2000 年前就擁有農地的農民，也就是俗稱的「老農」。</p>
      <p>根據內政部實價登錄公開資訊，從 2012 ～ 2017 這 5 年間，宜蘭在農舍交易總量再度拿下全國第一。問題在於，宜蘭縣農舍交易中，共計 1,183 筆農舍（80.4%）交易位在特定農業區中，土地總面積達 165.64 公頃。</p>

      <div class="chartwpr">
        <div class="chart--header">
          <div class="chart--title">各縣市農舍佔用農地面積</div>
          <div class="chart--source">資料來源：農委會</div>
        </div>
        <!-- <div class="chart--title">全國農舍交易量前五名縣市</div>
        <div class="chart--source">資料來源：內政部實價登錄系統；鏡傳媒整理</div> -->
        <highcharts :options="chartDataF_2_1()" ref="highcharts"></highcharts>
        <div class="chart--note"></div>
      </div>

      <div class="chartwpr">
        <div class="chart--header">
          <div class="chart--title">各縣市農舍佔用農地面積</div>
          <div class="chart--source">資料來源：農委會</div>
        </div>
        <!-- <div class="chart--title">宜蘭縣農舍交易時間曲線圖</div>
        <div class="chart--source">資料來源：內政部實價登錄系統；鏡傳媒整理</div> -->
        <highcharts :options="chartDataF_2_2()" ref="highcharts"></highcharts>
        <div class="chart--note"></div>
      </div>
        
      <p>比對「農委會農地盤查結果」及「內政部實價登錄資訊」，可發現蓋了最多農舍的三個鄉鎮，也是農舍交易最熱絡的市場，足證興建量與交易量，大致上呈現正相關。</p>
      <p>在前面的篇章中我們提到，宜蘭縣農舍的興建與交易成長，與國道五號雪山隧道通車帶來的台北買家密切相關。然而我們透過交易熱點圖發現，在有國道五號通過的鄉鎮中，鄰近國道兩側的交易確實稍微密集，但也只在五結、壯圍兩鄉特別明顯。主要的交易熱區，還是農舍數量最多的冬山、員山、三星鄉，集中在宜蘭縣的西南角。其中，三星與員山鄉的交易，有集中在蘭陽溪、羅東溪「水岸」的趨勢。</p>

    </div>  

      <!-- Google Map -->
      <!-- <div id="mapPinTrigger"></div> -->
      <!-- <google-map></google-map> -->
      <div class="map-container" style="width:100%; height:100vh; background-image:url('/proj-assets/farmhouse/images/newsmarket/farmhouse-01.jpg'); background-size:cover; background-position:center top;"></div>

      <div id="mapPinContainer">
      <div class="centerwpr dark" id="mapText">
          <h2>農委會農地農舍盤查結果 / 交易熱點對照圖</h2>
          <div class="chart--note">註1：有 13 筆交易資料因沒有登錄地址，所以此處交易總量為 1,458 筆。</div>
          <div class="chart--note">註2：此處的農舍盤查數量，是我們直接從農委會《農業及農地資源盤查結果查詢圖台》後台撈出，總計數字和農委會後來提供的數字有 177 筆落差，特此說明。</div>
          <p>更值得關注的是，總交易農舍中，有 1,358 筆交易基地面積小於 2,500 平方公尺，比例高達 92%，而這些很明顯就是屬於所謂的「老農配建」（註：因為《農發條例》規定可興建農舍的農地，面積必須大於 2,500 平方公尺，但在 2000 年之前已取得，且後續沒有轉手的農地，不受此限制，而當時只有農民可以擁有農地，所以這些不受法規限制的農地，就被稱為「老農地」，後續配合「非農民」所興建的農舍，就被稱為「配建」。詳細說明請見〈來來來，看完你就變成農舍達人了！〉章節。）。此外，在沒有包含建築物移轉的 7,557 筆農地交易中，也還有 295 筆被註記為老農配建，但因為實價登錄並沒有強制要求一定要備註農舍配建，所以實際上的農舍交易量，絕對會比統計數據更多。</p>

          <div class="chartwpr">
            <!-- <div class="chart--title">「92% 交易農舍屬於老農配建」（ 1,358 / 1,471）</div> -->
            <div class="chart--header">
              <div class="chart--title">各縣市農舍佔用農地面積</div>
              <div class="chart--source">資料來源：農委會</div>
            </div>
            <div class="chart--source"></div>
            <highcharts :options="chartDataF_2_1P()" ref="highcharts"></highcharts>
            <div class="chart--note"></div>
          </div>

          <div class="chartwpr">
            <!-- <div class="chart--title">「80.4% 交易農舍位於特定農業區中」（1,183 / ,1471）</div> -->
            <div class="chart--header">
              <div class="chart--title">各縣市農舍佔用農地面積</div>
              <div class="chart--source">資料來源：農委會</div>
            </div>
            <div class="chart--source"></div>
            <highcharts :options="chartDataF_2_2P()" ref="highcharts"></highcharts>
            <div class="chart--note"></div>
          </div>

          <div class="chartwpr">
            <!-- <div class="chart--title">「77.5% 交易農舍是在 2006 年（雪山隧道通車）後完工」（ 1,140 / 1,471）</div> -->
            <div class="chart--header">
              <div class="chart--title">各縣市農舍佔用農地面積</div>
              <div class="chart--source">資料來源：農委會</div>
            </div>
            <div class="chart--source"></div>
            <highcharts :options="chartDataF_2_3P()" ref="highcharts"></highcharts>
            <div class="chart--note">註：根據宜蘭縣政府統計資料，2006~2017年共發出 6,662 張農舍使用執照</div>
          </div>

          <div class="chartwpr">
            <!-- <div class="chart--title">「30% 農舍在完工一年內就被賣出」（443 / 1,458）</div> -->
            <div class="chart--header">
              <div class="chart--title">各縣市農舍佔用農地面積</div>
              <div class="chart--source">資料來源：農委會</div>
            </div>
            <div class="chart--source"></div>
            <highcharts :options="chartDataF_2_4P()" ref="highcharts"></highcharts>
            <div class="chart--note">註：有 13 筆交易資料沒有完工時間，所以交易總量定為 1,458 筆。另，有 14 筆資料的交易時間早於完工時間，所以我們將之納入 0～1 年的交易區間。</div>
          </div>

          <p>這些交易資訊所傳達的警訊是——農舍交易的主力賣家，是早在 2000 年《農發條例》修訂前就持有農地的「老農」。宜蘭房仲呂柏凱觀察：「申請蓋農舍的，講白了就是打算放棄（農業）的人。」</p>
          <p>宜蘭農民陳章楠則直言：「你賣地（農舍）就是想離開農業啊，所以禁農舍，實際上就是影響他們離開農業的權益，而不是留下來。大家說農民要放棄農業，活不下去了，那以前還不是活下來了？現在農地一坪賣兩萬，你幹嘛還種田？」</p>

          <p><strong>補充說明：</strong><br />本文所統計之農舍實價交易資訊，皆為交易筆數，而非實際農舍筆數。舉例來說，假如同一棟農舍經多次轉手交易，會被計算為多筆，所以在統計上的交易「農舍數量」，會略低於「交易筆數」。問題在於，由於實價登錄並沒有要求農地交易（不會註記為農舍）一定要註記老農配建農舍，而農地交易又高達 7,557筆，所以這邊可能會有不小的黑數，這也是本文的研究限制，特此說明。</p>

      </div>
      </div>

  </section>
</template>

<script>

import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
Vue.use(VueHighcharts);

import chartDataF_2_1 from './chart/F_2-1.js';
import chartDataF_2_2 from './chart/F_2-2.js';
import chartDataF_2_1P from './chart/F_2-1P.js';
import chartDataF_2_2P from './chart/F_2-2P.js';
import chartDataF_2_3P from './chart/F_2-3P.js';
import chartDataF_2_4P from './chart/F_2-4P.js';

import googleMap from './Google-map.vue';

export default {

  data () {
    return {
      chartDataF_2_1: chartDataF_2_1,
      chartDataF_2_2: chartDataF_2_2,
      chartDataF_2_1P: chartDataF_2_1P,
      chartDataF_2_2P: chartDataF_2_2P,
      chartDataF_2_3P: chartDataF_2_3P,
      chartDataF_2_4P: chartDataF_2_4P
    }
  },

  components: {
      'google-map': googleMap
  },

  methods: {
    
    setSceneMap: function(){

      const ScrollMagic = require('scrollmagic');   
      require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');

      const controllerMap = new ScrollMagic.Controller();

      const pinMap = new ScrollMagic.Scene({
          //google map 固定不捲動
          // triggerElement: '#mapPinTrigger', //trigger 跟 pin 不要設在同一個元素上會比較順嗎？
          triggerElement: '.map-container',
          triggerHook: "onLeave"
      }).setPin(".map-container",{
          pushFollowers: false
      });
      // .addIndicators({name: "map"});

      controllerMap.addScene([
        pinMap
      ]);

    }
    
  },
  mounted: function(){

    if (process.browser) {
      this.setSceneMap();
    }

  }
    
}
</script>

<style scoped>

.tradeData {padding-bottom:0; padding-top:0;
background-color:#273947; color:#fff;
}
.tradeData h2 {color:#fff;}

.map-container {top:0 !important;}
#mapText {margin-bottom:140px;}

.tradeData--part2 {position:relative;
color:#1a1a1a;
background-color:#fff;
}


</style>