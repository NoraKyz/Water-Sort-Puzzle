import { Container } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Scene } from "../../pureDynamic/PixiWrapper/scene/scene";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { BackgroundManager } from "../../iec/object/background/backgroundManager";
import { Confetti } from "../../iec/object/confetti/confetti";
import { Spawner } from "../../spawners/spawner";
import { SoundManager } from "../../soundManager";
import { TopbarUI } from "../ui/topbar/topbarUI";
import { Level } from "../level/level";
import { LevelEvent } from "../level/levelEvent";
import { WinUI } from "../ui/winUI/winUI";
import { Data } from "../../dataTest";

export class PlayScene extends Scene {
  constructor() {
    super(GameConstant.SCENE_PLAY);
  }

  create() {
    super.create();

    this._initBg();
    this._initGameplay();
    this._initUI();
    this._initEvents();

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

  _initGameplay() {
    this.gameplay = new Container();
    this.addChild(this.gameplay);

    this._initLevel();
    this._initConfetti();
  }

  _initLevel() {
    this.level = new Level();
    this.level.startLevel(Data.currentLevel);
    this.gameplay.addChild(this.level);
  }

  _initConfetti() {
    this.confettiSpawner = new Spawner();
    this.confettiSpawner.init(() => {
      return new Confetti();
    }, 2);
  }

  _initUI() {
    this.topBarUI = new TopbarUI();
    this.addChild(this.topBarUI);

    this.winUI = new WinUI();
    this.addChild(this.winUI);
  }

  _initEvents() {
    this.level.on(LevelEvent.Complete, () => {
      this.winUI.show();
    });

    this.winUI.on("nextLevel", () => {
      this.level.nextLevel();
      this.topBarUI.onNextLevel();
      this.winUI.hide();
    });

    this.level.on("spawnConfetti", this._spawnConfetti, this);

    this.topBarUI.on(LevelEvent.Undo, () => {
      this.level.emit(LevelEvent.Undo);
    });
    this.topBarUI.on(LevelEvent.Replay, () => {
      this.level.emit(LevelEvent.Replay);
    });
    this.topBarUI.on(LevelEvent.AddTube, () => {
      this.level.emit(LevelEvent.AddTube);
    });
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
