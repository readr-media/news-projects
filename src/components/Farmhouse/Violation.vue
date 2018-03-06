<template>
  <section class="chapter violation">
    <!-- <div id="vioPinTrigger"></div> -->
    <div id="vioHeader"></div>

    <div id="vioPinContainer">
    <div class="centerwpr">
        <h2>農舍違法多，六萬護一生</h2>

        <div class="chartwpr">
          <div class="chart--header">
            <div class="chart--title">全國農舍違規統計表</div>
            <div class="chart--source">資料來源：農委會；統計數據及辦理結果由各地方政府回報</div>
          </div>

          <div class="expandable">              
              <!-- <div class="eTable" id="tableFull"><img src="/proj-assets/farmhouse/images/chart/c4-1-web.png" /></div> -->
              <div v-if="currDevice == 'mobile'">
                <div class="eTable" id="tablePhone"><img src="/proj-assets/farmhouse/images/chart/c4-1-phone.png" /></div>
              </div>
              <div v-else>
                <div class="eTable" id="tableFull"><img src="/proj-assets/farmhouse/images/chart/c4-1-web.png" /></div>
              </div>
              <div class="eTrigger">
                <a class="icon" v-on:click="toggleContent"></a>
              </div>
          </div>

          <!-- <div class="chart--note"></div> -->
        </div>

        <p>那麼嚴重的農舍問題又該如何導正呢？

        <p>這份資料正透露了主管機關的無力。我們可以看到，各縣市稽核數量落差很大，稽核比例也很低，因為各縣市的稽核經費、人力普遍不足，對於農舍的態度也有很大的落差，即便中央主管機關看似敲鑼打鼓地想要控管農舍問題，但回到執行面上，還是得看地方政府辦事。</p>

        <p>農舍違建又怎樣？農地不農用又如何？開罰數就是普遍偏低，改正情況甚至不一定有回報，民眾要如何相信政府有決心、有能力控管農舍問題？</p>

        <p>根據宜蘭縣議員薛呈懿提供資料，自 2000 年到 2017 年 10 月間，宜蘭縣政府針對農地使用違反區域計畫法 21 條的情況（沒有農地農用），總共只開罰了 1,380 次，開罰總金額 9,559 萬元，換算後每個違規案件，僅被裁罰 6 萬 9 千元。</p>

        <p>此外，<strong>在 1,380 件被處罰的個案中，也僅有 80 件被裁罰兩次、 8 件裁罰三次、 4 件裁罰四次。換句話說， 1,288 個違法個案只被開罰過一次。農委會知情人士透露，這就是所謂「六萬護ㄧ生」的概念，繳完罰單後，後續即便沒有改正，也很難再被稽核了。</strong></p>

        <p>宜蘭縣代理縣長陳金德在 2017 年 11 月接受媒體採訪，被問及農舍違規問題時，曾放話「台北拆 1% 的違建，宜蘭就拆給你看」，但在台北市長柯文哲表示北市已拆 3% 違建時，陳金德卻又改口，說當初只是為凸顯違建是各縣市政府都要面對的難題。</p>

        <p>姑不論台北拆了多少違建，宜蘭又對多少農舍開了刀。光是對照宜蘭縣與台北市的拆除違建預算，就知道兩地處理違建的能量天差地遠。不只經費少，宜蘭縣就連人力也遠遠比不上北市。台北市建管使用科表示，他們的拆除區隊人數有 64 人，相較之下，宜蘭縣政府相關人士則透露，他們不但只有 5 人可以處理稽核業務，專門處理拆除違建發包業務的也只有 1 人。該名人士也補充，雖然宜蘭縣近兩年的拆除違建預算，已經從長期以來的 50 萬元，「巨幅」成長到 200 萬元，但扣除廣告物拆除預算後，其實也只剩 120 萬元可以發包拆除違建業務。</p>

        <p>沒錢沒人，真的能期待宜蘭縣政府有辦法大刀闊斧處理農舍違規問題？對於這樣的質疑，宜蘭縣政府似乎顯得不擔心。</p>

        <p>為了回應連日來衍生的農舍風波，陳金德在 2018 年 2 月 1 日時公佈《宜蘭縣興建農舍審查作業要點》和《宜蘭縣申請農業設施審查作業要點》，計畫優先處理有公共安全疑慮、建築違規投影面積超過 100 平方公尺、沒有落實農地農用的違規農舍，揚言「有看到就直接處理、開罰」，再讓農業處去慢慢輔導違規情形較不嚴重的農舍。宜蘭縣地政處長黃志良表示：「未來農舍除了過往管理政策外，縣府每年 6 月到 8 月還會做農牧用地普查，由農業、建設、地政、和公所等相關單位一起去做⋯⋯我們有 4 個稽核人力可以去查處農地是否農用，已經評估過這樣的人力不是問題。」</p>


    </div>    
    </div>

  </section>
</template>

<script>
import imagesLoaded from 'imagesLoaded';

export default {

  props: {    
    currDevice: String
  },

  methods: {     
    
    // setSceneVio: function(){

    //   const ScrollMagic = require('scrollmagic');     
    // //   require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');

    //   const controllerVio = new ScrollMagic.Controller();

    //   //get offset top
    // //   let concTrigger = document.getElementById('concPinTrigger');

    //   // console.log(concTrigger);
    // //   let concOffset = this.getOffset(concTrigger);

    // //   console.log("Before:" + concOffset.top)

    // //   const pinHeader = new ScrollMagic.Scene({
    // //       //主圖固定不捲動
    // //       // triggerElement: '#concPinTrigger',
    // //       offset: concOffset.top,
    // //       triggerHook: "onLeave",
    // //       duration: 0
    // //   }).setPin("#concHeader",{
    // //       pushFollowers: false
    // //   });

    //   const pinHeader = new ScrollMagic.Scene({
    //       //主圖固定不捲動
    //       triggerElement: '#vioHeader',
    //     //   offset: concOffset.top,
    //       triggerHook: "onLeave"
    //   }).setPin("#vioHeader",{
    //       pushFollowers: false
    //   });
    // //   .addIndicators({name: "conc"});

    //   /*
    //   const dialogQ1 = new ScrollMagic.Scene({
    //       //dialog Q1
    //       triggerElement: '#dialogConQ1',
    //       triggerHook: "onEnter"
    //   }).setClassToggle("#dialogConQ1","active");

    //   const dialogA1 = new ScrollMagic.Scene({
    //       //dialog A1
    //       triggerElement: '#dialogConA1',
    //       triggerHook: "onEnter",
    //       offset: 200
    //   }).setClassToggle("#dialogConA1","active");
    //   */
    //   controllerVio.addScene([
    //       pinHeader
    //       // dialogQ1,
    //       // dialogA1  
    //   ]);

    // }, //setScene
    
    toggleContent: function(event){

      //event target
        let icon = event.currentTarget;
        let trigger = icon.parentNode;
        let parent = trigger.parentNode;
        const targClassName = icon.getAttribute('class')

        //收闔的內容區塊
        let eContent = parent.querySelector(".eTable");

        //收闔內容區塊原始高度
        let maxHeight = eContent.scrollHeight;
        if(targClassName && targClassName.indexOf('icon') > -1 && icon.tagName === 'A') {
          if(parent.classList.contains("expand")){
                //關閉
                parent.classList.remove("expand");
                eContent.style.maxHeight  = maxHeight / 2.5 + "px";
  
            } else {
                //展開
                parent.classList.add("expand");
                eContent.style.maxHeight  = maxHeight + "px";
            }  
        }

    },

    setTableHeight: function(){

      window.addEventListener('resize', function(event){
        
        let eTable = document.querySelectorAll(".eTable");
        for(let i = 0; i < eTable.length; i++){
          let height = eTable[i].scrollHeight;
          eTable[i].style.maxHeight = height / 2.5 + "px";
        }

      });

      let resizeEvent = new Event('resize');
      //trigger window resize once
      window.dispatchEvent(resizeEvent);

    }

  },

  mounted: function(){

    if (process.browser) {
          // this.setSceneVio();

          let setTableHeight = this.setTableHeight;
          // let setSceneVio = this.setSceneVio;

          imagesLoaded( document.querySelector('#vioPinContainer'), function() {
            // console.log('all images are loaded');
            setTableHeight();
            // setSceneVio();

          });


        }

  }
    
}
</script>

<style scoped>
.violation {position:relative; padding:0;}

#vioHeader {width:100%; height:100vh; position:relative;
top:0 !important;
background-image:url("/proj-assets/farmhouse/images/IMG_7169.jpg");
background-repeat:no-repeat; background-size:cover;
background-position:center top;
}

#vioPinContainer {padding-bottom:140px;}
.violation .centerwpr {
margin-top:-120px;
background-color:#f8f8f8;  
}

.expandable {position:relative;}
.eTable {overflow:hidden;
transition:400ms; transition-property:max-height;}

.eTrigger,
.eTrigger:before,
.eTrigger:after {position:absolute; left:0; bottom:0;
width:100%; height:120px;
background: linear-gradient(to bottom, rgba(248,248,248,0) 0%,rgba(248,248,248,1) 100%);
}

.eTrigger:before,
.eTrigger:after {content:""; display:block;}

.expand .eTrigger {background:none; position:relative; height:60px;}
.expand .eTrigger:before,
.expand .eTrigger:after {display:none;}

.eTrigger .icon {width:44px; height:44px; z-index:900;
position:absolute; left:50%; bottom:10px; margin-left:-27px;
border:5px solid #b4c6d5; border-radius:50%; cursor:pointer;
display:flex; justify-content:center; align-items:center;
}
.eTrigger .icon:before {content:""; display:block; width:34px; height:34px;
position:absolute; left:0; top:0;
background-image:url("/proj-assets/farmhouse/images/slice02.png");
background-size:34px auto; background-repeat:no-repeat;
background-position:left top;
}
.expand .eTrigger .icon:before {background-position:left bottom;}


@media screen and (max-width: 800px) {

  .violation .centerwpr {padding-bottom:100px;}

  #vioPinContainer {padding-bottom:0;}

}

</style>