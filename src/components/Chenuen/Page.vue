<template>
<div class="pagewpr">

<div class="page--aside">
  <div class="page--title"></div>

  <div class="page--navpanel">
    <div class="swiper--control">
      <!-- swiper pagination -->
      <div class="swiper-pagination" id="galleryFraction"></div>
      <!-- navigation buttons -->
      <div class="swiper-btnwpr">
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>   
    </div>

    <div class="page--navbtn" v-on:click="toggleDesc">
      <i class="page--navbtn-icon" v-bind:class="{expand: descActive}"></i>
      <div class="page--navbtn-txt">
        <div class="navbtn-txt1">
          <span v-show="descActive">關閉導覽</span>
          <span v-show="!descActive">開啟導覽</span>
        </div>  
        <div class="navbtn-txt2"><strong v-show="descActive">關閉</strong><strong v-show="!descActive">開啟</strong>細節說明</div>
      </div>  
    </div>
     
  </div>
  
</div>

<div class="page--desc" v-bind:class="{expand: descActive}">
  <!-- <div class="innerwpr">
    <h2>深邃美麗的亞細亞</h2>
    <p>《深邃美麗的亞細亞》兼具了脫離世界、遺世獨立的特質，以及體現普世性的寓意，既分裂又交融。這就是鬥爭權衡之美的所在！作品中更充滿了傳承自中國文學《山海經》、《封神演義》，交融奇幻文學的想像力、與超現實主義，可說是跨越時空、鄭問最年輕張狂的經典之作！</p>
    <p>其中許多獨特的角色，如百兵衛（倒霉王）、理想王、完美王、潰爛王、收妖王、善意王、蜘蛛人、蛤蟆精、傀儡王、南魔天、蛇郎君、痛苦女等，他們有神性、有魔性、有人性。在物慾橫流的世界裡，他們都在尋求些「什麼」，有人追逐名利，有人迷戀權勢，有人等待幸福……什麼樣的世界才是人類夢寐以求的「美麗新世界」？鄭問運用他那出神入化的筆勾勒出一幅人性藍圖，善與惡交織成一篇篇動人的故事。</p>
  </div> -->
  <div class="swiper-container gallery--progress">

      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in imgSrc" :key="item.id">
            <div class="scrollwpr">
              <div class="content">
                <h2 v-text="item.title"></h2>
                <div v-html="item.desc"></div>
              </div>   
            </div>                     
          </div>
      </div>

      <!-- Pagination -->
      <div class="swiper-pagination swiper-pagination-progressbar" id="galleryProgress"></div>

  </div>

</div>

<div class="swiper-container page--gallery" v-bind:class="{collapse: descActive}">

    <div class="swiper-wrapper">
        <div class="swiper-slide" 
          v-for="item in imgSrc" 
          :key="item.id"
          v-bind:style="{ backgroundImage: 'url(' + item.url + ')' }"
        >
          <img class="swiper-slide__image" v-bind:src="item.url" />
          <div class="note--wrapper">
            <div class="note--container" v-html="item.note">

            </div>
          </div>
              <!-- <div class="note--entry" style="left:15%; top:25%;">
                <div class="note--marker">1</div>
                <div class="note--content">
                  <div class="note--content__image">
                    <img src="/proj-assets/chenuen/images/sample/zoom_sample01.jpg" />
                  </div>
                  <div class="note--content__text">
                    <h4>深邃美麗的亞細亞</h4>
                    <p>其中許多獨特的角色，如百兵衛（倒霉王）、理想王、完美王、潰爛王、收妖王、善意王、蜘蛛人、蛤蟆精、傀儡王、南魔天、蛇郎君、痛苦女等，他們有神性、有魔性、有人性。在物慾橫流的世界裡，他們都在尋求些「什麼」。</p>
                  </div>                  
                </div>
              </div>

              <div class="note--entry" style="left:35%; top:55%;">
                <div class="note--marker">2</div>
                <div class="note--content">
                  <div class="note--content__image">
                    <img src="/proj-assets/chenuen/images/sample/zoom_sample02.jpg" />
                  </div>
                  <div class="note--content__text">
                    <h4>深邃美麗的亞細亞</h4>
                    <p>脫離世界、遺世獨立的特質，以及體現普世性的寓意，既分裂又交融。這就是鬥爭權衡之美的所在！作品中更充滿了傳承自中國文學</p>
                  </div>                  
                </div>
              </div> -->
        </div>
    </div>    

</div>
<!-- </div> -->

<!-- <div class="swiper-container gallery--progress">

    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in imgSrc" :key="item.id"></div>
    </div>

    <div class="swiper-pagination swiper-pagination-progressbar" id="galleryProgress"></div>

</div> -->

</div>
</template>

<script>
//plugins
import Swiper from 'swiper/dist/js/swiper.js';
import imagesLoaded from 'imagesloaded';
import PerfectScrollbar from 'perfect-scrollbar';

//function
import {initNoteContainer} from './common/page.js'

//主圖資料
import {testdata} from './data/testdata.js'

export default {

  components: {

  },

  // Component data must be a function.
  data: function() {
    return {
      imgSrc: testdata,
      descActive: true,
      gallery: {},
      galleryProgress: {}
    };
  },

  props: {

  },

  watch: {

  },

  computed: {

  },

  methods: {  
    
    // toggleDesc: toggleDesc,
    initNoteContainer: initNoteContainer,

    toggleDesc: function(){
      // 展開收闔額外的說明文字
      this.descActive = !this.descActive;
      
      setTimeout(() => {
        this.initNoteContainer();
      },300);      
      
    }

  },

  mounted: function(){

    //主圖
    this.gallery = new Swiper ('.page--gallery', {
      loop: true,
      observer: true,

      pagination: {
        el: '#galleryFraction',
        type: 'fraction',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }

    });

    //進度條
    this.galleryProgress = new Swiper ('.gallery--progress', {
      loop: true,
      effect: "fade",

      pagination: {
        el: '#galleryProgress',
        type: 'progressbar',
      }
    });

    //主圖與進度條連動
    this.gallery.controller.control = this.galleryProgress;

    imagesLoaded( document.querySelector('.page--gallery'), () => {
      this.initNoteContainer();
      // console.log("image loaded");
    });
    
    //說明區自訂卷軸
    // const pageDescScroll = new PerfectScrollbar('.page--desc');

    window.addEventListener("resize",() => {
      this.initNoteContainer();
    },false);




  }

};
</script>

<style>
@import './style/swiper.min.css';
@import './style/perfect-scrollbar.css';
@import './style/page.css';
</style>


<style scoped>
</style>
