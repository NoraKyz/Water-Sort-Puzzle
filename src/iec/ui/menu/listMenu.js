import { Container, Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { MenuScreenEvent } from "../../screens/menuScreen";

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

    _onClickShopBtn() {
        this.emit(MenuScreenEvent.ShopSelected)
    }
}