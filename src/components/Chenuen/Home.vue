<template>
<div class="homewpr">

<div class="opening">
  <div id="showIntro" class="animated infinite bounce"></div>  
</div>

<div class="home-intro">
  <div class="centerwpr">計你和之思時要議印了。認素表然的業良布導個這光加消全活子文的響呢展病議！開向認連也他成八中戰笑優來子美，不定好常久的國女待照為全，情傳氣表經然下了招黨動十、管民知書臺下心自學現外時教、的用已不況在成！特們心呢她生育但處減一一媽自，我者世夠續平認，空易必天，器斯提車究臺收收也自式……情觀學突的，因一不人是日覺是所手東人品話金生減以機球來！種人大地獨政子道本然裝。過生的不議小去校！親門這意代檢該書我不假出，官園果友的方很山了的，健書業票。且公製器技消學如麼……及不運許候來到死城口筆，歡資靈破校舉覺反學面詩新來是！計你和之思時要議印了。認素表然的業良布導個這光加消全活子文的響呢展病議！開向認連也他成八中戰笑優來子美，不定好常久的國女待照為全，情傳氣表經然下了招黨動十、管民知書臺下心自學現外時教、的用已不況在成！特們心呢她生育但處減一一媽自，我者世夠續平認，空易必天，器斯提車究臺收收也自式……情觀學突的，因一不人是日覺是所手東人品話金生減以機球來！種人大地獨政子道本然裝。過生的不議小去校！親門這意代檢該書我不假出，官園果友的方很山了的，健書業票。且公製器技消學如麼……及不運許候來到死城口筆，歡資靈破校舉覺反學面詩新來是！</div>

  <div id="showGallery"></div>
</div>


</div>
</template>

<script>

export default {

  components: {

  },

  // Component data must be a function.
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

    slideIntro: function(){

      let homewpr = document.querySelector('.homewpr');

      let offset = document.querySelector('.home-intro').offsetHeight;
      homewpr.style.top = offset * -1 + 'px';
      
      setTimeout(() => {
        homewpr.classList.add('up');
      },500);
      
      return false;
    }

  },

  mounted: function(){

    let homewpr = document.querySelector('.homewpr');

    homewpr.addEventListener('wheel',(e) => {      
      
      if (e.deltaY > 0){
        this.slideIntro();
        // return false; 
      } else if (e.deltaY < 0){
        homewpr.style.top = '0';
        homewpr.classList.remove('up');
        // return false; 
      }
      
    });

    document.getElementById('showIntro').addEventListener('click',() => {
      this.slideIntro();
    });    

  }

};
</script>

<style scoped>
.homewpr {
width:100%; height:100vh;
position:absolute; left:0; top:0;  
transition:500ms; transition-property:top;
}
/* .homewpr.slideUp {top:-300px;} */

.opening {width:100%; height:100vh; position:relative;
background-color:#fff;
background-image:url("/proj-assets/chenuen/images/opening.jpg");
background-repeat:no-repeat; background-position:60% bottom;
background-size:auto 100%;
}

#showIntro {width:70px; height:70px;
position:absolute; left:50%; bottom:20px; margin-left:-35px;
animation-duration:1.5s;
background-color:pink; opacity:0.5;
}

.home-intro {padding:70px 20px 50px 20px;
background-color:#ac7431;
}
.home-intro .centerwpr {max-width:900px; margin:0 auto;}

#showGallery {width:140px; height:70px; margin:0 auto;
background-color:purple; opacity:0.5;
}

</style>
