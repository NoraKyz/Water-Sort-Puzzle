import { Texture } from "pixi.js";
import { PureTransform } from "../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../pureDynamic/PixiWrapper/pureSprite";

export class ObjectFactory {
  static createFakeBackground() {
    let texture = Texture.from("spr_blank");
    let bg = new PureSprite(texture, new PureTransform({
      alignment: Alignment.FULL,
    }));
    bg.displayObject.alpha = 0;
    return bg;
  }

  static createBackground(textureName) {
    let texture = Texture.from(textureName);
    let bg = new PureSprite(texture, new PureTransform({
      alignment               : Alignment.FULL,
      maintainAspectRatioType : MaintainAspectRatioType.MAX,
    }));
    return bg;
  }
}
