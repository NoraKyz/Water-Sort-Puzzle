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
import { update } from "@tweenjs/tween.js";
import { ButtonManager } from "./iec/ui/buttonManager";
import { DataLocal } from "./iec/data/dataLocal";
import { LoadingScene, LoadingSceneEvent } from "./iec/scenes/loadingScene";

export class Game {
  static init() {
    this.gameCreated = false;
    this.started = false;
    this.life = GameConstant.GAME_LIFE;
    this.load();
  }

  static load() {
    Debug.log("Creative", "Load");
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
    // TODO: init game setting
    AssetManager.load(this._onAssetLoaded.bind(this));
  }

  static getScreenSize() {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  static _create() {
    this.gameCreated = true;
    let screenSize = this.getScreenSize();
    Debug.log("Creative", "Create", screenSize);

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
      Debug.warn("Creative", "Game resize called before game loading");
    }
  }

  static _onAssetLoaded() {
    if (!this.gameCreated) {
      this._create();
    }
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

  static onLose() {
  }

  static sendEvent(type, name) {
  }

  static onCTAClick(elementName) {
    this.sendEvent("end_choice", elementName);
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

};
window.onfocus = function () {

};
