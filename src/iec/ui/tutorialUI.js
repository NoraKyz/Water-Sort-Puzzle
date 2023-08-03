import { Container } from "pixi.js";
import { Util } from "../../helpers/utils";
import { ObjectFactory } from "../objectFactory";

export class TutorialUI extends Container {
  constructor() {
    super();
    this._initFakeBackground();
  }

  onTapBackground() {
    this.emit("tutorial:complete");
  }

  _initFakeBackground() {
    this.bg = ObjectFactory.createFakeBackground();
    this.addChild(this.bg.displayObject);
    Util.registerOnPointerDown(this.bg.displayObject, this.onTapBackground, this);
  }

  registerOnTutorialCompleteCallback(fn, context) {
    this.on("tutorial:complete", fn, context);
  }
}
