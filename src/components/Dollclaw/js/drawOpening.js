/* --------------- drawOpeningLandscape --------------- */
export function drawOpeningLandscape(FontFaceObserver) {

    // const FontFaceObserver = require('fontfaceobserver');

    let typekitFont = new FontFaceObserver('source-han-sans-traditional');

    if (this.openingLandscape.getContext) {
        let ctx = this.openingLandscape.getContext("2d");

        let heroImage = new Image();
        heroImage.src = "/proj-assets/dollclaw/images/opening-landscape.png";

        heroImage.addEventListener(
            "load",
            function () {
                ctx.drawImage(heroImage, 0, 0);

                typekitFont.load().then(function () {
                    // typekit is available
                    console.log('typekit is available');
                    addTextL();
                }, function () {
                    //typekit is not available after waiting 3 seconds
                    console.log('typekit is not available after waiting 3 seconds');
                    addTextL();
                });
            },
            false
        );

        function addTextL() {
            ctx.save();

            ctx.font =
                '700 56px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
            ctx.fillStyle = "#62485b";
            ctx.fillText("700", 320, 572);

            ctx.rotate((1 * Math.PI) / 180);
            ctx.fillText("550", 328, 724);

            ctx.restore();

            ctx.font =
                '700 50px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
            ctx.fillStyle = "#62485b";
            ctx.rotate((6 * Math.PI) / 180);
            ctx.fillText("台北市", 1138, 454);

            ctx.fillText("新北市", 1138, 574);

            ctx.rotate((2 * Math.PI) / 180);
            ctx.fillText("台中市", 1150, 650);

            ctx.restore();
        }

    } else {
        console.log("瀏覽器不支援 canvas");
    }

}


/* --------------- drawOpeningPortrait --------------- */
export function drawOpeningPortrait(FontFaceObserver) {

    let typekitFont = new FontFaceObserver('source-han-sans-traditional');

    if (this.openingLandscape.getContext) {
        let ctx = this.openingLandscape.getContext("2d");

        let heroImage = new Image();
        heroImage.src = "/proj-assets/dollclaw/images/opening-portrait.png";

        heroImage.addEventListener(
            "load",
            function () {
                ctx.drawImage(heroImage, 0, 0);

                typekitFont.load().then(function () {
                    // typekit is available
                    addTextP();
                }, function () {
                    //typekit is not available after waiting 3 seconds
                    addTextP();
                });
            },
            false
        );

        function addTextP() {
            ctx.save();

            ctx.font =
                '700 56px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
            ctx.fillStyle = "#62485b";
            ctx.fillText("700", 320, 572);

            ctx.rotate((1 * Math.PI) / 180);
            ctx.fillText("550", 328, 724);

            ctx.restore();

            ctx.font =
                '700 50px "source-han-sans-traditional","微軟正黑體", "Microsoft JhengHei", sans-serif';
            ctx.fillStyle = "#62485b";
            ctx.rotate((6 * Math.PI) / 180);
            ctx.fillText("台北市", 1138, 454);

            ctx.fillText("新北市", 1138, 574);

            ctx.rotate((2 * Math.PI) / 180);
            ctx.fillText("台中市", 1150, 650);

            ctx.restore();
        }

    } else {
        console.log("瀏覽器不支援 canvas");
    }

}