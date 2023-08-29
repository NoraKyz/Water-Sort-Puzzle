import { Scene } from "../../pureDynamic/PixiWrapper/scene/scene";
import { GameConstant } from "../../gameConstant";
import { GameStateManager, GameState } from "../../pureDynamic/systems/gameStateManager";
import { SceneManager } from "../../pureDynamic/PixiWrapper/scene/sceneManager";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { LoadingScreen, LoadingScreenEvent } from "../screens/loadingScreen";

export const LoadingSceneEvent = Object.freeze({
  LoadCompleted: "loadComplete",
});

export class LoadingScene extends Scene {
  constructor() {
    super(GameConstant.LOADING_SCENE);
    GameResizer.registerOnResizeCallback(this.resize.bind(this));  
  }

  create() {
    super.create();
    
    this._initScreens();
    this._initEvents();

    this.resize();
  }

  _initScreens() {
    this.ui.addScreens(new LoadingScreen());

    this.loadingScreen = this.ui.getScreen(GameConstant.LOADING_SCREEN);

    this.ui.setScreenActive(GameConstant.LOADING_SCREEN);
  }

  _initEvents() {   
    this.loadingScreen.on(LoadingScreenEvent.LoadingbarCompleted, () => this._startGame());
  }

  _startGame() {
    GameStateManager.state = GameState.Home;
    this.emit(LoadingSceneEvent.LoadCompleted, this);
    SceneManager.unload(this);
  }
}