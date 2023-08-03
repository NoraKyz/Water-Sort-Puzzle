import { GameConstant } from "./gameConstant";
import { Debug } from "./helpers/debug";
import { AssetManager } from "./assetManager";
import { Tween } from "./systems/tween/tween";
import { Physics } from "./physics/physics";
import { Application } from "pixi.js";
import { Time } from "./systems/time/time";
import { SoundManager } from "./soundManager";
import Ads from "./ads/pureAds.mock";
import { ScriptSystem } from "./systems/script/scriptSystem";
import { GameResizer } from "./pureDynamic/systems/gameResizer";
import { InputManager } from "./pureDynamic/systems/inputManager";
import { GameState, GameStateManager } from "./pureDynamic/systems/gameStateManager";
import "./systems/extensions/index";
import { SceneManager } from "./pureDynamic/PixiWrapper/scene/sceneManager";
import { PlayScene } from "./iec/scenes/playScene";

export class Game {
  static init() {
    this.life = GameConstant.GAME_LIFE;
    this.started = true;

    this.ads = new Ads();
    this.ads.registerEvents(this);
  }

  static load() {
    Debug.log("Creative", "Load");

    this.app = new Application({
      width: GameConstant.GAME_WIDTH,
      height: GameConstant.GAME_HEIGHT,
    });

    document.body.appendChild(this.app.view);
    const viewStyle = this.app.view.style;
    viewStyle.position = "absolute";
    viewStyle.display = "block";
    viewStyle.padding = "0px 0px 0px 0px";

    Time.init(this.app);
    Tween.init(this.app);
    ScriptSystem.init(this.app);
    GameResizer.init(this.app);
    InputManager.init(this.app.view);
    AssetManager.load(this._onAssetLoaded.bind(this));
  }

  static _create() {
    this.gameCreated = true;
    let screenSize = this.ads.getScreenSize();
    Debug.log("Creative", "Create", screenSize);

    this.resize(screenSize);

    Physics.init(this.app);
    SceneManager.init(this.app.stage, [
      new PlayScene(),
    ]);
    SceneManager.load(SceneManager.getScene(GameConstant.SCENE_PLAY));
    this.app.ticker.add(this._update.bind(this));
  }

  static _update() {
    this.dt = this.app.ticker.deltaMS / 1000;
    SceneManager.update(this.dt);
    this.ads.adapter.update();
  }

  static resize(screenSize) {
    if (this.gameCreated) {
      GameResizer.resize(screenSize.width, screenSize.height);
    }
    else {
      Debug.warn("Creative", "Game resize called before game loading");
    }
  }

  static _onAssetLoaded() {
    this.ads.adapter.onAssetLoaded();
    if (this.started) {
      this._create();
    }
  }

  static onVisible() {
    Debug.log("Creative", "Visible");
  }

  static start() {
    this.started = true;
    if (AssetManager.loaded) {
      this._create();
    }
  }

  static onStart() {
    this.ads.adapter.onStart();
  }

  static onWin() {
    this.ads.adapter.onWin();
  }

  static onLose() {
    this.ads.adapter.onLose();
  }

  static onRevive() {
    this.life--;
    this.ads.adapter.onReplay();
  }

  static setPause(isPause) {
    if (!this.gameCreated) {
      return;
    }

    if (isPause && GameStateManager.state !== GameState.Paused) {
      SoundManager.muteAll();
      GameStateManager.state = GameState.Paused;
    }
    else if (!isPause && GameStateManager.state === GameState.Paused) {
      SoundManager.unMuteAll();
      GameStateManager.state = GameStateManager.prevState;
    }
  }

  static onOneLevelPassed() {
    this.ads.adapter.onOneLevelPassed();
  }

  static onMidwayProgress() {
    this.ads.adapter.onMidwayProgress();
  }

  static sendEvent(type, name) {
    this.ads.adapter.onSendEvent(type, name);
  }

  static onCTAClick(elementName) {
    this.sendEvent("end_choice", elementName);
    this.ads.onCTAClick();
  }

  static get revivable() {
    return this.life > 1;
  }
}
window.addEventListener("contextmenu", (e) => e.preventDefault());
// eslint-disable-next-line no-undef
window.addEventListener(ADEVENT_LOAD, () => {
  Game.init();
  Game.ads.load();
});
