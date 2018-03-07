<template>

<article class="farmhouse opinion" v-if="getParams == 'opinion'">
  <!-- /project/farmhouse/opinion -->
  <!-- 農舍面面觀 -->
  <logo :top="`8px`" :left="`15px`" :bgColor="`#79cfa8`" :bgImage="`/proj-assets/farmhouse/images/navbtn.png`"></logo>
  <share :shareUrl="shareLinkOpinion" :top="`8px`" :left="`69px`" :bgColor="`#79cfa8`" :bgImage="`/proj-assets/farmhouse/images/navbtn.png`"></share>
  
  <opinion v-on:expand="expandable" v-bind:currDevice="currentDevice"></opinion>
</article>

<article class="farmhouse faq" v-else-if="getParams == 'faq'">
  <!-- /project/farmhouse/faq -->
  <!-- 來來來看完你就變農舍達人了 -->
  <logo :top="`8px`" :left="`15px`" :bgColor="`#79cfa8`" :bgImage="`/proj-assets/farmhouse/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`8px`" :left="`69px`" :bgColor="`#79cfa8`"></share>
  
  <faq v-on:expand="expandable" v-bind:currDevice="currentDevice"></faq>
</article>

<article class="farmhouse gallery" v-else-if="getParams == 'gallery'">
  <!-- /project/farmhouse/gallery -->
  <!-- 田中央 -->
  <logo :top="`15px`" :left="`15px`" :bgColor="`#79cfa8`" :bgImage="`/proj-assets/farmhouse/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`15px`" :left="`69px`" :bgColor="`#79cfa8`"></share>
  
  <gallery></gallery>

</article>

<article class="farmhouse home" v-else>
<!-- /project/farmhouse/   -->
<!-- 主文 -->
  <logo :top="`15px`" :left="`15px`" :bgColor="`#79cfa8`" :bgImage="`/proj-assets/farmhouse/images/navbtn.png`"></logo>
  <!-- <share :shareUrl="shareLink" :top="`15px`" :left="`69px`" :bgColor="`#79cfa8`" :bgImage="`/proj-assets/farmhouse/images/navbtn.png`"></share> -->
  <share :shareUrl="shareLink" :top="`15px`" :left="`69px`" :bgColor="`#79cfa8`"></share>
 
  <!-- 通通拿去種農舍 -->
  <opening v-on:noteToggle="noteToggleContent" v-bind:currDevice="currentDevice"></opening>

  <!-- 農地不農用，又怎樣？ -->
  <sowhat></sowhat>

  <!-- 宜蘭農舍四多：數量多、違規多、佔用農地多、交易多 -->
  <data-crisis v-on:noteToggle="noteToggleContent" v-bind:currDevice="currentDevice"></data-crisis>

  <!-- 為什麼是宜蘭？ -->
  <why-yilan>為什麼是宜蘭？</why-yilan>

  <!-- 老農成為農舍主力賣家 -->
  <trade-data v-on:noteToggle="noteToggleContent" v-bind:currDevice="currentDevice" v-bind:loaded="isObloaded"></trade-data>

  <!-- 農民困境：前有斷崖，後有追兵 -->
  <helpless v-on:noteToggle="noteToggleContent"></helpless>

  <!-- 農舍違法多，六萬護一生 -->
  <violation v-bind:currDevice="currentDevice"></violation>

  <!-- 顧好農業，才能管好農舍 -->
  <conclusion></conclusion>

  <!-- ending -->
  <ending></ending>


  <div class="navwpr" v-bind:class="{open: navOpen}">
    <ul class="nav">
      <li v-for="(item, index) in chapterTitle" class="navList" v-scroll-to="item.id" v-on:click="navSlide(index)">{{item.abbr}}</li>
    </ul>
    <div class="navClose" v-on:click="navSlide">
      <div class="icon"></div>
    </div>
  </div>

  <div class="navTrigger" v-on:click="navSlide">
    <div class="icon"></div>
  </div>

  <div id="progresswpr">
    <div class="progress" v-for="(item, index) in chapterTitle" v-scroll-to="item.id" @click="clickGA(index)">
        <div class="progress--percentage"></div>
        <div class="progress--title">{{item.abbr}}</div>
    </div>
  </div>

</article>



</template>

<script>
  import { SITE_URL } from '../../constants';
  import _ from 'lodash';
  import Logo from '../Logo.vue';
  import Share from '../Share.vue';
  import titleMeta from '../../util/titleMeta';

  //plugins
  import Vue from 'vue';
  import VueScrollTo from 'vue-scrollto';
  /* https://rigor789.github.io/vue-scrollto/#/docs */
  Vue.use(VueScrollTo,{
    duration: 600
  });

  //article section
  import opening from './OpeningChapter.vue';
  import sowhat from './Sowhat.vue';
  import dataCrisis from './DataCrisis.vue';
  import whyYilan from './WhyYilan.vue';
  import tradeData from './Trade-data.vue';
  import helpless from './Helpless.vue';
  import violation from './Violation.vue'; 
  import conclusion from './Conclusions.vue';  
  import ending from './Ending.vue';
  // import credit from './Credit.vue';

  //stand-alone
  import Faq from './Faq_standalone.vue';
  import gallery from './Gallery_standalone.vue';
  import opinion from './Opinion_standalone.vue';
  
  //chapter title
  import chapterTitle from './data/chapterTitle.json';

  //scene
  import {setScene} from './scene/main.js';

  //check device
  import {currDevice} from '../../util/comm.js';

  export default {
    name: 'FarmhouseProject',
    components: {
      //components
      'logo': Logo,
      'share': Share,

      //chapter
      'opening': opening,
      'sowhat': sowhat,
      'data-crisis': dataCrisis,
      'why-yilan': whyYilan,
      'trade-data': tradeData,
      'helpless': helpless,
      'violation': violation,    
      'conclusion': conclusion,      
      'ending': ending,

      //standalone
      'faq': Faq,
      'gallery': gallery,
      'opinion': opinion
    },
    mixins: [ titleMeta ],
    data () {
      return {
        shareLink: `${SITE_URL}farmhouse`,
        shareLinkOpinion: `${SITE_URL}farmhouse/opinion`,
        shareLinkFaq: `${SITE_URL}farmhouse/faq`,
        shareLinkGallery: `${SITE_URL}farmhouse/gallery`,

        chapterTitle: chapterTitle,
        navOpen: false,

        currentDevice: '',
        isObloaded: false,
        currentIndex: 0

      }
    },
    computed: {
      getParams () {
        //取得網址列參數
        return _.get(this.$route, 'params.params');
      }
    },
    metaInfo () {
      let description = '《鏡傳媒》透過數據分析調查發現，宜蘭不只農舍多，違規農舍竟然還比合法多！更教人意外的是，農舍買賣市場的主要賣方，竟然是所謂的「老農」⋯⋯'
      let ogImage = 'farmhouse/images/og.jpg'
      let metaUrl = 'farmhouse'

      return {
        title: '萬畝農舍良田起',
        description: description,
        metaUrl: metaUrl,
        metaImage: ogImage
      }
    },
    created () {

      let currOS = this.$store.state.os;
      this.currentDevice = this.currDevice(currOS);
      // console.log(this.currentDevice);

    },
    beforeMount () {

    },
    mounted () { 

      if (process.browser) {        

        if(!this.getParams){

          this.setScene();        
          
        }        

        //ckeck current device
        // let currOS = this.$store.state.os;
        // console.log("current OS: " + currOS);
        // console.log("current Device: " + this.currDevice(currOS));
        // this.currentDevice = this.currDevice(currOS);
        // console.log(this.currentDevice);

      }    
      // console.log(this.$route);

      //網址 farmhouse/XXX 值
      // console.log(this.getParams);
      
      //get state
      //console.log(this.$store.state);

      window.addEventListener('load', () => {
        this.isObloaded = true;
        console.log(this.isObloaded);
      });

    },
    methods: {

      //可收闔內容
      expandable: function(event, name){

        //event target
        let target = event.currentTarget;
        let parent = target.parentNode;

        //收闔的內容區塊
        let eContent = parent.querySelector(".eContent");

        //收闔內容區塊原始高度
        let maxHeight = eContent.scrollHeight;
        
        if(parent.classList.contains("expand")){
              //關閉
              parent.classList.remove("expand");
              eContent.style.maxHeight  = "0";

          } else {
              //展開
              window.ga('send', 'event', 'projects', 'click', name, { nonInteraction: false })
              parent.classList.add("expand");
              eContent.style.maxHeight  = maxHeight + "px";
          }  
      }, //expandable

      setScene,

      navSlide (index){
        if (index !== this.currentIndex) {
          this.currentIndex = index
          window.ga('send', 'event', 'projects', 'click', `nav${index + 1}`, { nonInteraction: false })
        }
        this.navOpen = !this.navOpen;

      },

      noteToggleContent: function(event){
        let trigger = event.currentTarget;
        let content = trigger.nextElementSibling;
        content.classList.toggle("expand");
      },

      currDevice,

      clickGA (index) {
        if (index !== this.currentIndex) {
          this.currentIndex = index
          window.ga('send', 'event', 'projects', 'click', `nav${index + 1}`, { nonInteraction: false })
        }
      }


    } //methods
  }
</script>

<style>
/* Common */
.farmhouse {
font-size:19px; line-height:1.8; color:#1a1a1a;
font-family:"微軟正黑體", "Microsoft JhengHei", sans-serif;
}

.logo {background-size:auto 100% !important;}
.share__item.toggle {
background-image:url("/proj-assets/farmhouse/images/navbtn.png") !important;
background-size:auto 100% !important;
background-position:right top !important;
}

section {
/* padding:50px 0 100px 0;  */
position:relative;
background-color:#f8f8f8;
}
section.dark {background-color:#273947; color:#fff;}

.centerwpr {max-width:860px; position:relative;
margin:0 auto; padding:70px 90px;
box-sizing:border-box;
}
/* .centerwpr.dark {
background-color:#273947; color:#fff;
} */
.centerwpr:after {content:""; display:table; clear:both;}

.standalone .centerwpr {padding:50px 20px; max-width:900px;}
.standalone .header--content .centerwpr {padding:0 20px;}

h1,h2,h3,h4,h5,h6 {
font-family:"Noto Sans TC", "Microsoft JhengHei", -apple-system, sans-serif;  
}

h2,h3,h4,h5 {margin:0;
letter-spacing:1px; line-height:1.2; 
}

h2 {margin-bottom:15px;
color:#273947; font-size:34px; text-align:center;
}
.dark h2 {color:#fff;}
h2 strong {margin-right:2px;
font-size:44px; font-weight:700;
}

h3 {margin-bottom:25px; font-size:32px;}
h4 {font-size:28px;}

p {margin:30px 0 0 0;
text-align:justify; text-justify:distribute;
}
p.quote {font-size:22px;}
p strong {color:#ff788d;}

a {color:#79caa1;}

img {display:block; max-width:100%;}

.additional {padding:20px 35px; margin-top:30px;
color:#1a1a1a;
background-color:#ababab; border-radius:10px;
}

/* 收闔區塊 */
.eContent {overflow:hidden; max-height:0;
transition:400ms; transition-property:max-height;
}

/* dialog */
.dialog {margin:0 auto; padding-top:50px;}

.dialog--entry {
display:flex; align-items:flex-start;
position:relative;
/* opacity:0; */
/* transition:1000ms; transition-property:opacity,left,right; */
}
.dialog--entry.active {opacity:1;}

.dialog--entry.question {left:-110px; left:-50px;}
/* .dialog--entry.question.active {left:-50px;} */

.dialog--entry.answer {justify-content:flex-end; margin-top:-14px;
right:-110px; right:-50px;
/* transition-delay:400ms; */
}
/* .dialog--entry.answer.active {right:-50px;} */

.dialog--portrait {width:96px; height:96px;
border-radius:50%; overflow:hidden;
flex-shrink:0; pointer-events:none;
position:relative; z-index:100;
}
.question .dialog--portrait {margin-right:40px;}
.answer .dialog--portrait {order:2; margin-left:40px;}

.dialog-bubble {max-width:460px; position:relative;
box-sizing:border-box; margin-top:50px;
display:flex; align-items:center;
}
.dialog-bubble.wide {max-width:700px;}
.answer .dialog-bubble {order:1;}

.dialog-bubble:before {content:""; display:block;
width:46px; height:50px; position:absolute; left:-20px; top:-6px;
background-image:url("/proj-assets/farmhouse/images/bubble-tips.png");
background-size:100% auto; background-position:left top;
background-repeat:no-repeat;
}
.answer .dialog-bubble:before {left:auto; right:-20px;
background-position:left -150px;  
}

.dialog-bubble .bubble-content {margin-top:0; position:relative;
padding:18px 30px;
color:#1a1a1a; line-height:1.5; font-size:18px;
background-color:#c5c5c5; border-radius:33px;
}
.answer .dialog-bubble .bubble-content {
  background-color:#7acca4;
}

.dialog-bubble p {margin-top:15px;}
.dialog-bubble p:first-of-type {margin-top:0;}

.bubble-content ul,.bubble-content ol {
  margin:0; padding-left:20px;
}
.bubble-content li {
  margin-top:5px;  
}

/* .question .dialog-bubble p:before {content:"Q"; width:40px; height:40px; margin-right:12px;
color:#7ccfa5; font-weight:700; text-align:center; font-size:22px;
background-color:#273947; border-radius:4px;
display:inline-flex; align-items:center; justify-content:center;
} */

/* chapter header */
.chapter--header {width:100%; height:100vh; position:relative;
background-repeat:no-repeat; background-size:cover;
background-position:center top;
display:flex; flex-direction:column; justify-content:flex-end;
}
.standalone .mobile.chapter--header {padding-top:0;}


.header--content {position:relative;
padding:50px 0; color:#fff;  
background-color:rgba(39,57,71,1);  
}
.header--content h2 {color:#fff;}

.standalone .header--content {padding:30px 0 40px 0;}
.standalone .header--content h2 {margin-bottom:0;}
.standalone .header--content p {margin-top:20px;}

.standalone.opinion {padding-bottom:0;}

/* Chapter Nav */
.navwpr {position:fixed; left:0; top:0; height:100vh;
display:flex; align-items:center;
pointer-events:none; z-index:9999;
display:none;
}
.nav {pointer-events:auto; padding-left:0; margin-left:10px;
background-color:rgba(255,255,255,0.8);
border-radius:2px;
}
.nav li {cursor:pointer; list-style:none;
padding:8px 10px; max-width:160px;
font-size:17px; line-height:1.2;
display:none;
}
.nav li.sibling {display:block;}
.nav li.current {display:block;
color:#fff;
background-color:#427094;
}

.navTrigger {position:fixed; right:15px; top:15px; z-index:999;
width:44px; height:44px; border-radius:50%;
cursor:pointer;
background-color:#79cfa8;
display:none;
}

.navTrigger .icon {width:20px; height:2px; position:absolute; left:50%; top:50%;
margin-left:-10px; margin-top:-1px;
background-color:#273848;
transition:300ms; transition-property:transform;
pointer-events:none;
}
.navTrigger .icon:before,.navTrigger .icon:after {content:""; display:block;
width:20px; height:2px; position:absolute; left:0;
background-color:#273848;
}
.navTrigger .icon:before {top:-6px;}
.navTrigger .icon:after {bottom:-6px;}

.navTrigger:hover .icon {transform:rotate(-90deg);}

.navClose {display:block; width:42px; height:42px; cursor:pointer;
position:absolute; right:15px; top:15px;
border-radius:50%; transform:rotate(45deg);
opacity:0;
background-color:rgba(255,255,255,0.15);
}
.open .navClose {opacity:1;}

.navClose .icon {width:20px; height:2px; position:absolute; left:50%; top:50%;
margin-left:-10px; margin-top:-1px;
background-color:#c5c5c5;
}
.navClose .icon:before {content:""; display:block; width:2px; height:20px;
position:absolute; left:50%; top:50%;
margin-left:-1px; margin-top:-10px;
background-color:#c5c5c5;
}

.navClose:hover .icon {background-color:#fff;}
.navClose:hover .icon:before {background-color:#fff;}

/* Chart */
.chartwpr {margin-top:45px; margin-bottom:15px;}
.chart--header {padding-left:10px; border-left:4px solid #333;
margin-bottom:20px; padding-bottom:1px;
}
.dark .chart--header {border-left:4px solid #fff;}

.chart--title {font-size:22px; line-height:1.1;
margin-bottom:10px;
}
.chart--source {font-size:16px; color:#888; line-height:1;}
.chart--note {font-size:16px; color:#888; margin-top:10px;}

/* read position */
#progresswpr {position:fixed; left:16px; top:10%; width:12px; height:80%; z-index:9999;
display:flex; justify-content:center; align-items:center;
flex-direction:column;
transition:700ms; transition-property:left;
}
#progresswpr.hide {left:-40px;}
.progress {width:100%; height:60px; position:relative;
margin:3px 0; cursor:pointer;
background-color:rgba(223,223,223,0.6);
border-radius:2px;
}

.progress--percentage {position:absolute; left:0; top:0; 
width:100%; height:0;
background-color:#7acca5;
border-radius:2px;
}
.progress--title {position:absolute; width:100%; top:50%; left:20px;
font-size:14px; line-height:1; white-space:nowrap;
writing-mode:vertical-rl; pointer-events:none;
opacity:0;
}
.current .progress--title {opacity:1;}
.progress:hover .progress--title {opacity:1;}

#progresswpr:hover .progress--title {opacity:0;}
#progresswpr:hover .progress:hover .progress--title {opacity:1;}

.progress--title {color:#888;}



/* standalone progress */
#standProgress {width:100%; height:10px;
position:fixed; left:0; bottom:0;
background-color:#969da2;
}
#standProgress .stand--percentage {
height:10px; width:0;
background-color:#79cfa8;
}



/* 註 */
.noteTrigger {display:inline-block; position:relative; margin-left:6px;
cursor:pointer; color:#fff; text-align:center; line-height:32px;
width:32px; height:32px; border-radius:50%;
background-color:#acaaab; vertical-align:center;
}
.dark .noteTrigger {color:#273947;}
/* .noteTrigger:after {content:""; width:30px; height:1px; margin-left:-15px;
position:absolute; left:50%; bottom:2px;
background-color:#888;
display:none;
}
.noteTrigger:hover:after {display:block;} */

.noteBlock {display:none; margin:15px 0; padding:10px 20px;
color:#888; font-size:17px; line-height:1.5;
border:2px solid #aaa; border-radius:8px;
}
.dark .noteBlock {border:2px solid #888;}
.noteBlock.expand {display:block;}

/* standalone fix header */
#fixHeader {width:100%; height:60px;
position:fixed; left:0; top:-60px;
background-color:#273947;
display:flex; justify-content:center; align-items:center;
}
#fixHeader h2 {margin-bottom:0;
font-size:24px; color:#fff;
}

/* hero video */
#mediaContainer {width:100%; height:100vh; position:absolute; left:0; top:0;
overflow:hidden;
}

.standalone.faq #mediaContainer {height:80vh;}

#herovid {
width:auto; height:auto;
min-width:100%; min-height:100%;
position:absolute; left:50%; top:50%;
transform:translateX(-50%) translateY(-50%);
}
.mobile #herovid {display:none;}

.standalone.faq #herovid {left:0; bottom:0; top:auto;
transform:none;
}

.heroimg {width:100%; height:100%; position:relative;
/* position:absolute; left:0; top:0; */
background-size:cover; background-repeat:no-repeat;
background-position:center center;
}
.opening .heroimg {
position:absolute; left:0; top:0;  
background-image:url("/proj-assets/farmhouse/images/landing/phonelandingpic01.jpg");
}

.faq .heroimg {height:60vh;
background-image:url("/proj-assets/farmhouse/images/landing/phonelandingpic02.jpg");
}
.opinion .heroimg {height:60vh;
background-image:url("/proj-assets/farmhouse/images/landing/phonelandingpic03.jpg");
}

/* expandable trigger */
/* .eTrigger {clear:both; position:relative;
color:#79cfa8; font-weight:bold; text-align:center;
font-size:24px; line-height:44px;
cursor:pointer; overflow:hidden;
}
.eBtnText {position:relative; padding:3px 15px;
display:inline-flex; justify-content:flex-end; align-items:center;
border:4px solid #79cfa8;
}
.eBtnText:before {display:inline-block;
margin-right:4px; position:relative; top:-1px;
font-size:44px;
}
.expandText:before {content:"+";}
.collapseText:before {content:"-";}

.expandable .collapseText {display:none;}
.expandable.expand .expandText {display:none;}
.expandable.expand .collapseText {display:inline-flex;} */

@media screen and (max-width: 1050px) {

  .centerwpr {overflow:hidden;}

  .dialog--entry.question {left:-75px;}
  .dialog--entry.question.active {left:-15px;}

  .dialog--entry.answer {right:-75px;}
  .dialog--entry.answer.active {right:-15px;}

  /* progress bar */
  #progresswpr {display:none;}

  /* hamburger */
  .navTrigger {display:block;}
  .navwpr {left:auto; right:-300px;
    background-color:#273947;
    transition:500ms; transition-property:right;
    display:flex;
  }
  .navwpr.open {right:0;}
  .nav {margin-left:0;
    background-color:transparent;
  }
  .nav li {display:block; padding-left:20px; max-width:200px;
    color:#c5c5c5;
  }
  .nav li:hover {color:#fff;}

  .nav li.current {display:block;
    color:#273947;
    background-color:#fff;
  }



}

@media screen and (max-width: 800px) {

  .centerwpr {padding:70px 20px;}
  /* .centerwpr.dark {padding:70px 20px;} */

  .dialog--portrait {width:60px; height:60px;}
  .question .dialog--portrait {margin-right:10px;}
  .answer .dialog--portrait {margin-left:10px;}

  .dialog--entry.answer {margin-top:0;}

  .dialog-bubble {margin-top:35px;}
  .dialog-bubble:before {transform:scale(0.8); left:-10px;}
  .answer .dialog-bubble:before {right:-10px;}

  .chapter--header {height:auto; padding-top:80vh;}

}

@media screen and (max-width: 500px) {

  .farmhouse {font-size:18px;}

  .dialog--entry {flex-direction:column;}

  .dialog--entry.question {left:-60px; margin-bottom:10px;}
  .dialog--entry.question.active {left:0;}

  .dialog--entry.answer {right:-60px;}
  .dialog--entry.answer.active {right:0;}

  .answer .dialog--portrait {order:0; align-self:flex-end;}

  .dialog-bubble {margin-top:-10px;}
  .dialog-bubble .bubble-content {padding:18px 20px;
    font-size:17px;
  }

  .chart--title {font-size:20px;}


}



</style>