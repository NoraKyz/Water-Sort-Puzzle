import { Texture } from "pixi.js";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { MaintainAspectRatioType } from "../../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";

export class Background extends PureSprite {
  constructor(bgData) {

    let tex = Texture.from(bgData.bgSprite);
    super(tex, new PureTransform({
      usePercent              : true,
      height                  : 1,
      width                   : 1,
      pivotX                  : 0.5,
      pivotY                  : 1,
      anchorX                 : 0.5,
      anchorY                 : 1,
      maintainAspectRatioType : MaintainAspectRatioType.MAX,
    }));

    this._initProperties(bgData);
  }

  _initProperties(bgData) {
    this.unlock = bgData.unlock;
  }
}
