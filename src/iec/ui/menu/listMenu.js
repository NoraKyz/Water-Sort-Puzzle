import { Container, Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { MenuScreenEvent } from "../../screens/menuScreen";
import { SoundButton } from "./soundBtn";
import { ListLevelButton } from "./listLevelBtn";
import { GameConstant } from "../../../gameConstant";

export class ListMenu extends Container {
    constructor() {
        super();

        this._create();
    }

    _create() {
        this._initBackground();
        this._initList();
    }

    _initBackground() {
        this.bg = new PureSprite(Texture.from("spr_menu"), new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            useOriginalSize: true,
        }));
        this.addChild(this.bg.displayObject);
    }

    _initList() {
        this._initShopBtn();
        this._initSoundBtn();
        if(GameConstant.SHOW_LIST_LEVEl) {
            this._initListLevelBtn();
        }
    }

    _initShopBtn() {
        this.shopBtn = new PureButton(Texture.from("btn_shop"), () => this._onClickShopBtn(), new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            useOriginalSize: true,
            x : -195,
            y : -105
        }));
        this.addChild(this.shopBtn.displayObject);
    }

    _initSoundBtn(){
        this.soundBtn = new SoundButton();
        this.addChild(this.soundBtn);
    }

    _initListLevelBtn() {
        this.listLevelBtn = new ListLevelButton();
        this.addChild(this.listLevelBtn);
    }

    _onClickShopBtn() {
        this.emit(MenuScreenEvent.ShopSelected)
    }
}