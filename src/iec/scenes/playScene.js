import { Container } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { Scene } from "../../pureDynamic/PixiWrapper/scene/scene";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { Theme } from "../../iec/object/theme/theme";
import { Confetti } from "../../iec/object/confetti/confetti";
import { Spawner } from "../../spawners/spawner";
import { SoundManager } from "../../soundManager";
import { Level } from "../level/level";
import { LevelEvent } from "../level/levelEvent";
import { TopbarScreen, TopbarScreenEvent } from "../screens/topbarScreen";
import { WinScreen } from "../screens/winScreen";
import { MenuScreen, MenuScreenEvent } from "../screens/menuScreen";
import { ShopScreen, ShopScreenEvent } from "../screens/shopScreen";
import { UserData } from "../data/userData";
import { LevelScreen, LevelScreenEvent } from "../screens/levelScreen";
import { AdsInvalidScreen } from "../screens/adsInvalidScreen";
import { AdEvent, AdsManager } from "../../../sdk/adsManager";
import { AdsSkippedScreen } from "../screens/adsSkippedScreens";
import { AdsBlockedScreen } from "../screens/adsBlockedScreen";
import { SdkManager } from "../../../sdk/sdkManager";


export class PlayScene extends Scene {
  constructor() {
    super(GameConstant.PLAY_SCENE);
  }

  create() {
    super.create();

    this._initTheme();
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

  _initTheme() {
    this.theme = new Theme();
    this.addChild(this.theme);
  }

  _initGameplay() {
    this.gameplay = new Container();
    this.addChild(this.gameplay);

    this._initLevel();
    this._initConfetti();
  }

  _initLevel() {
    this.level = new Level();
    this.level.startLevel(UserData.currentLevel);
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
      new MenuScreen(),
      new ShopScreen(),
      new LevelScreen(),
      new AdsInvalidScreen(),
      new AdsSkippedScreen(),
      new AdsBlockedScreen(),
    );

    this.topbarScreen = this.ui.getScreen(GameConstant.TOPBAR_SCREEN);
    this.winScreen = this.ui.getScreen(GameConstant.WIN_SCREEN);
    this.menuScreen = this.ui.getScreen(GameConstant.MENU_SCREEN);
    this.shopScreen = this.ui.getScreen(GameConstant.SHOP_SCREEN);
    this.levelScreen = this.ui.getScreen(GameConstant.LEVEL_SCREEN);
    this.adsInvalidScreen = this.ui.getScreen(GameConstant.ADS_INVALID_SCREEN);
    this.adsSkippedScreen = this.ui.getScreen(GameConstant.ADS_SKIPPED_SCREEN);
    this.adsBlockedScreen = this.ui.getScreen(GameConstant.ADS_BLOCKED_SCREEN);

    this.ui.setScreenActive(GameConstant.TOPBAR_SCREEN);
  }

  _initEvents() {
    SdkManager.emitter.on(AdEvent.AD_BLOCKED, () => {
      this.ui.setScreenActive(GameConstant.ADS_BLOCKED_SCREEN);
    });

    SdkManager.emitter.on(AdEvent.AD_TIMEOUT, () => {
      this.ui.setScreenActive(GameConstant.ADS_INVALID_SCREEN);
    });

    SdkManager.emitter.on(AdEvent.AD_SKIPPED, () => {
      this.ui.setScreenActive(GameConstant.ADS_SKIPPED_SCREEN);
    });

    this.level.on(LevelEvent.Complete, () => {
      this.ui.setScreenActive(GameConstant.WIN_SCREEN);
    });
    this.level.on("spawnConfetti", this._spawnConfetti, this);

    this.winScreen.on(LevelEvent.NextLevel, () => {
      this.level.nextLevel();
      this.ui.setScreenActive(GameConstant.WIN_SCREEN, false);
    });

    this.topbarScreen.on(TopbarScreenEvent.OpenMenu, () => {
      this.ui.setScreenActive(GameConstant.MENU_SCREEN);
    });
    this.topbarScreen.on(LevelEvent.Undo, () => {
      this.level.emit(LevelEvent.Undo);
    });
    this.topbarScreen.on(LevelEvent.Replay, () => {
      this.level.emit(LevelEvent.Replay);
    });
    this.topbarScreen.on(LevelEvent.AddTube, () => {
      this.level.emit(LevelEvent.AddTube);
    });
    this.topbarScreen.on(LevelEvent.SpeedUp, () => {
      this.level.emit(LevelEvent.SpeedUp);
    });
    this.topbarScreen.on(LevelEvent.SpeedDown, () => {
      this.level.emit(LevelEvent.SpeedDown);
    });
    this.topbarScreen.on(LevelEvent.Hint, () => {
      this.level.emit(LevelEvent.Hint);
    });

    this.menuScreen.on(MenuScreenEvent.Close, () => {
      this.ui.setScreenActive(GameConstant.MENU_SCREEN, false);
    })
    this.menuScreen.on(MenuScreenEvent.ShopSelected, () => {
      this.ui.setScreenActive(GameConstant.MENU_SCREEN, false);
      this.ui.setScreenActive(GameConstant.SHOP_SCREEN);
    });
    this.menuScreen.on(MenuScreenEvent.ListLevelSelected, () => {
      this.ui.setScreenActive(GameConstant.MENU_SCREEN, false);
      this.ui.setScreenActive(GameConstant.LEVEL_SCREEN);
    });

    this.shopScreen.on(ShopScreenEvent.BackToScene, () => {
      this.ui.setScreenActive(GameConstant.SHOP_SCREEN, false);
    });

    this.levelScreen.on(LevelScreenEvent.Close, () => {
      this.ui.setScreenActive(GameConstant.LEVEL_SCREEN, false);
    });
    this.levelScreen.on(LevelScreenEvent.LevelSelected, (level) => {
      this.level.startLevel(level);
      this.levelScreen.emit(LevelScreenEvent.Close);
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
