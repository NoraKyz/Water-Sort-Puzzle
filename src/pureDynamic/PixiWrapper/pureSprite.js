import { PureObject } from "../core/pureObject";
import { Sprite } from "pixi.js";

export class PureSprite extends PureObject {

  /**
   * @class PureSprite
   * @param {PIXI.Container} parent
   * @param {PIXI.Texture} texture
   * @param {PureTransform} transformPortrait
   * @param {PureTransform} transformLandscape
   */
  constructor(texture, transformPortrait = null, transformLandscape = null) {
    super(new Sprite(texture), transformPortrait, transformLandscape);
  }
}
