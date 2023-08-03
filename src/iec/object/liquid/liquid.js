import { Container, Sprite, Texture } from "pixi.js";

export class Liquid extends Container {
  constructor(color, code, originalHeight, percent = 100) {
    super();
    this.code = code;
    this.originalHeight = originalHeight;
    this.liquid = new Sprite(Texture.WHITE);
    this.liquid.width = 1000;
    this.liquid.height = originalHeight * (percent / 100);
    this.liquid.anchor.set(0.5, 1);
    this.percent = percent;
    this.addChild(this.liquid);
    this.liquid.tint = color;
  }

  update(angle) {
    this.liquid.height = (this.originalHeight * (this.percent / 100)) * Math.abs(Math.cos(angle));
  }

  trueWidth() {
    return this.originalHeight * (this.percent / 100);
  }

  setPercent(percent) {
    this.percent = percent;
    this.update();
  }

  updateAnlge(angel) {
    this.rotation = angel;
  }
}
