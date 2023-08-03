import { Texture } from "@pixi/core";
import { Container } from "@pixi/display";
import { Sprite } from "@pixi/sprite";
import { PureObject } from "../../pureDynamic/core/pureObject";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment } from "../../pureDynamic/core/pureTransformConfig";
import { PureNinePatch } from "../../pureDynamic/PixiWrapper/pureNinePatch";
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { Time } from "../../systems/time/time";

export class ProgressUI extends Container {
  constructor() {
    super();
    this.speed = 0.4;
    this.curProgress = 0;
    this.targetProgress = 0;
    this._initBar();
    this._initSanta();
    this._initSantaCar();
    this._initIQText();
  }

  update() {
    if (this.curProgress !== this.targetProgress) {
      this.curProgress += this.speed * Time.dt;
      this.curProgress = this.curProgress > this.targetProgress ? this.targetProgress : this.curProgress;
      this.setPercent(this.curProgress);
    }
  }

  _initBar() {
    this.bar = new PureNinePatch(this, Texture.from("spr_progress_outter"), 10, 9, 10, 9, new PureTransform({
      alignment : Alignment.TOP_CENTER,
      y         : 160,
      width     : 650,
    }));
    this.progress = new PureNinePatch(this, Texture.from("spr_progress_fill"), 10, 7, 10, 7, new PureTransform({
      alignment       : Alignment.TOP_CENTER,
      useOriginalSize : true,
      x               : -this.bar.displayObject.width / 2 + 2,
      y               : 161,
    }));
    this.progressMaxWidth = this.bar.width - 4;
    this.progress.width = 0;
    this.addChild(this.bar.displayObject);
    this.addChild(this.progress.displayObject);
  }

  setPercent(percent) {
    this.progress.width = percent * this.progressMaxWidth;
    this.santa.x = Math.max(0, Math.min(this.progressMaxWidth * percent - 20, this.progressMaxWidth - 60));
  }

  _initSanta() {
    this.santaHolder = new Container();
    let pureObject = new PureObject(this.santaHolder, new PureTransform({
      alignment       : Alignment.TOP_CENTER,
      x               : -this.bar.displayObject.width / 2 + 2,
      y               : 110,
      useOriginalSize : true,
    }));
    this.santa = new Sprite(Texture.from("spr_santa"));
    this.santa.anchor.set(0.5);
    this.addChild(pureObject.displayObject);
    this.santaHolder.addChild(this.santa);
  }

  _initSantaCar() {
    this.iqText = new PureSprite(Texture.from("spr_santa_car"), new PureTransform({
      alignment       : Alignment.TOP_CENTER,
      x               : this.bar.displayObject.width / 2 - 70,
      y               : 84,
      useOriginalSize : true,
    }));
    this.addChild(this.iqText.displayObject);
  }

  _initIQText() {
    this.iqText = new PureSprite(Texture.from("spr_iq_text"), new PureTransform({
      alignment       : Alignment.TOP_CENTER,
      y               : 84,
      useOriginalSize : true,
    }));
    this.addChild(this.iqText.displayObject);
  }
}
