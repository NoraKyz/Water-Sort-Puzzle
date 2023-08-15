import { Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant"
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { UIScreen } from "./../../pureDynamic/PixiWrapper/screen/uiScreen"
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { MaintainAspectRatioType } from "../../pureDynamic/core/pureTransformConfig";

export class MenuScreen extends UIScreen {
    constructor() {
        super(GameConstant.MENU_SCREEN);
    }

    create() {
        super.create();

        this._initBackground();
        this._initListMenu();
        this._initCloseBtn();
    }

    _initBackground() {
        this.bg = new PureSprite(Texture.WHITE, new PureTransform({
            usePercent: true,
            height: 1,
            width: 1,
            pivotX: 0.5,
            pivotY: 0.5,
            anchorX: 0.5,
            anchorY: 0.5,
            maintainAspectRatioType: MaintainAspectRatioType.MAX,
        }));
        this.bg.displayObject.tint = 0x000000;
        this.bg.displayObject.alpha = 0.7;
        this.addChild(this.bg.displayObject);
    }

    _initListMenu() {
        
    }

    _initCloseBtn() {
    }
}