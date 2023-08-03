import { Container, Texture } from "pixi.js";
import { Game } from "../../game";
import { Util } from "../../helpers/utils";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment } from "../../pureDynamic/core/pureTransformConfig";
import { PureRect } from "../../pureDynamic/PixiWrapper/pureRect";
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { Tween } from "../../systems/tween/tween";

export class LoseScene extends Container {
  constructor() {
    super();
    this._initFakeBackGround();
    this._initCTABtn();
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
    Game.onCTAClick("endcard_button");
  }

  _initCTABtn() {
    this.ctaBtn = new PureSprite(Texture.from("spr_btn_try_again"), new PureTransform({
      alignment       : Alignment.MIDDLE_CENTER,
      useOriginalSize : true,
    }));
    Tween.createTween(this.ctaBtn.displayObject, { scale: {
      x : 0.8,
      y : 0.8,
    } }, {
      duration : 0.5,
      repeat   : Infinity,
      yoyo     : true,
    }).start();
    this.addChild(this.ctaBtn.displayObject);
  }
}
