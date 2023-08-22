import { Container, Texture } from "pixi.js";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { MaintainAspectRatioType } from "../../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { DataManager } from "../../../iec/data/dataManager";
import { DataObserver, EventData } from "../../data/dataObserver";

export class Theme extends Container {
  constructor() {
    super();

    this.data = DataManager.getThemeSkinData();
    this._create();  
    this._initEvents();
  }

  _create() {
    let tex = Texture.from(this.data.bgSprite);
    this.theme = new PureSprite(tex, new PureTransform({
      usePercent              : true,
      height                  : 1,
      width                   : 1,
      pivotX                  : 0.5,
      pivotY                  : 1,
      anchorX                 : 0.5,
      anchorY                 : 1,
      maintainAspectRatioType : MaintainAspectRatioType.MAX,
    }));
    this.addChild(this.theme.displayObject);
  }

  _initEvents() {
    DataObserver.addObserver(this);
    this.on(EventData.ThemeSelected, () => this._onChangeThemeSkin());
  }

  _onChangeThemeSkin() {
    this.data = DataManager.getThemeSkinData();

    this.theme.displayObject.texture = Texture.from(this.data.bgSprite);
    this.addChild(this.theme.displayObject);
  }
}
