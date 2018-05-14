<template>
<div class="pagewpr">

<!-- <div class="page--aside" v-bind:class="{expand: descActive}"> -->
<div class="page--aside expand">

  <div class="page--title"></div>

  <div class="page--btnwpr">
    <div class="page--btn desc" 
      v-on:click="toggleDesc"
      v-bind:class="{active: descActive}">
      <i></i>
      <span v-show="descActive">關閉故事</span>
      <span v-show="!descActive">顯示故事</span>
    </div>
    <div class="page--btn note" 
      v-on:click="toggleNote"
      v-bind:class="{active: noteActive}">
      <i></i>
      <span v-show="noteActive">關閉細節</span>
      <span v-show="!noteActive">顯示細節</span>
    </div>
  </div>

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

  </div>

  <div class="page--desc">
    <div class="swiper-container gallery--progress">

        <div class="swiper-wrapper">
            <div class="swiper-slide swiper-no-swiping"
              v-for="item in galleryData" 
              :key="item.id">
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
  
</div>

<!-- <div class="swiper-container page--gallery" v-bind:class="{hide: !noteActive}"> -->
<div class="swiper-container page--gallery">  

    <div class="swiper-wrapper">
        <div class="swiper-slide" 
          v-for="item in galleryData" 
          :key="item.id"
          v-bind:style="{ backgroundImage: 'url(' + item.url + ')' }"
        >
          <img class="swiper-slide__image" v-bind:src="item.url" />
          <div class="note--wrapper">  
            <div class="note--container">
              <!-- note--entry -->
              <div class="note--entry" 
                v-for="(entry,index) in item.note" :key="entry.id"                
                v-bind:style="{
                  left: entry.left,
                  top: entry.top
                }"
              >
                  <div class="note--marker">{{index + 1}}</div>
                  <div class="note--content">
                      <div class="note--content__image">
                          <img v-bind:src="entry.url" />
                      </div>
                      <div class="note--content__text">
                          <h4>{{entry.title}}</h4>
                          <div v-html="entry.desc"></div>
                      </div>
                  </div>
              </div>
              <!-- note--entry -->
            </div>
          </div>

        </div>
    </div>    

</div>
<!-- </div> -->

</div>
</template>

<script>
//plugins
// import superagent from "superagent";
import Swiper from "swiper/dist/js/swiper.js";
import imagesLoaded from "imagesloaded";
import PerfectScrollbar from "perfect-scrollbar";

//function
import { initNoteContainer } from "./common/page.js";

//主圖資料
import galleryData from './data/gallery.json'

export default {
  components: {},

  // Component data must be a function.
  data: function() {
    return {
      galleryData: galleryData,
      // loaded: false,

      descActive: true,
      noteActive: true,

      gallery: {},
      galleryProgress: {},

      scrollwprGroup: []
    };
  },

  props: {},

  computed: {},

  methods: {

    initNoteContainer: initNoteContainer,

    toggleDesc: function() {
      // 展開收闔額外的說明文字
      // this.descActive = !this.descActive;
      document.querySelector('.page--aside').classList.toggle('expand');

      setTimeout(() => {
        this.gallery.update();
        this.galleryProgress.update();
        this.initNoteContainer();
        this.destoryScroll();

        // if (this.descActive) {
        //   //show desc, reinit scroll
        //   this.initScroll();
        // }
        if(document.querySelector('.page--aside').classList.contains('expand')){
          this.initScroll();
        }     

      }, 0);
    },

    toggleNote: function() {
      // 展開收闔圖片上的說明
      // this.noteActive = !this.noteActive;
      document.querySelector('.page--gallery').classList.toggle('hide');
    },

    initScroll: function() {
      //說明區自訂卷軸
      let scrollArray = this.scrollwprGroup;
      let descScrollwpr = document.querySelectorAll(".scrollwpr");

      descScrollwpr.forEach(function(element, index) {
        let ps = new PerfectScrollbar(element);
        scrollArray.push(ps);
      });
    },

    destoryScroll: function() {
      this.scrollwprGroup.forEach(function(element, index) {
        element.destroy();
        element = null;
      });
    }

  },

  mounted: function() {
    
    // 主圖
    this.gallery = new Swiper ('.page--gallery', {
      loop: true,
      observer: true,

      pagination: {
        el: '#galleryFraction',
        type: 'fraction',
      },

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
    });  

    this.initScroll();

    window.addEventListener("resize",() => {
      this.initNoteContainer();
    },false);
    
  }
};
</script>

<style>
@import "./style/common.css";
@import "./style/swiper.min.css";
@import "./style/perfect-scrollbar.css";
</style>

<style scoped>
@import "./style/page.css";
</style>
