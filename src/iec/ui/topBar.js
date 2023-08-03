import { Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { BLEND_MODES } from "pixi.js";
import { Util } from "../../helpers/utils";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { Tween } from "../../systems/tween/tween";

export class TopBar extends Container {
  constructor() {
    super();

    this.bar = new PureSprite(Texture.from("spr_top_bar"), new PureTransform({
      alignment               : Alignment.TOP_CENTER,
      y                       : 110,
      usePercent              : true,
      width                   : 1,
      maintainAspectRatioType : MaintainAspectRatioType.MAX,
    }), new PureTransform({
      alignment       : Alignment.TOP_CENTER,
      y               : 100,
      useOriginalSize : true,
    }));
    this.addChild(this.bar.displayObject);

    this.snowMan = new Sprite(Texture.from("spr_snow_man"));
    this.snowMan.anchor.set(0.5);
    this.snowMan.x = -162;
    this.snowMan.y = -29;
    this.bar.displayObject.addChild(this.snowMan);

    this.lamp1 = this.createLamp();
    this.bar.displayObject.addChild(this.lamp1);
    this.lamp1.x = -307;
    this.lamp1.y = 9;

    this.lamp2 = this.createLamp();
    this.bar.displayObject.addChild(this.lamp2);
    this.lamp2.x = 0;
    this.lamp2.y = 9;

    this.lamp3 = this.createLamp();
    this.bar.displayObject.addChild(this.lamp3);
    this.lamp3.x = 307;
    this.lamp3.y = 9;

    this.lampArray = [this.lamp1, this.lamp2, this.lamp3];

    Tween.createTween(this, {}, {
      duration : 3.5,
      repeat   : Infinity,
      onRepeat : this.lightUpLamp.bind(this),
    }).start();
  }

  createLamp() {
    let lamp = new Sprite(Texture.from("spr_lamp"));
    lamp.anchor.set(0.5);
    lamp.angle = 8;
    Tween.createTween(lamp, {
      angle: -8,
    }, {
      duration : 1.5,
      loop     : true,
      yoyo     : true,
    }).start();
    lamp.pivot.x = 17 - 22;
    lamp.pivot.y = 1 - 91 / 2;

    let glow = new Sprite(Texture.from("spr_lamp_glow"));
    glow.y = 18;
    glow.anchor.set(0.5);
    lamp.addChild(glow);
    glow.tint = 0xe3de51;
    glow.alpha = 0.15;
    glow.blendMode = BLEND_MODES.ADD;

    lamp.lightUp = () => {
      Tween.createTween(glow, {
        alpha: 0.5,
      }, {
        duration    : 0.5,
        yoyo        : true,
        repeat      : 1,
        repeatDelay : 0.1,
      }).start();
    };

    return lamp;
  }

  lightUpLamp() {
    let index = Util.randomInt(0, 2);
    this.lampArray[index].lightUp();
  }
}
