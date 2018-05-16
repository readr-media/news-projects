<template>

<!-- /project/chenuen/page -->
<div v-if="getParams == 'page'">

  <logo :top="`12px`" :left="`15px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#b1adca`"></share>

  <page></page>
</div>

<!-- /project/chenuen/pagem 手機版暫時 -->
<div v-else-if="getParams == 'pagem'">

  <logo :top="`2px`" :left="`6px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`2px`" :left="`54px`" :bgColor="`#b1adca`"></share>

  <pagem></pagem>
</div>

<!-- Homepage -->
<div v-else>

  <logo :top="`12px`" :left="`15px`" :bgColor="`#b1adca`" :bgImage="`/proj-assets/chenuen/images/navbtn.png`"></logo>
  <share :shareUrl="shareLink" :top="`12px`" :left="`69px`" :bgColor="`#b1adca`"></share>

  <div class="outerwpr">
    <home></home>
    <page></page>
  </div>  

</div>

</template>

<script>
//common
import { SITE_URL } from "../../constants";
import titleMeta from "../../util/titleMeta";
import Logo from '../Logo.vue';
import Share from '../Share.vue';

//plugins
import _ from 'lodash';

// pages
import home from './Home.vue';
import page from './Page.vue';
import pagem from './Pagem.vue';

export default {

  name: "ChenUenProject",

  mixins: [titleMeta],

  components: {
    'logo': Logo,
    'share': Share,

    'home': home,
    'page': page,
    'pagem': pagem
  },

  computed: {
    getParams() {
      //取得網址列參數
      return _.get(this.$route, "params.params");
    }
  },

  data: function() {
    return {
      shareLink: `${SITE_URL}chenuen`,
      // shareLinkOpinion: `${SITE_URL}farmhouse/opinion`,
      // shareLinkFaq: `${SITE_URL}farmhouse/faq`,
      // shareLinkGallery: `${SITE_URL}farmhouse/gallery`
      currentDevice: '',

      introVisibility: false,
      // wheelTimer: null,
  
      homeTransitionEnd: false,
      galleryTransitionEnd: false,

      // galleryVisibility: false


    };
  },

  metaInfo() {
    let ogTitle = "鄭問專題";
    let description = "鄭問專題";
    let metaUrl = "chenuen";
    let ogImage = "chenuen/images/og.jpg";

    return {
      title: ogTitle,
      description: description,
      metaUrl: metaUrl,
      metaImage: ogImage
    };
  },

  methods: {

    getIntroHeight: function(){
      return document.querySelector('.home-intro').offsetHeight;
    },
    
    showIntro: function(element, top){     
      element.style.top = top * -1 + 'px';          
    },

    checkHomePosition: function(that, home){ 
      
      let top = home.style.top;

      if(top == '0px'){
        that.introVisibility = false;
      } else {
        that.introVisibility = true;
      }
      
    },

    homeWheel: function(that,e,homewpr,pagewpr,offset,wrapper){  
           
      let y = e.deltaY;

      console.log(y);

      if(y > 0){ //往下捲動

        if(that.introVisibility == false){
          // 當 intro 還沒出現
          that.showIntro(homewpr,offset);
          wrapper.classList.add('run');
          return false;  

        } else if (that.introVisibility == true && that.homeTransitionEnd == true) {
          // 當 intro 已顯示  
            wrapper.classList.add('run');
            pagewpr.classList.add('show');  
          return false;
        }

      } else if (y < 0 && that.homeTransitionEnd == true){ //往上捲動

          if(that.introVisibility == false){

            console.log('不動作');
            return false;

          } else {            
              wrapper.classList.add('run');
              homewpr.style.top = '0px';  
              that.homeTransitionEnd = false;
              return false;
          }        

        }

          
    },
    
    pageWheel: function(that,e,pagewpr,wrapper){  

      let y = e.deltaY;

      if (y < 0 && this.galleryTransitionEnd == true){
        //往上捲動，隱藏 gallery
        wrapper.classList.add('run');
        pagewpr.classList.remove('show');  
        return false;    

      } else {
        console.log('不動作');
        return false;
      }

    }

  },

  created () {    
    //current device
    this.currentDevice = this.$store.state.isMobile ? 'mobile' : 'desktop';
    console.log("device: " + this.currentDevice);
  },

  mounted: function() {

    let homewpr = document.querySelector('.homewpr');
    let pagewpr = document.querySelector('.pagewpr');

    let wrapper = document.querySelector('.outerwpr');

    homewpr.style.top = '0px';

    //get intro height
    let offset = this.getIntroHeight();

    // resize
    window.addEventListener('resize',() => {
      offset = this.getIntroHeight();
    }, false);

    //window prevent wheel
    window.addEventListener('wheel',() => {

      if(this.homeTransitionEnd == false || this.galleryTransitionEnd == false){
        console.log("禁止滾動");
        return false
      }

    }, false);

    
    // transition end
    homewpr.addEventListener('transitionend',() => {
      
      this.homeTransitionEnd = true;
      wrapper.classList.remove('run');

      this.checkHomePosition(this,homewpr);      
      console.log('run remove (homepwr)');      
        
    },false);
    
    // wheel: homewpr
    homewpr.addEventListener('wheel',(e) => {   
      this.homeWheel(this,e,homewpr,pagewpr,offset,wrapper);    
    }, false);  
    
    // transition end
    pagewpr.addEventListener('transitionend',() => {

      this.galleryTransitionEnd = true;   
      wrapper.classList.remove('run'); 
      console.log('run remove (gallery)');

    },false);

    //wheel pagewpr
    pagewpr.addEventListener('wheel',(e) => {
 
      this.pageWheel(this,e,pagewpr,wrapper);   

    });

    document.getElementById('showGallery').addEventListener('click',() => {
      //click to show gallery section
      pagewpr.classList.add('show');
    });

    document.getElementById('showIntro').addEventListener('click',() => {
      this.showIntro(homewpr,offset);
    });   


  }

};
</script>

<style>
@import './style/animate.css';
@import './style/common.css';

.run .homewpr,
.run .pagewpr {pointer-events:none;
opacity:0.3;
}
</style>

<style scoped>
.outerwpr {width:100%; height:100vh; position:relative; overflow:hidden;}
</style>
