<template>
  <section class="standalone faq" v-bind:class="{expand:expandAll}">

    <div class="chapter--header" v-bind:class="{mobile: (currDevice == 'mobile')}">
      
      <div v-if="currDevice == 'desktop'" id="mediaContainer">
         <video id="herovid" playsinline autoplay>
            <source src="/proj-assets/farmhouse/video/farmhouse02.mp4" type="video/mp4">
         </video> 
      </div>
      <div v-else class="heroimg"></div>
      
      <div class="header--content">
        <div class="centerwpr">
          <h2>來來來看完你就變農舍達人了</h2>
          <p>看完我們的專題，相信大家已大致了解多年來的農舍風波背後，究竟有哪些成因、考量和影響。即便如此，或許許多人還是夢想擁有一棟農舍；畢竟只要合法，住農舍本來就是國家賦予每個人的權利。對於有這些考量的讀者們，我們特地拜訪多位農舍達人，搞懂申請、興建農舍時一定要搞懂的眉眉角角，並且在這裏毫無保留地公佈給大家。看完後，您也可以是農舍達人！</p>

          <!-- <div class="faq--readmore">
            <div class="rBtnText" v-show="!expandAll" v-on:click="faqExpand">全部展開</div>
            <div class="rBtnText" v-show="expandAll" v-on:click="faqCollapse">全部收闔</div>
          </div>  -->
        </div>
      </div>
    </div>

    <div class="centerwpr">      
      <!-- <h2>來來來看完你就變農舍達人了</h2> -->

      <div class="faq--readmore top">
        <div class="rBtnText" v-show="!expandAll" v-on:click="faqExpand">全部展開</div>
        <div class="rBtnText" v-show="expandAll" v-on:click="faqCollapse">全部收闔</div>
      </div>      
        
      <div class="faq--container">

        <div class="faq--entry expandable" v-for="(item, index) in faqData" :key="'item-'+ index" v-bind:class="{expand:expandAll}">
            <h4 class="faq--q eTrigger" v-text="item.question" v-on:click="expandContent"></h4>
            <div class="faq--a eContent" v-html="item.answer"></div>
        </div>
      </div><!-- faq container -->      

      <!-- <div class="faq--readmore">
        <div class="rBtnText" v-show="!expandAll" v-on:click="faqExpand">全部展開</div>
        <div class="rBtnText" v-show="expandAll" v-on:click="faqCollapse" v-scroll-to="{
          el: '.faq--container',
          duration: 400,
          offset: collapseOffset
        }">全部收闔</div>
      </div> -->
    </div>

    <!-- ending -->
    <ending></ending>

    <div id="fixHeader">
      <h2>來來來看完你就變農舍達人了</h2>

      <!-- <div class="faq--readmore"> -->
        <div class="rBtnText" v-show="!expandAll" v-on:click="faqExpand">全部展開</div>
        <div class="rBtnText" v-show="expandAll" v-on:click="faqCollapse">全部收闔</div>
      <!-- </div> -->

    </div>

    <div id="standProgress">
      <div class="stand--percentage"></div>
    </div>

  </section>
</template>

<script>

import faqData from './data/faq.json';
import ending from './Ending.vue';

export default {
    name: 'farmFaq',
    data (){
        return {
            expandAll: false,
            faqData: faqData,
            collapseOffset: null
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
        },

        faqExpand: function(){
            this.expandAll = true;
            let faqA = document.querySelectorAll(".faq--a");
            for(let i = 0; i < faqA.length; i++){

                    let height = faqA[i].scrollHeight;
                    faqA[i].style.maxHeight = height + "px";
                }

        },

        faqCollapse: function(){
            this.expandAll = false;
            let faqA = document.querySelectorAll(".faq--a");
            for(let i = 0; i < faqA.length; i++){
                    faqA[i].style.maxHeight = "0";
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
              // console.log("progress update, height: " + fullPageHeight + "px");
            },500);            
          } 

          $(".faq--q").click(function(){
            resetProgress();
          });

          $(".rBtnText").click(function(){
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

    }, //methods

    mounted: function(){

      window.$ = require('jquery');

      let faqContainer = document.querySelector(".faq--container");      

      this.collapseOffset = faqContainer.offsetHeight;

      if (process.browser) {
        this.setScene();
      }        

    }


}

</script>

<style>
.faq--a p {margin-top:15px;}
.faq--a ol {margin-top:15px; margin-bottom:0;}
</style>

<style scoped>

.faq {padding:0;}
.faq .chapter--header {
  /* background-image:url("/proj-assets/farmhouse/images/newsmarket/material-05.jpg");
  background-attachment:fixed;  */
}

.faq--intro {display:flex; align-items:center; justify-content:center;
margin-bottom:50px;
}
.faq--intro-pic {width:42%; float:left;}
.faq--intro-pic img {width:100%;}
.faq--intro-text {float:right; width:65%; padding-left:60px;}

.faq--entry {margin-bottom:50px;}
.faq--entry:last-child {margin-bottom:0;}

.faq--q {margin-bottom:0px;
color:#273947; font-size:26px;
position:relative; 
display:flex; align-items:center;
cursor:pointer;
}
.faq--q:hover {color:#7ccfa5;}
.faq--q:before {content:"Q"; width:40px; height:40px; margin-right:14px;
color:#7ccfa5; font-weight:700; text-align:center; font-size:22px;
background-color:#273947; border-radius:4px;
display:flex; align-items:center; justify-content:center;
flex-shrink:0;
}

.faq--a {padding-top:10px;}

.faq--readmore {clear:both; position:relative;
color:#273947; font-weight:bold; text-align:center;
font-size:24px; line-height:44px;
cursor:pointer; overflow:hidden;
}
.faq--readmore.top {margin-bottom:35px;}

.rBtnText {position:relative; padding:3px 15px; min-width:160px;
display:inline-flex; justify-content:flex-end; align-items:center;
border:4px solid #273947;
}
.rBtnText:before {content:"+"; display:inline-block;
margin-right:4px; position:relative; top:-1px;
font-size:44px;
}
.expand .rBtnText:before {content:"-";}

#fixHeader .rBtnText {padding:0 10px; min-width:130px;
color:#fff; font-size:18px; line-height:34px;
border:3px solid #fff; cursor:pointer;
display:flex; justify-content:center; align-items:center;
position:absolute; right:10px; top:10px;
}
#fixHeader .rBtnText:before {font-size:34px; top:-3px;}

@media screen and (max-width: 800px) {

    .faq--intro-pic {display:none;}
    .faq--intro-text {float:none; width:auto; padding-left:0;}

    #fixHeader h2 {display:none;}
    .faq--readmore.top {display:none;}


}

@media screen and (max-width: 500px) {

  .faq--q {font-size:20px;}

}

</style>