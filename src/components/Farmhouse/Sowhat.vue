<template>
  <section class="chapter sowhat">
    <!-- <div id="soPinTrigger"></div> -->
    <div id="soHeader"></div>

    <div id="soPinContainer">
    <div class="centerwpr">
        <h2>農地不農用，又怎樣？</h2>
          <p>雖然《農發條例》在開放興建農舍之初，就已明文要求「不影響農業生產」和「維持農地農用」必須是前提，然而如今從現況來看，前提看似消失，許多人卻還在爭論如「農舍應該怎麼蓋」等枝微末節，未免讓人感嘆到底是劃錯了重點，又抑或是別無選擇的悲哀。</p>
          <p>農委會副主委陳吉仲表示，沒有農地就沒有農業，農舍議題的關鍵確實不是它應該怎麼蓋、蓋在哪裡這麼單純的問題，而是要根本溯源地回到台灣農業的衰弱、農民入不敷出的艱辛，還有農業根本不受大眾重視的窘境去探討。</p>          
          <p>農舍造成的農地不農用，直接造成的影響就是耕種面積流失、糧食減少、糧食自給率下降。在「農業區」中大量興建農舍，除了造成土地使用分區混亂、管理困難外，也會讓剩餘的農地變得零碎、破碎化。當初政府修訂《農發條例》開放農地自由買賣時，就是希望台灣轉型為大面積整合耕種以迎戰 WTO 挑戰，然而如今的狀況，無疑是在自己臉上打了個響亮的巴掌。</p>
          <p>「（農舍）這樣氾濫下去，當然會影響農業生產環境。問題是現在已經有這麼多的負面影響，為什麼大家還是不在乎？<strong>最根本問題就是，農業價值沒有被凸顯，被看成是弱勢。農業產值一年才 5,600 億，比不上台積電或鴻海等高科技產業，可是它對生態環境糧食的貢獻，不管 NGO 或農委會再怎麼講，一般人也沒辦法體會。只有當全球極端氣候發生時，大家糧食短缺才會感受出來，否則我講再多大家也無法感受。」</strong></p>

    </div>    
    </div>

  </section>
</template>

<script>

export default {

  methods: {

    // getOffset,

    setSceneSo: function(){

      const ScrollMagic = require('scrollmagic');     
    //   require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');

      const controllerConc = new ScrollMagic.Controller();

      let pinHeader = new ScrollMagic.Scene({
          //主圖固定不捲動
          triggerElement: '#soHeader',
          triggerHook: "onLeave"
      }).setPin("#soHeader",{
          pushFollowers: false
      });
    //   .addIndicators({name: "conc"});

      controllerConc.addScene([
          pinHeader
      ]);

    //   window.addEventListener('resize', function(event){

    //     //get offset after resize
    //     concOffset = getOffset(concTrigger);
    //     // console.log("Resize:" + concOffset.top)
    //     scene1.offset(concOffset.top).update(true);
    //     // console.log("updated!");
    //   });


    } //setScene

  },

  mounted: function(){

    if (process.browser) {
            this.setSceneSo();
        }

  }
    
}
</script>

<style scoped>
.chapter.sowhat {position:relative; padding:0;}

#soHeader {width:100%; height:100vh; position:relative;
top:0 !important;
background-image:url("/proj-assets/farmhouse/images/newsmarket/material-05.jpg");
background-repeat:no-repeat; background-size:cover;
background-position:center top;
}

#soPinContainer {padding-bottom:140px;}
.sowhat .centerwpr {margin-top:-120px;
background-color:#fff;
}

@media screen and (max-width: 800px) {

  .sowhat .centerwpr {padding:50px 30px 80px 30px;}

}

</style>