import { GameConstant } from "./gameConstant";
import { AssetManager } from "./assetManager";
import { Debug } from "./helpers/debug";
import { Tween } from "./systems/tween/tween";
import { GameResizer } from "./pureDynamic/systems/gameResizer";
import { SceneManager } from "./pureDynamic/PixiWrapper/scene/sceneManager";
import "./systems/extensions/index";
import { ScriptSystem } from "./systems/script/scriptSystem";
import { Time } from "./systems/time/time";
import { InputManager } from "./pureDynamic/systems/inputManager";
import { Physics } from "./physics/physics";
import { PlayScene } from "././iec/scenes/playScene";
import { ButtonManager } from "./iec/ui/buttonManager";
import { DataLocal } from "./iec/data/dataLocal";
import { LoadingScene, LoadingSceneEvent } from "./iec/scenes/loadingScene";
import { GameState, GameStateManager } from "./pureDynamic/systems/gameStateManager";
import { SoundManager } from "./soundManager";
import "./../sdk/sdk"
import { SdkEvent, SdkManager } from "../sdk/sdkManager"
import { AdBannerSize, AdsManager } from "../sdk/adsManager"

export class Game {
  static init() {
    this.gameCreated = false;
    this.started = false;
    this.life = GameConstant.GAME_LIFE;
    this.load();
  }

  static load() {
    Debug.log("ABIGame", "Load");
    this.app = new PIXI.Application({
      width: GameConstant.GAME_WIDTH,
      height: GameConstant.GAME_HEIGHT,
      backgroundColor: GameConstant.BG_COLOR,
    });

    document.body.appendChild(this.app.view);
    const viewStyle = this.app.view.style;
    viewStyle.position = "absolute";
    viewStyle.display = "block";
    viewStyle.padding = "0px 0px 0px 0px";

    ScriptSystem.init(this.app);
    Tween.init(this.app);
    Time.init(this.app);
    GameResizer.init(this.app);
    InputManager.init(this.app.view);
    ButtonManager.init();
    DataLocal.init();
    AssetManager.load(this._onAssetLoaded.bind(this));
  }

  static getScreenSize() {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  static _create() {
    this.gameCreated = true;
    let screenSize = this.getScreenSize();
    Debug.log("ABIGame", "Create", screenSize);

    this.resize(screenSize);

    Physics.init(this.app);
    SceneManager.init([
      // TODO: Add scenes here
      new PlayScene(),
      new LoadingScene(),
    ]);
    this.app.stage.addChild(SceneManager.sceneContainer);

    let playScene = SceneManager.getScene(GameConstant.PLAY_SCENE);
    let loadingScene = SceneManager.getScene(GameConstant.LOADING_SCENE);

    SceneManager.load(loadingScene);
    loadingScene.on(LoadingSceneEvent.LoadCompleted, () => {
      SceneManager.load(playScene);
    });

    // lock 60FPS;
    this.app.ticker.maxFPS = GameConstant.MAX_FPS;
    this.app.ticker.add(() => this._update());
  }

  static _update() {
    this.dt = this.app.ticker.deltaMS / 1000;
    SceneManager.update(Time.dt);
  }

  static resize(screenSize) {
    if (this.gameCreated) {
      GameResizer.resize(screenSize.width, screenSize.height);
    }
    else {
      Debug.warn("ABIGame", "Game resize called before game loading");
    }
  }

  static _onAssetLoaded() {
    if (!this.gameCreated) {
      this._create();
    }

    this.initAbigamesSdk();
  }

  static initAbigamesSdk() {
    SdkManager.init();
    SdkManager.emitter.on(SdkEvent.SDK_INIT_COMPLETED, () => {
      this.initBannerAds();
      this.initAbiUsers();
    });
  }

  static initBannerAds() {
    AdsManager.init();
    let id = "banner-ads";
    this.bannerAdsElement = document.createElement("div");
    this.bannerAdsElement.id = id;
    this.bannerAdsStyle = this.bannerAdsElement.style;
    document.body.appendChild(this.bannerAdsElement);

    this.showBannerAds();
  }

  static showBannerAds() {
    if (AdsManager.hasAdblock() || GameStateManager.prevState === GameState.Playing) {
      return;
    }

    let bannerSize = null;
    if (window.innerWidth < window.innerHeight) {
      this.bannerAdsStyle.width = "300px";
      this.bannerAdsStyle.height = "250px";
      this.bannerAdsStyle.inset = "120px 0 0 auto";
      this.bannerAdsStyle.float = "right";
      bannerSize = AdBannerSize.SIZE1;
    } else {
      this.bannerAdsStyle.width = "100%";
      this.bannerAdsStyle.height = "90px";
      this.bannerAdsStyle.inset = "auto 0 0 0";
      bannerSize = AdBannerSize.SIZE3;
    }

    AdsManager.showBanner(this.bannerAdsElement.id, bannerSize);
    this.onResizeBannerAds();
  }

  static disableBannerAds() {
    this.bannerAdsElement.style.display = "none";
  }

  static enableBannerAds() {
    this.bannerAdsElement.style.display = "flex";
  }

  static onResizeBannerAds() {

  }

  static initAbiUsers() {

  }

  static onVisible() {
    this.started = true;
    if (AssetManager.loaded && !this.gameCreated) {
      this._create();
    }
  }

  static onStart() {
  }

  static onWin() {
  }

  static setPause(isPause) {
    if (isPause) {
      this.pause();
    }
    else {
      this.resume();
    }
  }

  static pause() {
    Debug.log("ABIGame", "Pause");
    if (!this.gameCreated) {
      Debug.warn("ABIGame", "Pause before game creation!");
      return;
    }

    if (GameStateManager.state !== GameState.Paused) {
      SoundManager.muteAll();
      GameStateManager.state = GameState.Paused;
      SceneManager.setPause(true);
      Time.scale = 0;
    }
  }

  static resume() {
    Debug.log("ABIGame", "Resume");

    if (!this.gameCreated) {
      Debug.warn("ABIGame", "Resume before game creation!");
      return;
    }

    if (GameStateManager.state === GameState.Paused) {
      SoundManager.unMuteAll();
      GameStateManager.state = GameStateManager.prevState;
      SceneManager.setPause(false);
      Time.scale = 1;
    }
  }

  static get revivable() {
    return this.life > 1;
  }
}

window.onload = function () {
  Game.init();
};

window.onresize = function () {
  Game.resize(Game.getScreenSize());
};

window.onblur = function () {
  Game.setPause(true);
};
window.onfocus = function () {
  Game.setPause(false);
};
