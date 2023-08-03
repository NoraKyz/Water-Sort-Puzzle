import { Container, Texture } from "pixi.js";
import CornerConffetiConfig from "../../../../assets/jsons/cornerConffetiConfig.json";
import { Emitter } from "../../pixi-particles/pixi-particles";

export class CornerConfetti extends Container {
  constructor() {
    super();
    let textures = [];
    for (let i = 1; i <= 9; i++) {
      textures.push(Texture.from(`spr_confetti_${i}`));
    }
    this.conffeti = new Emitter(this, textures, CornerConffetiConfig);
    this.conffeti.autoUpdate = true;
    this.conffeti.emit = false;
  }

  play() {
    this.conffeti.cleanup();
    this.conffeti.playOnce();
  }
}
