import { Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { Util } from "../../helpers/utils";
import { PureObject } from "../../pureDynamic/core/pureObject";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { Tween } from "../../systems/tween/tween";

export const IntroSceneEvent = Object.freeze({
  TapEasy   : "tapEasy",
  TapMedium : "tapMedium",
  TapHard   : "tapHard",
});

export class IntroScene extends Container {
  constructor() {
    super();

    this._initBg();
    this._initWoodBanner();
    this._initEasy();
    this._initMedium();
    this._initHard();
    this._initHand();
  }

  _initBg() {
    this.bg = new PureSprite(Texture.from("spr_bg_intro"), new PureTransform({
      usePercent              : true,
      anchorX                 : 0,
      anchorY                 : 0,
      pivotX                  : 0,
      pivotY                  : 0,
      width                   : 1,
      height                  : 1,
      maintainAspectRatioType : MaintainAspectRatioType.MAX,
    }));
    this.addChild(this.bg.displayObject);
  }

  _initWoodBanner() {
    this.woodBannerContainer = new Container();
    this.addChild(this.woodBannerContainer);
    this.woodBannerPureObj = new PureObject(this.woodBannerContainer, new PureTransform({
      usePercent      : true,
      anchorX         : 0.5,
      anchorY         : 0.16,
      pivotX          : 0.5,
      pivotY          : 0.5,
      useOriginalSize : true,
    }), new PureTransform({
      alignment       : Alignment.TOP_CENTER,
      useOriginalSize : true,
      y               : 200,
    }));

    this.woodBannerPureObj.registerOnUpdateTransformCallback(this._resizeWoodBanner.bind(this));
    this._resizeWoodBanner();

    /*
     * this.woodBanner = new Sprite(Texture.from("spr_wood_banner"));
     * this.woodBannerContainer.addChild(this.woodBanner);
     */

    this.brainText = new Sprite(Texture.from("spr_brain_age"));
    this.brainText.anchor.set(0.5);
    this.woodBannerContainer.addChild(this.brainText);
    this.brainText.y = 10;

    Tween.createTween(this.brainText, {
      scale: {
        x : 0.9,
        y : 0.9,
      },
    }, {
      duration : 0.5,
      loop     : true,
      yoyo     : true,
    }).start();
  }

  _resizeWoodBanner() {
    if (GameResizer.isLandScale()) {
      this.woodBannerContainer.scale.set(1.4);
    }
    else {
      this.woodBannerContainer.scale.set(1);
    }
  }

  _initEasy() {
    this.easyLvl = new PureSprite(Texture.from("spr_lvl_easy"), new PureTransform({
      alignment     : Alignment.MIDDLE_CENTER,
      x             : 171,
      y             : -170,
      naturalWidth  : 339,
      naturalHeight : 339,
    }), new PureTransform({
      usePercent              : true,
      pivotX                  : 0.5,
      pivotY                  : 0.5,
      anchorY                 : 0.5,
      anchorX                 : 0.175,
      x                       : 0,
      y                       : 0,
      height                  : 0.5,
      width                   : 0.3,
      maintainAspectRatioType : MaintainAspectRatioType.MIN,
    }));
    this.addChild(this.easyLvl.displayObject);

    this.easyBtn = new PureSprite(Texture.from("spr_btn_easy"), new PureTransform({
      alignment     : Alignment.MIDDLE_CENTER,
      x             : -171,
      y             : -170,
      naturalWidth  : 193,
      naturalHeight : 105,
    }), new PureTransform({
      usePercent              : true,
      pivotX                  : 0.5,
      pivotY                  : 0.5,
      anchorY                 : 0.5,
      anchorX                 : 0.175,
      x                       : 0,
      y                       : 400,
      height                  : 0.125,
      width                   : 0.18,
      maintainAspectRatioType : MaintainAspectRatioType.MIN,
    }));
    this.addChild(this.easyBtn.displayObject);

    Util.registerOnPointerDown(this.easyBtn.displayObject, this.onEasyTap, this);
    Util.registerOnPointerDown(this.easyLvl.displayObject, this.onEasyTap, this);
  }

  _initMedium() {
    this.mediumLvl = new PureSprite(Texture.from("spr_lvl_medium"), new PureTransform({
      alignment     : Alignment.MIDDLE_CENTER,
      x             : -171,
      y             : 145,
      naturalWidth  : 339,
      naturalHeight : 339,
    }), new PureTransform({
      usePercent              : true,
      pivotX                  : 0.5,
      pivotY                  : 0.5,
      anchorY                 : 0.5,
      anchorX                 : 0.5,
      x                       : 0,
      y                       : 0,
      height                  : 0.5,
      width                   : 0.3,
      maintainAspectRatioType : MaintainAspectRatioType.MIN,
    }));
    this.addChild(this.mediumLvl.displayObject);

    this.mediumBtn = new PureSprite(Texture.from("spr_btn_medium"), new PureTransform({
      alignment     : Alignment.MIDDLE_CENTER,
      x             : 171,
      y             : 145,
      naturalWidth  : 193,
      naturalHeight : 105,
    }), new PureTransform({
      usePercent              : true,
      pivotX                  : 0.5,
      pivotY                  : 0.5,
      anchorY                 : 0.5,
      anchorX                 : 0.5,
      x                       : 0,
      y                       : 400,
      height                  : 0.125,
      width                   : 0.18,
      maintainAspectRatioType : MaintainAspectRatioType.MIN,
    }));
    this.addChild(this.mediumBtn.displayObject);

    Util.registerOnPointerDown(this.mediumBtn.displayObject, this.onMeidumTap, this);
    Util.registerOnPointerDown(this.mediumLvl.displayObject, this.onMeidumTap, this);
  }

  _initHard() {
    this.hardLvl = new PureSprite(Texture.from("spr_lvl_hard"), new PureTransform({
      alignment     : Alignment.MIDDLE_CENTER,
      x             : 171,
      y             : 460,
      naturalWidth  : 339,
      naturalHeight : 339,
    }), new PureTransform({
      usePercent              : true,
      pivotX                  : 0.5,
      pivotY                  : 0.5,
      anchorY                 : 0.5,
      anchorX                 : 0.825,
      x                       : 0,
      y                       : 0,
      height                  : 0.5,
      width                   : 0.3,
      maintainAspectRatioType : MaintainAspectRatioType.MIN,
    }));
    this.addChild(this.hardLvl.displayObject);

    this.hardBtn = new PureSprite(Texture.from("spr_btn_hard"), new PureTransform({
      alignment     : Alignment.MIDDLE_CENTER,
      x             : -171,
      y             : 460,
      naturalWidth  : 193,
      naturalHeight : 105,
    }), new PureTransform({
      usePercent              : true,
      pivotX                  : 0.5,
      pivotY                  : 0.5,
      anchorY                 : 0.5,
      anchorX                 : 0.825,
      x                       : 0,
      y                       : 400,
      height                  : 0.125,
      width                   : 0.18,
      maintainAspectRatioType : MaintainAspectRatioType.MIN,
    }));
    this.addChild(this.hardBtn.displayObject);

    Util.registerOnPointerDown(this.hardBtn.displayObject, this.onHardTap, this);
    Util.registerOnPointerDown(this.hardLvl.displayObject, this.onHardTap, this);
  }

  _initHand() {
    this.handHolder = new Container();
    this.addChild(this.handHolder);
    this.hand = new Sprite(Texture.from("spr_hand"));
    this.handHolder.addChild(this.hand);
    this.hand.anchor.set(0);
    this.hand.pivot.set(85, 15);
    this.hand.scale.set(0.5);

    this.hardBtn.registerOnUpdateTransformCallback(this._initHandAnim.bind(this));
    this._initHandAnim();
  }

  _initHandAnim() {
    let pos1 = this.easyBtn.displayObject.position;
    let pos2 = this.mediumBtn.displayObject.position;
    let pos3 = this.hardBtn.displayObject.position;

    if (GameResizer.isLandScale()) {
      this.hand.scale.set(0.7);
    }
    else {
      this.hand.scale.set(0.5);
    }

    this.handHolder.scale.set(1);
    this.handHolder.position.copyFrom(pos1);

    let onComplete = function() {};

    this.handTween?.stop();
    this.scaleTween = Tween.createTween(this.handHolder, {
      scale: {
        x : 0.8,
        y : 0.8,
      },
    }, {
      duration : 0.3,
      onStart  : () => {
        this.handTween = this.scaleTween;
      },
      repeat     : 1,
      yoyo       : true,
      onComplete : () => {
        onComplete();
      },
    });

    this.easyToMediumTween = Tween.createTween(this.handHolder, {
      x : pos2.x,
      y : pos2.y,
    }, {
      duration : 0.6,
      onStart  : () => {
        this.handTween = this.easyToMediumTween;
      },
      onComplete: () => {
        onComplete = oc2;
        this.playButtonAnim(this.mediumBtn.displayObject);
        this.scaleTween.start();
      },
    });

    let oc1 = () => {
      this.easyToMediumTween.start();
    };

    this.mediumToHardTween = Tween.createTween(this.handHolder, {
      x : pos3.x,
      y : pos3.y,
    }, {
      duration : 0.6,
      onStart  : () => {
        this.handTween = this.mediumToHardTween;
      },
      onComplete: () => {
        onComplete = oc3;
        this.playButtonAnim(this.hardBtn.displayObject);
        this.scaleTween.start();
      },
    });

    let oc2 = () => {
      this.mediumToHardTween.start();
    };

    this.hardToMedium = Tween.createTween(this.handHolder, {
      x : pos2.x,
      y : pos2.y,
    }, {
      duration : 0.6,
      onStart  : () => {
        this.handTween = this.hardToMedium;
      },
      onComplete: () => {
        onComplete = oc4;
        this.playButtonAnim(this.mediumBtn.displayObject);
        this.scaleTween.start();
      },
    });

    let oc3 = () => {
      this.hardToMedium.start();
    };

    this.mediumToEasy = Tween.createTween(this.handHolder, {
      x : pos1.x,
      y : pos1.y,
    }, {
      duration : 0.6,
      onStart  : () => {
        this.handTween = this.mediumToEasy;
      },
      onComplete: () => {
        onComplete = oc1;
        this.playButtonAnim(this.easyBtn.displayObject);
        this.scaleTween.start();
      },
    });

    let oc4 = () => {
      this.mediumToEasy.start();
    };

    onComplete = oc1;
    this.playButtonAnim(this.easyBtn.displayObject);
    this.scaleTween.start();
  }

  onEasyTap() {
    this.handTween?.stop();
    this.emit(IntroSceneEvent.TapEasy);
    this.hide();
  }

  onMeidumTap() {
    this.handTween?.stop();
    this.emit(IntroSceneEvent.TapMedium);
    this.hide();
  }

  hide() {
    this.visible = false;
  }

  onHardTap() {
    this.handTween?.stop();
    this.emit(IntroSceneEvent.TapHard);
    this.hide();
  }

  playButtonAnim(btn) {
    this.btnTween?.stop();
    this.btnTween = Tween.createTween(btn, {
      scale: {
        x : btn.scale.x * 1.15,
        y : btn.scale.y * 1.15,
      },
    }, {
      duration : 0.2,
      repeat   : 1,
      yoyo     : true,
    }).start();
  }
}
