import { Container, Texture } from "pixi.js";
import { Game } from "../../game";
import { GameConstant } from "../../gameConstant";
import { Util } from "../../helpers/utils";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { Scene } from "../../pureDynamic/PixiWrapper/scene/scene";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { GameState, GameStateManager } from "../../pureDynamic/systems/gameStateManager";
import { SoundManager } from "../../soundManager";
import { Spawner } from "../../spawners/spawner";
import { Tween } from "../../systems/tween/tween";
import { LevelEvent } from "../level/levelEvent";
import { LevelManager } from "../level/levelManager";
import { Confetti } from "../object/confetti/confetti";
import { TopBar } from "../ui/topBar";
import { IntroScene, IntroSceneEvent } from "./introScene";
import { LoseScene } from "./loseScene";
import { WinScene } from "./winScene";
import { Level } from "../level/level";

export class PlayScene extends Scene {
  constructor() {
    super(GameConstant.SCENE_PLAY);
  }

  create() {
    super.create();
    this.bgContainer = new Container();
    this.addChild(this.bgContainer);
    this._initTopBar();
    this._initGameplay();
    this._initUI();
    // super.initGameTag();
    this.resize();
    this._initIntro();
    GameStateManager.state = GameState.Tutorial;
  }

  update() {
    super.update();
  }

  onStart() {
    GameStateManager.state = GameState.Playing;
    Game.onStart();
  }

  onPause() {
    super.onPause();
  }

  onResume() {
    super.onResume();
  }

  resize() {
    super.resize();
    this.gameplay.x = GameResizer.width / 2;
    this.gameplay.y = GameResizer.height / 2;
  }

  lose() {
    GameStateManager.state = GameState.Lose;
    Game.onLose();
  }

  win() {
    GameStateManager.state = GameState.Win;
    Game.onWin();
  }

  _initIntro() {
    this.intro = new IntroScene();
    this.addChild(this.intro);
    this.intro.once(IntroSceneEvent.TapEasy, this._initLevelEasy, this);
    this.intro.once(IntroSceneEvent.TapMedium, this._initLevelMedium, this);
    this.intro.once(IntroSceneEvent.TapHard, this._initLevelHard, this);
  }

  _initLevelEasy() {
    this.level = new Level(0);
    this._initBackGround("bg_lvl_easy");
    this.gameplay.addChild(this.level);
    this._registerLevelEventListener();
  }

  _initLevelMedium() {
    this.level = new Level(1);
    this._initBackGround("bg_lvl_medium");
    this.gameplay.addChild(this.level);
    this._registerLevelEventListener();
  }

  _initLevelHard() {
    this.level = new Level(2);
    this._initBackGround("bg_lvl_hard");
    this.gameplay.addChild(this.level);
    this._registerLevelEventListener();
  }

  _registerLevelEventListener() {
    this.level.on(LevelEvent.Complete, this._onLevelComplete, this);
    this.level.on(LevelEvent.Fail, this._onLevelFail, this);
    this.level.on("spawnConfetti", this._SpawnConfetti, this);
  }

  _initUI() {
    this._initDownLoadButton();
    // this._initTutorial();
    // this._initTagline();
    this.endCardContainer = new Container();
    this.addChild(this.endCardContainer);
  }

  _initGameplay() {
    this.gameplay = new Container();
    this.addChild(this.gameplay);
    this._initConfetti();
  }

  _initLevels() {
    this.levelManager = new LevelManager();
    this.levelManager.on(LevelEvent.Start, this._onLevelStart, this);
    this.levelManager.start();
    this.gameplay.addChild(this.levelManager);
  }

  _onLevelStart() {

  }

  _onLevelComplete(lvl) {
    Game.onWin();
    this.downloadBtn.visible = false;
    if (!this.endCard) {
      SoundManager.play("sfx_win");
      this.endCard = new WinScene();
    }
    this.endCardContainer.addChild(this.endCard);
  }

  _onLevelFail() {
    this.downloadBtn.visible = false;
    if (!this.endCard) {
      this.endCard = new LoseScene();
    }
    this.endCardContainer.addChild(this.endCard);
  }

  _initBackGround(bg) {
    let tex = Texture.from(bg);
    this.bg = new PureSprite(tex, new PureTransform({
      usePercent              : true,
      height                  : 1,
      width                   : 1,
      pivotX                  : 0.5,
      pivotY                  : 1,
      anchorX                 : 0.5,
      anchorY                 : 1,
      maintainAspectRatioType : MaintainAspectRatioType.MAX,
    }));
    this.bgContainer.addChild(this.bg.displayObject);
  }

  _initDownLoadButton() {
    this.downloadBtn = new PureSprite(Texture.from("spr_btn_download"), new PureTransform({
      alignment       : Alignment.BOTTOM_CENTER,
      useOriginalSize : true,
      y               : -10,
    }));
    this.addChild(this.downloadBtn.displayObject);
    Util.registerOnPointerDown(this.downloadBtn.displayObject, () => Game.onCTAClick("playscene_download_button"));
    Tween.createTween(this.downloadBtn.displayObject, { scale: {
      x : 1.1,
      y : 1.1,
    } }, {
      duration : 0.4,
      repeat   : Infinity,
      yoyo     : true,
    }).start();
  }

  _initTutorial() {
    this.tutorialText = new PureSprite(Texture.from("spr_tutorial_text"), new PureTransform({
      alignment       : Alignment.BOTTOM_CENTER,
      useOriginalSize : true,
      y               : -130,
    }));
    this.addChild(this.tutorialText.displayObject);
    let textTween = Tween.createTween(this.tutorialText.displayObject, { scale: {
      x : 1.1,
      y : 1.1,
    } }, {
      duration : 0.4,
      repeat   : Infinity,
      yoyo     : true,
    }).start();

    Tween.createTween(this.tutorialText, {}, {
      duration   : 5,
      onComplete : () => {
        textTween.stop();
        this.tutorialText.visible = false;
      },
    }).start();
  }

  _initTagline() {
    this.tagLine = new PureSprite(Texture.from("spr_tagline"), new PureTransform({
      alignment       : Alignment.TOP_CENTER,
      y               : 170,
      useOriginalSize : true,
    }));
    this.addChild(this.tagLine.displayObject);
    Tween.createCountTween({
      duration   : 3,
      onComplete : () => {
        this.tagLine.visible = false;
      },
    }).start();
  }

  _initTopBar() {
    this.topBar = new TopBar();
    this.addChild(this.topBar);
  }

  _initConfetti() {
    this.confettiSpawner = new Spawner();
    this.confettiSpawner.init(() => {
      return new Confetti();
    }, 2);
  }

  _startCountDown() {
    this.countDownTween = Tween.createCountTween({
      duration   : 30,
      onComplete : this._onLevelFail.bind(this),
    }).start();
  }

  _SpawnConfetti(tube) {
    SoundManager.play("sfx_cheer");
    let confetti = this.confettiSpawner.spawn();
    this.gameplay.addChild(confetti);
    confetti.x = tube.x;
    confetti.y = tube.y;
    confetti.play();
  }
}
