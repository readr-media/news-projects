<template>
  <section class="standalone faq" v-bind:class="{expand:expandAll}">

    <div class="chapter--header">
      <div class="header--content">
        <div class="centerwpr">
          <h2>來來來看完你就變農舍達人了</h2>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo.</p>
        </div>
      </div>
    </div>

    <div class="centerwpr">      
      <!-- <h2>來來來看完你就變農舍達人了</h2> -->

      <!-- <div class="faq--readmore">
        <div class="rBtnText" v-show="!expandAll" v-on:click="faqExpand">全部展開</div>
        <div class="rBtnText" v-show="expandAll" v-on:click="faqCollapse">全部收闔</div>
      </div>       -->
        
      <div class="faq--container">

        <div class="faq--entry expandable" v-for="(item, index) in faqData" :key="'item-'+ index" v-bind:class="{expand:expandAll}">
            <h4 class="faq--q eTrigger" v-text="item.question"></h4>
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

          controller.addScene([
            navScene
          ]);

          let header = document.querySelector(".header--content");

          window.addEventListener('resize',function(event){
            
            let headerHeight = header.offsetHeight;
            navScene.duration(headerHeight).refresh();
          });

          let resizeEvent = new Event('resize');

          //trigger window resize once
          window.dispatchEvent(resizeEvent);

        }

    }, //methods

    mounted: function(){

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
  background-image:url("/proj-assets/farmhouse/images/newsmarket/material-05.jpg");
  background-attachment:fixed; 
}

.faq--intro {display:flex; align-items:center; justify-content:center;
margin-bottom:50px;
}
.faq--intro-pic {width:42%; float:left;}
.faq--intro-pic img {width:100%;}
.faq--intro-text {float:right; width:65%; padding-left:60px;}

/* .faq--container {padding-top:50px;} */
.faq--entry {margin-bottom:50px;}
.faq--entry:last-child {margin-bottom:0;}

.faq--q {margin-bottom:0px;
color:#273947; font-size:26px;
position:relative; 
display:flex; align-items:center;
/* cursor:pointer; */
}
/* .faq--q:hover {color:#7ccfa5;} */
.faq--q:before {content:"Q"; width:40px; height:40px; margin-right:14px;
color:#7ccfa5; font-weight:700; text-align:center; font-size:22px;
background-color:#273947; border-radius:4px;
display:flex; align-items:center; justify-content:center;
flex-shrink:0;
}

.faq--a.eContent {max-height:none;}
.faq--a {padding-top:10px;}

.faq--readmore {clear:both; position:relative;
color:#273947; font-weight:bold; text-align:center;
font-size:24px; line-height:44px;
cursor:pointer; overflow:hidden;
}
.rBtnText {position:relative; padding:3px 15px;
display:inline-flex; justify-content:flex-end; align-items:center;
border:4px solid #273947;
}
.rBtnText:before {content:"+"; display:inline-block;
margin-right:4px; position:relative; top:-1px;
font-size:44px;
}
.expand .rBtnText:before {content:"-";}

#fixHeader {width:100%; height:60px;
position:fixed; left:0; top:-60px;
background-color:#273947;
display:flex; justify-content:center; align-items:center;
}
#fixHeader h2 {margin-bottom:0;
font-size:24px; color:#fff;
}

@media screen and (max-width: 800px) {

    .faq--intro-pic {display:none;}
    .faq--intro-text {float:none; width:auto; padding-left:0;}


}

@media screen and (max-width: 500px) {

  .faq--q {font-size:20px;}

}

</style>