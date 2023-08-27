import { Container } from "pixi.js";
import { AnimatedSprite } from "@pixi/sprite-animated";
import { Util } from "../../../helpers/utils";

export class Confetti extends Container {
  constructor() {
    super();
    let textures = Util.getTexturesContain("image_014_");
    this.animtedSprite = new AnimatedSprite(textures, true);
    this.animtedSprite.anchor.set(0.5);
    this.animtedSprite.y = -290;
    this.animtedSprite.animationSpeed = 0.8;
    this.animtedSprite.loop = false;
    this.animtedSprite.onComplete = () => {
      this.parent?.removeChild(this);
      this.emit("selfDespawn");
    };
    
    this.addChild(this.animtedSprite);
  }

  play() {
    this.animtedSprite.gotoAndPlay(0);
  }
}
