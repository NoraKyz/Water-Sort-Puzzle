import { Sprite, Texture } from "pixi.js";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureNinePatch } from "../../../pureDynamic/PixiWrapper/pureNinePatch";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";

export const LoadingBarEvent = Object.freeze({
  COMPLETE    : "complete",
  START       : "start",
  PROGRESSING : "progressing",
});

export class LoadingBar extends PIXI.Container {
  constructor() {
    super();
    this.increase = 0;
    this.stars = [];
    this.currFilledStarIndex = -1;
    this.curProgress = 0;

    this._initBg();
    this._initProgress();
    this._initProgressDot();

    GameResizer.registerOnResizedCallback(() => this.resize());
    this.resize();
  }

  resize() {
    this.progressMaxWidth = this.bg.displayObject.width;
    this.progress.displayObject.width = this.curProgress * this.progressMaxWidth;
    this.progress.displayObject.height = this.bg.displayObject.height;
    this.dot.x = this.progress.displayObject.width;
  }

  updateProgress(progress) {
    this.curProgress = progress;
    this.startProgressAnimation(this.progressMaxWidth * progress);
    this.dot.x = this.progress.displayObject.width;
  }

  reset() {
    this.increase = 0;
    this.updateProgress(0);
  }

  startProgressAnimation(width) {

    this.progress.displayObject.width = width;
  }

  _initBg() {
    let texture = Texture.from("progressBar_bg");
    let pTransform = new PureTransform({
      alignment : Alignment.MIDDLE_CENTER,
      y         : 60,
      height    : 10,
    });

    let lTransform = new PureTransform({
      alignment : Alignment.MIDDLE_CENTER,
      y         : 80,
      width     : texture.width * 1.6,
      height    : 10,
    });
    this.bg = new PureSprite(texture, pTransform, lTransform);
    this.bg.displayObject.alpha = 0.5;
    this.addChild(this.bg.displayObject);
  }

  _initProgress() {
    let texture = Texture.WHITE;
    this.progress = new PureNinePatch(texture, 20, 18, 20, 18, new PureTransform({
      container       : this.bg,
      alignment       : Alignment.MIDDLE_LEFT,
      useOriginalSize : false,
      y               : 3,
    }));
    this.progressMaxWidth = this.bg.displayObject.width;
    this.progress.displayObject.width = 0;
    this.progress.displayObject.height = 8;
    this.progress.displayObject.tint = 0xffeb77;
    this.addChild(this.progress.displayObject);
  }

  _initProgressDot() {
    let texture = Texture.from("progressBar_dot");
    this.dot = new Sprite(texture);
    this.dot.anchor.set(0.5, 0.5);
    this.dot.y = this.bg.displayObject.height / 2;
    this.progress.displayObject.addChild(this.dot);
  }

  start() {
    this.emit(LoadingBarEvent.START);
    this.started = true;
  }
}
