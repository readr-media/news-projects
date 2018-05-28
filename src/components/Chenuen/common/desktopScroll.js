/* -------------------- element 高度 -------------------- */

export function getContentHeight(element) {
  return element.offsetHeight;
}

/* -------------------- element 到頂端的距離 -------------------- */

export function getScrollPositionTop(element) {
  return element.getBoundingClientRect().top;
}

/* -------------------- wheel -------------------- */

export function wheelContent(event,that){

    let y = event.deltaY;

    event.preventDefault();
    event.stopPropagation();

    if(y > 0){
        that.wheelDirection = 'down';
    } else if (y < 0) {
        that.wheelDirection = 'up';
    }

}

/* -------------------- slide to section -------------------- */
export function slideToSection(that,target,timeout){    

    /* ----- 取得內容高度 ----- */
    let introHeight = that.getContentHeight(that.homeIntro);
    let galleryTop = that.getContentHeight(that.homewpr);

    if(target == 'intro'){
        /* ----- 顯示 intro ----- */
        that.container.style.top = introHeight * -1 + "px";
        that.galleryProgress.classList.remove('show');

        if(that.scrollTimer != null){
            clearTimeout(that.scrollTimer);
        }

        if(timeout == true){
            that.scrollTimer = setTimeout(() => {
                that.introVisibility = true;       
                that.galleryVisibility = false;     
            },1200);
        } else if(timeout == false){
            that.introVisibility = true;       
            that.galleryVisibility = false;
        }

    } else if(target == 'gallery') {
        /* ----- 顯示 gallery ----- */
        that.container.style.top = galleryTop * -1 + "px";
        that.galleryProgress.classList.add('show');

        if(that.scrollTimer != null){
            clearTimeout(that.scrollTimer);
        }

        if(timeout == true){
            that.scrollTimer = setTimeout(() => {
                that.introVisibility = false;
                that.galleryVisibility = true;           
            },1200);
        } else if(timeout == false){
            that.introVisibility = false;       
            that.galleryVisibility = true;
        }

    } else if(target == 'opening'){
        /* ----- 顯示 opening ----- */
        that.container.style.top = "0px";
        that.galleryProgress.classList.remove('show');

        if(that.scrollTimer != null){
            clearTimeout(that.scrollTimer);
        }

        if(timeout == true){
            that.scrollTimer = setTimeout(() => {
                that.introVisibility = false;
                that.galleryVisibility = false;
            },1200);
        } else if(timeout == false){
            that.introVisibility = false;       
            that.galleryVisibility = false;
        }       
    }

}

/* -------------------- scroll -------------------- */

export function scrollAction(that){
    
    if(that.wheelDirection == 'up') {
    /* ----- 往上捲動 ----- */
        // console.log('scroll up');
        
        if (that.introVisibility == false && that.galleryVisibility == true) {
            /* ----- 關閉 gallery，顯示 intro ----- */
            that.slideToSection(that,'intro',true);                

        } else if (that.introVisibility == true && that.galleryVisibility == false){
            /* ----- 關閉 intro，顯示 opening ----- */
            that.slideToSection(that,'opening',true);
   
        } else {
            that.introVisibility = false;
            that.galleryVisibility = false;
            // console.log('到頂了');
        }

    } else if (that.wheelDirection == 'down') {
      /* ----- 往下捲動 ----- */
        // console.log('scroll down');

        if(that.introVisibility == false && that.galleryVisibility == false){

            /* ----- 顯示 intro ----- */
            that.slideToSection(that,'intro',true);
    
        } else if (that.introVisibility == true && that.galleryVisibility == false){

            /* ----- 顯示 gallery ----- */
            that.slideToSection(that,'gallery',true);
     
        } else {
            that.introVisibility = false;
            that.galleryVisibility = true;
            // console.log('到底了');
        }

    }

}

/* -------------------- window resize -------------------- */

export function resizeAction(that){

    if(that.introVisibility == true && that.galleryVisibility == false) {
        /* ----- 顯示 intro ----- */
        that.slideToSection(that,'intro',false);

    } else if(that.galleryVisibility == true && that.introVisibility == false){
        /* ----- 顯示 gallery ----- */
        that.slideToSection(that,'gallery',false);

    } else if (that.introVisibility == false && that.galleryVisibility == false) {
        /* ----- 顯示 opening ----- */
        that.slideToSection(that,'opening',false);
    }      

}


