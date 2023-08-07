import { Container } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Scene } from "../../pureDynamic/PixiWrapper/scene/scene";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { Level } from "../level/level";
import { BackgroundManager } from "../../iec/object/background/backgroundManager";
import { Confetti } from "../../iec/object/confetti/confetti";
import { Spawner } from "../../spawners/spawner";
import { SoundManager } from "../../soundManager";

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

  _initLevel() {
    this.level = new Level(0);
    this._registerLevelEventListener();
    this.gameplay.addChild(this.level);
  }

  _initGameplay() {
    this.gameplay = new Container();
    this.addChild(this.gameplay);
    this._initLevel();
    this._initConfetti();
  }

  _registerLevelEventListener() {
    this.level.on("spawnConfetti", this._spawnConfetti, this);
  }

  _initConfetti() {
    this.confettiSpawner = new Spawner();
    this.confettiSpawner.init(() => {
      return new Confetti();
    }, 2);
  }

  _spawnConfetti(tube) {
    SoundManager.play("sfx_cheer");
    let confetti = this.confettiSpawner.spawn();
    this.gameplay.addChild(confetti);
    confetti.x = tube.x;
    confetti.y = tube.y;
    confetti.play();
  }
}
