<template>
  <div class="chapter ending">
  <section class="extend">
    <div class="centerwpr">
        <h2>繼續閱讀</h2>        
        <div class="extendwpr">
            <a class="extend--entry home" href="/project/farmhouse/" target="_blank">
                <img src="/proj-assets/farmhouse/images/sample/extend01.jpg" />
                <div class="extend--overlay"></div>
                <div class="extend--title">不許動！<br />通通拿去種農舍！</div>
            </a> 

            <a class="extend--entry opinion" href="/project/farmhouse/opinion" target="_blank">
                <img src="/proj-assets/farmhouse/images/sample/extend02.jpg" />
                <div class="extend--overlay"></div>
                <div class="extend--title">農舍面面觀</div>
            </a>

            <a class="extend--entry faq" href="/project/farmhouse/faq" target="_blank">
                <img src="/proj-assets/farmhouse/images/sample/extend03.jpg" />
                <div class="extend--overlay"></div>
                <div class="extend--title">來來來<br />看完你就變農舍達人了</div>
            </a>

            <a class="extend--entry gallery" href="/project/farmhouse/gallery" target="_blank">
                 <img src="/proj-assets/farmhouse/images/sample/extend04.jpg" />
                 <div class="extend--overlay"></div>
                 <div class="extend--title">田中央攝影集</div>
            </a>
        </div>

        <ul class="credit">
            <li v-for="item in creditList">{{item}}</li>
        </ul>

    </div>
  </section>

  <div class="extra">
    <div class="centerwpr">
      <section class="related">
        <iframe src="https://www.mirrormedia.mg/project-list/light?excluding=farmhouse"  width="100%" frameborder="0" scrolling="no" style="width: 1px; min-width: 100%; *width: 100%;"></iframe>
      </section>
      <section class="facebook">
        <div class="fb-comments" data-href="https://projects.mirrormedia.mg/project/marathon/" data-colorscheme="dark" data-numposts="5" data-order-by="reverse_time" data-width="100%"></div>
      </section>
  </div>
  </div>



  </div>
</template>

<script>

export default {
  data() {
    return {
      creditList: [
          "文字：鐘聖雄",
          "攝影：林俊耀、鐘聖雄",
          "田中央攝影作品提供：張良一",
          "資料統整：鐘聖雄、徐以樵",
          "網頁：許玲瑋、v_k、KC-Farmer",
          "發佈日期：2018/03/26"
        ]
    };
  },
  props: {
    credit: Array
  },
  methods: {},
  mounted: function() {}
};
</script>

<style scoped>
.extend {padding:0;}
.extend .centerwpr {padding:60px 20px;}

.extendwpr {display:flex; justify-content:space-between; align-items:center;
margin:40px auto;
}
.extend--entry {width:calc(25% - 15px); position:relative;}

.extend--overlay {position:absolute; left:0; top:0;
width:100%; height:100%; 
background-color:#273947; opacity:0.75;
transition:400ms; transition-property:opacity;
}
.extend--entry:hover .extend--overlay {
opacity:0;
} 

.extend--title {position:absolute; left:0; top:0;
width:100%; height:100%;
display:flex; justify-content:center; align-items:center;
color:#fff; font-size:22px; font-weight:bold; text-align:center;
line-height:1.4; text-shadow:0 1px 3px rgba(0,0,0,0.4);
transition:400ms; transition-property:opacity;
}
.extend--entry:hover .extend--title {opacity:0;}

/* home, standalone page */
.home .extend--entry.home {pointer-events:none; cursor:default;}
.home .extend--entry.home .extend--overlay {opacity:1 !important;}
.home .extend--entry.home .extend--title {opacity:0.8 !important;}

.opinion .extend--entry.opinion {pointer-events:none; cursor:default;}
.opinion .extend--entry.opinion .extend--overlay {opacity:1 !important;}
.opinion .extend--entry.opinion .extend--title {opacity:0.8 !important;}

.faq .extend--entry.faq {pointer-events:none; cursor:default;}
.faq .extend--entry.faq .extend--overlay {opacity:1 !important;}
.faq .extend--entry.faq .extend--title {opacity:0.8 !important;}

.gallery .extend--entry.gallery {pointer-events:none; cursor:default;}
.gallery .extend--entry.gallery .extend--overlay {opacity:1 !important;}
.gallery .extend--entry.gallery .extend--title {opacity:0.8 !important;}




/* Credit List */
.credit {padding-left:0; margin:0;
list-style:none; text-align:center;
}
.credit li {
font-size:14px; line-height:1.7; color:#1a1a1a;
} 

/* related, facebook */
.extra {position:relative;
background-color:#273947;
}
.extra .centerwpr {padding:60px 12px 0 12px;}

.related {padding:0 8px; min-height:100px;
background-color:transparent;
}
.related iframe {height:326px; background-color:#fff;}

.facebook {margin:0 auto; padding-bottom:60px;
background-color:transparent;
}

@media screen and (max-width: 800px) {

  .extendwpr {flex-wrap:wrap;}
  .extend--entry {width:calc(50% - 10px);}

  .extend--entry.faq {margin-top:20px;}
  .extend--entry.gallery {margin-top:20px;}

  .extend--title {font-size:18px;}

}

</style>
