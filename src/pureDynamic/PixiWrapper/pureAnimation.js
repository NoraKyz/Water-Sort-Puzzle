import { AnimatedSprite } from "pixi.js";
import { PureObject } from "../core/pureObject";

export class PureAnimation extends PureObject {
  /**
   * @class PureAnimation
   * @param {PIXI.Container} parent
   * @param {Array<Texture>} textures
   * @param {PureTransform} transformPortrait
   * @param {PureTransform} transformLandscape
   */
  constructor(parent, textures, transformPortrait = null, transformLandscape = null) {
    super(new AnimatedSprite(textures), transformPortrait, transformLandscape);
    parent.addChild(this.displayObject);
  }
}
