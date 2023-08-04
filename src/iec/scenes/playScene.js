import { Container } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Scene } from "../../pureDynamic/PixiWrapper/scene/scene";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { Level } from "../level/level";
import { BackgroundManager } from "../../iec/object/background/backgroundManager";

export class PlayScene extends Scene {
  constructor() {
    super(GameConstant.SCENE_PLAY);
  }

  create() {
    super.create();

    this._initBg();
    this._initGameplay();
    this.resize();
  }

  resize() {
    super.resize();
    this.gameplay.x = GameResizer.width / 2;
    this.gameplay.y = GameResizer.height / 2;
  }

  _initBg() {
    this.bgManager = new BackgroundManager();
    this.addChild(this.bgManager);
  }

  _initLevelEasy() {
    this.level = new Level(0);
    this.gameplay.addChild(this.level);
  }

  _initGameplay() {
    this.gameplay = new Container();
    this.addChild(this.gameplay);
    this._initLevelEasy();
  }
}
