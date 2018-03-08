<template>
  <section class="standalone opinion">

    <div class="chapter--header" v-bind:class="{mobile: (currDevice == 'mobile')}">

      <div v-if="currDevice == 'desktop'" id="mediaContainer">
         <video id="herovid" playsinline autoplay>
            <source src="/proj-assets/farmhouse/video/farmhouse03.mp4" type="video/mp4">
         </video> 
      </div>
      <div v-else class="heroimg"></div>

      <div class="header--content">
        <div class="centerwpr">
          <h2>農舍面面觀</h2>
          <p>看完了這麼多的數據、分析和照片，或許您在想 - 那麼在地宜蘭人、農民、官員又是怎麼想的呢？在本次的專題中，我們陸續專訪了宜蘭的房仲、老農、代耕農、農田水利會長、農委會副主委，各自從他們的角度來審視農舍議題。部分觀點與發言，我們已在前面的篇章中引述過，此為完整陳述版本。</p>
          <p>期待各位完整讀完後，會對農舍有更全面而立體的了解。下次到了宜蘭，再看見四野繁盛綻放的農舍時，心裡或許會有不同感受。</p>
        </div>
      </div>
    </div>

    <div class="centerwpr opinionwpr">

      <div class="opinion--entry" v-for="(item, index) in opinionData">

        <div class="opinion--portrait">
          <img v-bind:src="item.portrait" />          
        </div>

        <div class="opinion--container">
          <div class="opinion--name">{{item.name}}</div> 
          <div class="opinion--role">{{item.role}}</div> 
          <div class="opinion--bubble">
            <div class="opinion--bubble_content">
              <div class="opinion--quote" v-html="item.quote"></div>
              <div class="opinion--trigger eTrigger top" v-on:click="expandContent">
                <div class="text">閱讀更多內容</div>
                <i class="icon"></i>
              </div>              
              <div class="opinion--statement eContent" v-html="item.statement"></div>
              <div class="opinion--trigger eTrigger bottom" v-on:click="expandContent">
                <!-- <div class="text">收折</div> -->
                <i class="icon"></i>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>

    <!-- ending -->
    <ending></ending>

    <div id="fixHeader">
      <h2>農舍面面觀</h2>
    </div>

    <div id="standProgress">
      <div class="stand--percentage"></div>
    </div>

  </section>
</template>

<script>

import opinionData from './data/opinion.json'
import ending from './Ending.vue';

let VueScrollTo = require('vue-scrollto');

let scrollOptions = {
    offset: -15
}

export default {
  data(){
    return {
      opinionData: opinionData
    }
  },
  components: {
    'ending': ending
  },
  props: {
    currDevice: String
  },
  methods: {

    expandContent: function(event){
        //定義事件名稱 expand，並附帶參數傳到上層
        this.$emit('expand',event);

        let thisDOM = event.currentTarget;
        
        if(thisDOM.classList.contains("bottom")){

          let scrollTarget = thisDOM.parentNode.parentNode.parentNode;
          VueScrollTo.scrollTo(scrollTarget, 400, scrollOptions);
          
        }


    },

    setScene: function(){

          const ScrollMagic = require("scrollmagic");
          const { TweenMax, TimelineMax } = require('gsap');
          require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
          require('imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js');

          let controller = new ScrollMagic.Controller();          

          let navScene = new ScrollMagic.Scene({
            triggerElement: ".header--content",
            triggerHook: "onLeave"
          })
          .setTween(TweenMax.fromTo(
              "#fixHeader", 1, {top:"-60px"}, {top:"0"}
          ));
          // .addIndicators({name: "nav", colorStart: "red"});

          let standProgress = new ScrollMagic.Scene({
            // duration: ""
          })
          .setTween(TweenMax.fromTo(
              ".stand--percentage", 1, {width:"0"}, {width:"100%"}
          ));

          controller.addScene([
            navScene,
            standProgress
          ]);

          let header = document.querySelector(".header--content");

          function resetProgress(){
            setTimeout(function(){
              let fullPage = document.querySelector(".standalone");
              let fullPageHeight = fullPage.offsetHeight;
              standProgress.duration(fullPageHeight).refresh();
              // console.log("progress update");
            },500);            
          } 

          $(".eTrigger").click(function(){
            resetProgress();
          });

          window.addEventListener('resize',function(event){
            
            let headerHeight = header.offsetHeight;
            navScene.duration(headerHeight).refresh();

            resetProgress();


          });

          let resizeEvent = new Event('resize');

          //trigger window resize once
          window.dispatchEvent(resizeEvent);

        }


  },
  mounted: function(){

    window.$ = require('jquery');

    if (process.browser) {
        this.setScene();
      }

    
  }


}

</script>


<style scoped>
.opinion {text-align:center; padding:0;
background-color:#273947; color:#fff;
}
.opinion:after {content:""; display:table; clear:both;}

.opinion .chapter--header {
  /* background-image:url("/proj-assets/farmhouse/images/newsmarket/material-04.jpg");
  background-attachment:fixed;  */
}

.opinionwpr {padding-top:0;}

.opinion h2 {color:#fff;}

.opinion--entry {margin-top:50px;
display:flex; align-items:flex-start;
}

.opinion--portrait {width:120px; height:120px; margin-right:40px;
border-radius:50%; overflow:hidden;
flex-shrink:0;
}

.opinion--container {text-align:left;}
.opinion--name {display:inline-block; margin-right:20px; margin-left:40px;
font-size:24px; font-weight:bold;
}
.opinion--role {display:inline-block; font-size:18px;}

.opinion--bubble {position:relative; margin-top:10px;}
.opinion--bubble:before {content:""; display:block;
width:46px; height:50px; position:absolute; left:-20px; top:-6px;
background-image:url("/proj-assets/farmhouse/images/bubble-tips.png");
background-size:100% auto; background-position:left -300px;
background-repeat:no-repeat;
}

.opinion--bubble_content {padding:30px 40px 10px 40px; position:relative;
color:#1a1a1a;
background-color:#7acca4;  
border-radius:20px;
}

.opinion--quote {padding-left:20px;
color:#273947; font-size:20px; font-weight:500; line-height:1.7;
border-left:6px solid #273947;
}

.opinion--statement {max-height:0; overflow:hidden;
font-size:18px;
}

.opinion--trigger {cursor:pointer; padding-top:20px;
color:#fff; font-size:21px; line-height:21px;
box-sizing:content-box;
display:flex; justify-content:space-between; overflow:hidden;
flex-direction:column; align-items:center;
transition:400ms; transition-property:height, padding-top;
}

.opinion--trigger.top {height:46px;}
.opinion--trigger.bottom {height:0; padding-top:10px; justify-content:center;}

.expand .opinion--trigger.top {height:0; padding-top:0;}
.expand .opinion--trigger.bottom {height:44px;}

.opinion--trigger .text {position:relative;}

.opinion--trigger .icon {
width:24px; height:16px;
background-image:url("/proj-assets/farmhouse/images/slice01.png");
background-size:60px auto; background-position:left -533px;
background-repeat:no-repeat;
}
.opinion--trigger.bottom .icon {
background-position:left -586px;
}

@media screen and (max-width: 800px) {

  .opinion--portrait {width:60px; height:60px; margin-right:10px;}
  .opinion--name {margin-left:30px;}

  .opinion--bubble:before {transform:scale(0.8); left:-10px;}
  .opinion--bubble_content {padding:30px;}

}

@media screen and (max-width: 500px) {

  .opinion--entry {display:block;}
  .opinion--portrait {float:left; margin-top:-15px; margin-right:0;}
  .opinion--name {margin-left:20px;}

  .opinion--bubble_content {padding:30px 20px;}
  .opinion--bubble:before {display:none;}

  #fixHeader {display:none;}


}

</style>

<style>
.opinion--quote p:first-of-type {margin-top:0;}
</style>