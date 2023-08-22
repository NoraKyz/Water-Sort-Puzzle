import { Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant"
import { UIScreen } from "./../../pureDynamic/PixiWrapper/screen/uiScreen"
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../pureDynamic/core/pureTransformConfig";
import { ListMenu } from "../ui/menu/listMenu";
import { PureButton } from "../../pureDynamic/PixiWrapper/pureButton";
import { FakeBackground } from "../ui/utils/fakeBackground";

export const MenuScreenEvent = Object.freeze({
    Close: "Close",
    ShopSelected: "ShopSelected",
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
            alignment: Alignment.TOP_RIGHT,
            x: -30,
            y: 120,
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
    }
}