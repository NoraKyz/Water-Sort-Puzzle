import { Container } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Scene } from "../../pureDynamic/PixiWrapper/scene/scene";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { BackgroundManager } from "../../iec/object/background/backgroundManager";
import { Confetti } from "../../iec/object/confetti/confetti";
import { Spawner } from "../../spawners/spawner";
import { SoundManager } from "../../soundManager";
import { Level } from "../level/level";
import { LevelEvent } from "../level/levelEvent";
import { Data } from "../../dataTest";
import { TopbarScreen } from "../screens/topbarScreen";
import { WinScreen } from "../screens/winScreen";

export class PlayScene extends Scene {
  constructor() {
    super(GameConstant.PLAY_SCREEN);
  }

  create() {
    super.create();

    this._initBg();
    this._initGameplay();
    this._initScreens();
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

  _initScreens() {
    this.ui.addScreens(
      new TopbarScreen(),
      new WinScreen(),
    );

    this.topbarScreen = this.ui.getScreen(GameConstant.TOPBAR_SCREEN);
    this.winScreen = this.ui.getScreen(GameConstant.WIN_SCREEN);

    this.ui.setScreenActive(GameConstant.TOPBAR_SCREEN);
    this.ui.setScreenActive(GameConstant.WIN_SCREEN, false);
  }

  _initEvents() {
    this.level.on(LevelEvent.Complete, () => {
      this.ui.setScreenActive(GameConstant.WIN_SCREEN);
    });

    this.winScreen.on(LevelEvent.NextLevel, () => {
      this.level.nextLevel();
      this.topbarScreen.onNextLevel();
      this.ui.setScreenActive(GameConstant.WIN_SCREEN, false);
    });

    this.level.on("spawnConfetti", this._spawnConfetti, this);

    this.topbarScreen.on(LevelEvent.Undo, () => {
      this.level.emit(LevelEvent.Undo);
    });
    this.topbarScreen.on(LevelEvent.Replay, () => {
      this.level.emit(LevelEvent.Replay);
    });
    this.topbarScreen.on(LevelEvent.AddTube, () => {
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
