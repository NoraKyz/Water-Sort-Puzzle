import { Container, Sprite, Texture } from "pixi.js";
import { Util } from "../../helpers/utils";
import { PureObject } from "../../pureDynamic/core/pureObject";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment } from "../../pureDynamic/core/pureTransformConfig";
import { PureRect } from "../../pureDynamic/PixiWrapper/pureRect";
import { PureText } from "../../pureDynamic/PixiWrapper/pureText";
import { Tween } from "../../systems/tween/tween";

export const TutorialEvent = Object.freeze({
  Completed: "completed",
});

export class TutorialScene extends Container {
  constructor() {
    super();
    this._initFakeBackGround();
    this._initText();
    this._initHand();
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
    this.visible = false;
    this.emit(TutorialEvent.Completed);
  }

  _initText() {
    this.text = new PureText(this, "タップして注ぐ", new PureTransform({
      alignment       : Alignment.MIDDLE_CENTER,
      useOriginalSize : true,
    }), {
      fill       : "#ffffff",
      fontSize   : 70,
      fontWeight : "bold",
    }, null, {
      fill       : "#ffffff",
      fontSize   : 150,
      fontWeight : "bold",
    });
  }

  _initHand() {
    let container = new Container();
    this.handObject = new PureObject(container, new PureTransform({
      alignment       : Alignment.MIDDLE_CENTER,
      y               : 300,
      useOriginalSize : true,
    }));
    this.addChild(this.handObject.displayObject);
    let hand = new Sprite(Texture.from("spr_hand"));
    hand.visible = false;
    hand.anchor.set(0.5);
    this.handObject.displayObject.addChild(hand);
    Tween.createTween(hand, { position: { y: -200 } }, {
      delay    : 2,
      duration : 0.4,
      repeat   : Infinity,
      yoyo     : true,
      onStart  : () => {
        hand.visible = true;
      },
    }).start();
  }
}
