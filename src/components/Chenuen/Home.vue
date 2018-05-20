<template>
<div class="homewpr">

<div class="opening">
  <div id="showIntro" class="animated infinite bounce"></div>  
  <!-- <div id="showIntro"></div> -->
</div>

<div class="home-intro">
  <div class="centerwpr">計你和之思時要議印了。認素表然的業良布導個這光加消全活子文的響呢展病議！開向認連也他成八中戰笑優來子美，不定好常久的國女待照為全，情傳氣表經然下了招黨動十、管民知書臺下心自學現外時教、的用已不況在成！特們心呢她生育但處減一一媽自，我者世夠續平認，空易必天，器斯提車究臺收收也自式……情觀學突的，因一不人是日覺是所手東人品話金生減以機球來！種人大地獨政子道本然裝。過生的不議小去校！親門這意代檢該書我不假出，官園果友的方很山了的，健書業票。且公製器技消學如麼……及不運許候來到死城口筆，歡資靈破校舉覺反學面詩新來是！計你和之思時要議印了。認素表然的業良布導個這光加消全活子文的響呢展病議！開向認連也他成八中戰笑優來子美，不定好常久的國女待照為全，情傳氣表經然下了招黨動十、管民知書臺下心自學現外時教、的用已不況在成！特們心呢她生育但處減一一媽自，我者世夠續平認，空易必天，器斯提車究臺收收也自式……情觀學突的，因一不人是日覺是所手東人品話金生減以機球來！種人大地獨政子道本然裝。過生的不議小去校！親門這意代檢該書我不假出，官園果友的方很山了的，健書業票。且公製器技消學如麼……及不運許候來到死城口筆，歡資靈破校舉覺反學面詩新來是！</div>

  <div class="btnwpr">
    <div id="showGallery">開始欣賞</div>
  </div>
  
</div>


</div>
</template>

<script>

export default {

  components: {

  },
 
  data: function() {
    return {

    };
  },

  props: {

  },

  watch: {

  },

  computed: {

  },

  methods: {


  },

  mounted: function(){
   

  }

};
</script>

<style scoped>
.homewpr {position:relative;}

.opening {width:100%; height:100vh; position:relative;
background-color:#fff;
background-image:url("/proj-assets/chenuen/images/opening.jpg");
background-repeat:no-repeat; background-position:60% bottom;
background-size:auto 100%;
}

#showIntro {width:70px; height:60px;
position:absolute; left:50%; bottom:40px; margin-left:-35px;
animation-duration:1.5s;
/* background-color:pink; */
background-image:url("/proj-assets/chenuen/images/page-navbtn.png");
background-size:70px auto; background-repeat:no-repeat;
background-position:0 -100px;
cursor:pointer;
}
#showIntro:hover {background-position:0 -168px;}

.home-intro {padding:60px 20px 50px 20px;
color:#fff; font-size:18px; line-height:1.8;
text-align:justify;
background-color:#ac7431;
}
.home-intro .centerwpr {max-width:900px; margin:0 auto;}

.btnwpr {display:flex; justify-content:center; align-items:center;
padding-top:25px;
}
#showGallery {cursor:pointer;
font-weight:bold; font-size:30px; color:#f3eae0;
letter-spacing:1px; line-height:1.3;
border-bottom:3px solid #f3eae0;
}
#showGallery:hover {color:#fff; border-bottom:3px solid #fff;}

/* ----- animate bounce custom ----- */
@-webkit-keyframes bounce {
  from,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -14px, 0);
    transform: translate3d(0, -14px, 0);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -7px, 0);
    transform: translate3d(0, -7px, 0);
  }

  90% {
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
  }
}

@keyframes bounce {
  from,
  20%,
  53%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -14px, 0);
    transform: translate3d(0, -14px, 0);
  }

  70% {
    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    -webkit-transform: translate3d(0, -7px, 0);
    transform: translate3d(0, -7px, 0);
  }

  90% {   
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
  }
}






</style>
