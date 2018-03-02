<template>
  <section class="chapter dataCrisis">

    <div class="centerwpr dark">

      <h2>透過數據看見農舍危機</h2>

      <p>怎麼做，才能讓民眾有感？</p>
      <p>2017 年 9 月，農委會喊出「不能只有政府知道」、「訴諸輿論力量」口號，公開農業及農地資源盤查結果查詢圖台，要讓民眾知道台灣農地上，到底長出了多少奇特的「農產品」。</p>
      <p>暫且不談更為嚴重的違章工廠問題<a class="noteTrigger" v-on:click="noteToggleContent">(註)</a>，<span class="noteBlock">違章工廠佔用總農地面積為 13,859公頃，農舍則為 4,930 公頃，而違章工廠佔據農地，也和《農發條例》開放自然人買賣農地有關。</span>從盤查結果可知，宜蘭正是農舍聚集的重鎮。</p>

      <div class="chartwpr">
        <div class="chart--header">
          <div class="chart--title">農委會農地現況盤查，宜蘭農舍最多，違規情況最嚴重。</div>
          <div class="chart--source">資料來源：農委會</div>
        </div>
        <highcharts :options="chartDataF_1_1()" ref="highcharts"></highcharts>
        <div class="chart--note"></div>
      </div>

      <p>宜蘭、台中、彰化、桃園、高雄分別是在農地上「種」出最多農舍的縣市，全國總計有 4,930 公頃的平地農業區（不含山坡宜農牧地）成了農舍天堂，共 6 萬 6 千棟農舍中，違法的數量高達三分之一。</p>
      <p>值得關注的是，<strong>宜蘭縣不僅農舍數量高居全國之冠，其違規量甚至比合法量還多。從下面的圖表可進一步看出，宜蘭縣農舍所佔用的農地也是全國最多，高達 925 公頃（約為 1,300 個足球場面積），大約佔去全縣可耕種面積 4%，比例是全國平均值 4 倍。</strong></p>

      <div class="chartwpr">
        <div class="chart--header">
          <div class="chart--title">各縣市農舍佔用農地面積</div>
          <div class="chart--source">資料來源：農委會</div>
        </div>
        <!-- <div class="chart--title">各縣市農舍佔用農地面積</div>
        <div class="chart--source">資料來源：農委會</div> -->
        <highcharts :options="chartDataF_1_2()" ref="highcharts"></highcharts>
        <div class="chart--note"></div>
      </div>


    </div>
  </section>
</template>

<script>

import Vue from 'vue';
import VueHighcharts from 'vue-highcharts';
Vue.use(VueHighcharts);

import chartDataF_1_1 from './chart/F_1-1.js';
import chartDataF_1_2 from './chart/F_1-2.js';
// import chartData2_3 from './chart/f2-1.js';
// import chartData2_4 from './chart/f2-2.js';
// import chartData2_5 from './chart/f2-3.js';
// import chartData2_6 from './chart/f2-4.js';

export default {

  data () {
    return {
      chartDataF_1_1: chartDataF_1_1,
      chartDataF_1_2: chartDataF_1_2
    }
  },

  methods: {

    noteToggleContent: function(event){
        this.$emit('noteToggle',event);
    }
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
.dataCrisis {padding-bottom:0;
background-color:#273947; color:#fff;
}
.dataCrisis h2 {color:#fff;}
/* .chapter.tradeData {padding-top:0;}
.tradeData .chapter--header {
  background-image:url("/proj-assets/farmhouse/images/newsmarket/material-08.jpg");
} */



</style>