import { Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant"
import { UIScreen } from "./../../pureDynamic/PixiWrapper/screen/uiScreen"
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../pureDynamic/core/pureTransformConfig";
import { ListMenu } from "../ui/menu/listMenu";
import { PureButton } from "../../pureDynamic/PixiWrapper/pureButton";
import { FakeBackground } from "../ui/utils/fakeBackground";
import { Tween } from "../../systems/tween/tween";

export const MenuScreenEvent = Object.freeze({
    Close: "Close",
    ShopSelected: "ShopSelected",
    ListLevelSelected: "ListLevelSelected",
});

export class MenuScreen extends UIScreen {
    constructor() {
        super(GameConstant.MENU_SCREEN);
    }

    create() {
        super.create();

        this._initBackground();
        this._initListMenu();
        this._initCloseBtn();

        this._initEffects();
        this._initEvents();
    }

    _initBackground() {
        this.bg = new FakeBackground();
        this.addChild(this.bg);
    }

    _initListMenu() {
        this.listMenu = new ListMenu();
        this.addChild(this.listMenu);
    }
    
    _initCloseBtn() {
        this.closeBtn = new PureButton(Texture.from("btn_close"), () => this._onCloseMenu(), new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            x: 300,
            y: -320,
            uuseOriginalSize: true,
        }));
        this.addChild(this.closeBtn.displayObject);
    }

    _onCloseMenu() {
        this.emit(MenuScreenEvent.Close);
    }

    _initEvents() {
        this.listMenu.on(MenuScreenEvent.ShopSelected, () => {
            this.emit(MenuScreenEvent.ShopSelected);
        });
        this.listMenu.on(MenuScreenEvent.ListLevelSelected, () => {
            this.emit(MenuScreenEvent.ListLevelSelected);
        });
    }

    show() {
        super.show();
        this.tweenFadeIn.start();
    }

    hide() {
        this.tweenFadeOut.start();
    }

    _initEffects() {
        this.alpha = 0;

        this.tweenFadeIn = Tween.createTween(this, { alpha: 1 }, {
            duration: 0.2
        });

        this.tweenFadeOut = Tween.createTween(this, { alpha: 0  }, {
            duration: 0.2,
            onComplete: () => {
                super.hide();
            }
        });
    }
}