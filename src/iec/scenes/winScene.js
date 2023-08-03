import { BLEND_MODES, Container, Sprite, Texture } from "pixi.js";
import { Game } from "../../game";
import { Util } from "../../helpers/utils";
import { PureObject } from "../../pureDynamic/core/pureObject";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment } from "../../pureDynamic/core/pureTransformConfig";
import { PureRect } from "../../pureDynamic/PixiWrapper/pureRect";
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { Tween } from "../../systems/tween/tween";
import { CornerConfetti } from "../object/confetti/cornerConfetti";

export class WinScene extends Container {
  constructor() {
    super();
    this._initFakeBackGround();
    this._initCup();
    this._initNewTheme();
    this._initCTAButton();
    this._initCornerConfetti();
    this.onRezise();
    GameResizer.registerOnResizeCallback(this.onRezise, this);
  }

  _initFakeBackGround() {
    this.bg = new PureRect(new PureTransform({
      alignment: Alignment.FULL,
    }));
    this.bg.fill(this, 0x000000, 0.4);
    this.bg.graphics.eventMode = "static";
    Util.registerOnPointerDown(this.bg.graphics, this._onBgTap, this);
  }

  _onBgTap() {
    Game.onCTAClick("win_scene_cta");
  }

  _initCup() {
    this.cupContainer = new Container();
    this.cupObject = new PureObject(this.cupContainer, new PureTransform({
      usePercent      : true,
      pivotX          : 0.5,
      pivotY          : 0.5,
      anchorX         : 0.5,
      anchorY         : 0.4,
      useOriginalSize : true,
    }));
    this.cupObject.displayObject.scale.set(0);
    this.addChild(this.cupObject.displayObject);
    // this.cupGlow = new Sprite(Texture.from("spr_eff_cup"));
    // this.cupGlow.blendMode = BLEND_MODES.ADD;
    // this.cupObject.displayObject.addChild(this.cupGlow);
    this.cup = new Sprite(Texture.from("spr_cup"));
    this.cup.anchor.set(0.5);
    this.cupObject.displayObject.addChild(this.cup);
    Tween.createTween(this.cupObject.displayObject, { scale: {
      x : 1.2,
      y : 1.2,
    } }, {
      duration   : 0.5,
      easing     : Tween.Easing.Elastic.Out,
      onComplete : () => {
        this._initCupEffect();
      },
    }).start();
    // Tween.createTween(this.cupGlow, { rotation: Math.PI * 2 }, {
    //   duration : 5,
    //   repeat   : Infinity,
    // }).start();
  }

  _initCupEffect() {
    this._initStar();
    this._initLight();
  }

  _initLight() {
    this.lightContaier = new Container();
    this.lightContaier.y = -250;
    this.lightContaier.x = -130;
    this.cupObject.displayObject.addChild(this.lightContaier);

    this.light = new Sprite(Texture.from("spr_light"));
    this.light.anchor.set(0.5);
    this.light.blendMode = BLEND_MODES.SCREEN;
    this.lightContaier.addChild(this.light);
    this.light2 = new Sprite(Texture.from("spr_light"));
    this.light2.blendMode = BLEND_MODES.SCREEN;
    this.light2.anchor.set(0.5);
    this.lightContaier.addChild(this.light2);
    this.light3 = new Sprite(Texture.from("spr_light"));
    this.light3.anchor.set(0.5);
    this.light3.blendMode = BLEND_MODES.SCREEN;
    this.lightContaier.addChild(this.light3);

    this.lightContaier.alpha = 0;

    Tween.createTween(this.lightContaier, {
      alpha: 1,
    }, {
      duration : 1,
      loop     : true,
      yoyo     : true,
    }).start();
  }

  _initStar() {
    this.starContaier = new Container();
    this.starContaier.x = -40;
    this.starContaier.y = -160;
    this.starContaier.alpha = 0;
    this.cupObject.displayObject.addChild(this.starContaier);

    this.starGlow = new Sprite(Texture.from("spr_glow"));
    this.starGlow.anchor.set(0.5);
    this.starGlow.blendMode = BLEND_MODES.ADD;
    this.starContaier.addChild(this.starGlow);

    this.star = new Sprite(Texture.from("spr_star"));
    this.star.anchor.set(0.5);
    this.star.blendMode = BLEND_MODES.ADD;
    this.starContaier.addChild(this.star);
    Tween.createTween(this.star, {
      angle: 360,
    }, {
      duration : 1,
      loop     : true,
    }).start();
    Tween.createTween(this.starContaier, {
      alpha: 1,
    }, {
      duration : 1,
      loop     : true,
      yoyo     : true,
    }).start();
  }

  _initCTAButton() {
    this.ctaBtn = new PureSprite(Texture.from("spr_next_level"), new PureTransform({
      usePercent      : true,
      pivotX          : 0.5,
      pivotY          : 0.5,
      anchorX         : 0.5,
      anchorY         : 0.4,
      useOriginalSize : true,
      y               : 500,
    }));
    this.ctaBtn.displayObject.scale.set(0);
    Tween.createTween(this.ctaBtn.displayObject, { scale: {
      x : 1.2,
      y : 1.2,
    } }, {
      duration   : 0.4,
      onComplete : () => {
        Tween.createTween(this.ctaBtn.displayObject, { scale: {
          x : 1.5,
          y : 1.5,
        } }, {
          duration : 0.3,
          repeat   : Infinity,
          yoyo     : true,
        }).start();
      },
    }).start();
    this.addChild(this.ctaBtn.displayObject);
  }

  _initNewTheme() {
    this.newTheme = new PureSprite(Texture.from("spr_new_theme_text"), new PureTransform({
      usePercent      : true,
      pivotX          : 0.5,
      pivotY          : 0.5,
      anchorX         : 0.5,
      anchorY         : 0.4,
      useOriginalSize : true,
      y               : 335,
    }));
    this.addChild(this.newTheme.displayObject);
  }

  _initBanner() {
    this.bannerContainer = new Container();
    let bannerObject = new PureObject(this.bannerContainer, new PureTransform({
      alignment       : Alignment.TOP_CENTER,
      useOriginalSize : true,
      y               : 200,
    }));
    this.addChild(bannerObject.displayObject);
    let banner1 = new Sprite(Texture.from("spr_win1"));
    this.bannerContainer.addChild(banner1);
    this.bannerNaturalWidth = banner1.width;
    banner1.x = -banner1.width / 2;
    banner1.anchor.set(0, 0.5);
    banner1.scale.set(0, 1);
    Tween.createTween(banner1, { scale: {
      x: 1,
    } }, {
      delay    : 0.1,
      duration : 0.2,
    }).start();
    let banner2 = new Sprite(Texture.from("spr_win2"));
    this.bannerContainer.addChildAt(banner2, 0);
    banner2.x = banner2.width * 1 / 2;
    banner2.anchor.set(1, 0.5);
    banner2.scale.set(0, 1);
    Tween.createTween(banner2, { scale: {
      x: 1,
    } }, {
      duration: 0.2,
    }).start();
  }

  _initCornerConfetti() {
    this.leftContainer = new Container();
    let leftObject = new PureObject(this.leftContainer, new PureTransform({
      usePercent      : true,
      pivotX          : 0.5,
      pivotY          : 0.5,
      anchorX         : 0,
      anchorY         : 0.75,
      useOriginalSize : true,
    }), new PureTransform({
      usePercent      : true,
      pivotX          : 0.5,
      pivotY          : 0.5,
      anchorX         : 0.5,
      anchorY         : 0.75,
      x               : -400,
      useOriginalSize : true,
    }));
    this.addChild(leftObject.displayObject);
    let leftCornerConffetti = new CornerConfetti();
    this.leftContainer.addChild(leftCornerConffetti);
    this.rightContainer = new Container();
    this.rightContainer.scale.x = -1;
    let rightObject = new PureObject(this.rightContainer, new PureTransform({
      usePercent      : true,
      pivotX          : 0.5,
      pivotY          : 0.5,
      anchorX         : 1,
      anchorY         : 0.75,
      useOriginalSize : true,
    }), new PureTransform({
      usePercent      : true,
      pivotX          : 0.5,
      pivotY          : 0.5,
      anchorX         : 0.5,
      anchorY         : 0.75,
      x               : 400,
      useOriginalSize : true,
    }));
    this.addChild(rightObject.displayObject);
    let rightCornerConffetti = new CornerConfetti();
    this.rightContainer.addChild(rightCornerConffetti);
    Tween.createTween(this, {}, {
      duration : 2,
      delay    : 0.5,
      loop     : true,
      onStart  : () => {
        leftCornerConffetti.play();
        rightCornerConffetti.play();
      },
      onRepeat: () => {
        leftCornerConffetti.play();
        rightCornerConffetti.play();
      },
    }).start();
  }

  onRezise() {
  }
}
