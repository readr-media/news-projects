<template>
  <section class="chapter dataCrisis dark">

    <div class="centerwpr dark">

      <h2>宜蘭農舍四多：數量多、違規多、佔用農地多、交易多</h2>

      <p>怎麼做，才能讓民眾有感？</p>
      <p>2017 年 9 月，農委會喊出「不能只有政府知道」、「訴諸輿論力量」口號，<a href="https://map.coa.gov.tw/farmland/survey.html" target="_blank" @click="clickGA">公開農業及農地資源盤查結果查詢圖台</a>，要讓民眾知道台灣農地上，到底長出了多少奇特的「農產品」。</p>
      <p>暫且不談更為嚴重的違章工廠問題<a class="noteTrigger" v-on:click="noteToggleContent">註</a>，<span class="noteBlock">違章工廠佔用總農地面積為 13,859公頃，農舍則為 4,930 公頃，而違章工廠佔據農地，也和《農發條例》開放自然人買賣農地有關。</span>從盤查結果可知，宜蘭正是農舍聚集的重鎮。
</p>

      <div class="chartwpr">
        <div class="chart--header">
          <div class="chart--title">全國擁有最多農舍的前五名縣市。農委會農地現況盤查發現，宜蘭農舍最多，違規情況最嚴重</div>
          <div class="chart--source">資料來源：農委會，鏡傳媒整理</div>
        </div>

        <div v-if="currDevice == 'desktop'">
          <highcharts :options="chartDataF_1_1()" ref="highcharts"></highcharts>
        </div>
        <div v-else>
          <img src="/proj-assets/farmhouse/images/chart/1-1-phone.png" />
        </div>

        <div class="chart--note">註1：此農舍統計只包含平地農業土地，不包含山坡地。<br />註2：此處單位為「土地筆數」，因此一筆土地上可能會有數棟建築。<br />註3：此處所註記的違規，是農舍興建後剩餘農地沒有農用，也就是所謂的農地違規；至於農舍建築違規，因非農委會主管項目，故不列入統計。</div>
      </div>

      <p>宜蘭、台中、彰化、桃園、高雄分別是在農地上「種」出最多農舍的縣市。全國總計有 66,322 筆平地農地（不含山坡宜農牧地）被蓋上農舍，面積達 4,930 公頃，違法比例更高達 1/3。</p>
      <p>值得關注的是，<strong>宜蘭縣不僅農舍數量高居全國之冠，其違規量甚至比合法量還多。近一步分析，宜蘭縣農舍所佔用的農地面積也是全國之冠，高達 925 公頃（約為 1,300 個足球場面積），大約佔去全縣可耕種面積 4%，比例是全國平均值 4 倍。</strong></p>

      <div class="chartwpr">
        <div class="chart--header">
          <div class="chart--title">前五大農舍縣市，農舍佔用平地農地面積</div>
          <div class="chart--source">資料來源：農委會，鏡傳媒整理</div>
        </div>

        <div v-if="currDevice == 'desktop'">
          <highcharts :options="chartDataF_1_2()" ref="highcharts"></highcharts>
        </div>
        <div v-else>
          <img src="/proj-assets/farmhouse/images/chart/1-2-phone.png" />
        </div>

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

export default {

  data () {
    return {
      chartDataF_1_1: chartDataF_1_1,
      chartDataF_1_2: chartDataF_1_2
    }
  },

  props: {    
    currDevice: String
  },

  methods: {

    noteToggleContent: function(event){
        this.$emit('noteToggle',event);
    },

    clickGA () {
      window.ga('send', 'event', 'projects', 'click', `farmland`, { nonInteraction: false })
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

</style>