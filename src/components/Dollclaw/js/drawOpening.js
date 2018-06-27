/* --------------- set canvas size --------------- */
export function setCanvasSize() {
  let w =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  let wheight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  // 扣掉捲軸的寬度
  let wwidth = w - (w - document.getElementById('mainWrapper').offsetWidth);

  // Landscape
  if (wheight / wwidth > 0.75) {
    this.openingwprL.style.width = wwidth * 0.9 + 'px';
    this.openingwprL.style.height = wwidth * 0.9 * 0.75 + 'px';
  } else {
    this.openingwprL.style.width = (wheight * 0.9) / 0.75 + 'px';
    this.openingwprL.style.height = wheight * 0.9 + 'px';
  }

  // Portrait
  this.openingwprP.style.width = wwidth * 0.95 + 'px';
  this.openingwprP.style.height = (wwidth * 0.95) / 0.8 + 'px';
}

/* --------------- draw Opening (Landscape) --------------- */
export function drawOpeningLandscape(typekitFont) {
  if (this.openingLandscape.getContext) {
    let ctx = this.openingLandscape.getContext('2d');

    // let heroImage = new Image();
    // heroImage.src = '/proj-assets/dollclaw/images/opening-landscape.png';

    // heroImage.addEventListener(
    //   'load',
    //   function() {
    //     ctx.drawImage(heroImage, 0, 0);

    //     typekitFont.load().then(
    //       function() {
    //         console.log('typekit is available');
    //         addTextL();
    //       },
    //       function() {
    //         console.log('typekit is not available after waiting 3 seconds');
    //         addTextL();
    //       }
    //     );
    //   },
    //   false
    // );

    typekitFont.load().then(
      function() {
        console.log('typekit is available');
        addTextL();
      },
      function() {
        console.log('typekit is not available after waiting 3 seconds');
        addTextL();
      }
    );

    function addTextL() {
      ctx.save();

      ctx.font =
        '700 56px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.fillText('700', 320, 572);

      ctx.rotate((1 * Math.PI) / 180);
      ctx.fillText('550', 328, 724);

      ctx.restore();

      ctx.save();

      ctx.font =
        '700 50px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.rotate((6 * Math.PI) / 180);
      ctx.fillText('台北市', 1138, 454);

      ctx.fillText('新北市', 1138, 574);

      ctx.rotate((2 * Math.PI) / 180);
      ctx.fillText('台中市', 1150, 650);

      ctx.restore();

      ctx.save();

      ctx.font =
        '700 31px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.rotate(((5.5 * Math.PI) / 180) * -1);
      ctx.fillText('截至 2018 年 7 月', 558, 530);

      ctx.font =
        '700 74px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.rotate((0.1 * Math.PI) / 180);
      ctx.fillText('30,667', 560, 620);

      ctx.restore();
    }
  } else {
    console.log('瀏覽器不支援 canvas');
  }
}

/* --------------- draw Opening (Portrait) --------------- */
export function drawOpeningPortrait(typekitFont) {
  if (this.openingPortrait.getContext) {
    let ctx = this.openingPortrait.getContext('2d');

    // let heroImage = new Image();
    // heroImage.src = '/proj-assets/dollclaw/images/opening-portrait.png';

    // heroImage.addEventListener(
    //   'load',
    //   function() {
    //     ctx.drawImage(heroImage, 0, 0);

    //     typekitFont.load().then(
    //       function() {
    //         console.log('typekit is available');
    //         addTextP();
    //       },
    //       function() {
    //         console.log('typekit is not available after waiting 3 seconds');
    //         addTextP();
    //       }
    //     );
    //   },
    //   false
    // );

    // typekitFont.load().then(
    //   function() {
    //     console.log('typekit is available');
    //     addTextP();
    //   },
    //   function() {
    //     console.log('typekit is not available after waiting 3 seconds');
    //     addTextP();
    //   }
    // );

    addTextP();

    function addTextP() {
      ctx.save();

      ctx.font =
        '700 56px "微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.fillText('700', 300, 372);

      ctx.rotate((1 * Math.PI) / 180);
      ctx.fillText('550', 298, 524);

      ctx.restore();

      ctx.save();

      ctx.font =
        '700 50px "微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.rotate((6 * Math.PI) / 180);
      ctx.fillText('台北市', 528, 696);

      ctx.fillText('新北市', 528, 815);

      ctx.rotate((2 * Math.PI) / 180);
      ctx.fillText('台中市', 550, 915);

      ctx.restore();

      ctx.save();

      ctx.font =
        '700 31px "微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.fillStyle = '#62485b';
      ctx.rotate(((5.5 * Math.PI) / 180) * -1);
      ctx.fillText('截至 2018 年 7 月', 528, 350);

      ctx.font =
        '700 74px "微軟正黑體", "Microsoft JhengHei", sans-serif';
      ctx.rotate((0.1 * Math.PI) / 180);
      ctx.fillText('30,667', 530, 440);

      ctx.restore();
    }
  } else {
    console.log('瀏覽器不支援 canvas');
  }
}
