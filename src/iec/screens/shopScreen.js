import { Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { PureButton } from "../../pureDynamic/PixiWrapper/pureButton";
import { UIScreen } from "../../pureDynamic/PixiWrapper/screen/uiScreen";
import { FakeBackground } from "../ui/utils/fakeBackground";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment } from "../../pureDynamic/core/pureTransformConfig";
import { ShopName } from "../ui/shop/shopName";
import { CoinInfor } from "../ui/shop/coinInfor";
import { ShopBtn } from "../ui/shop/shopBtn";
import { Data, DataType } from "../../dataTest";
import { TubeList } from "../ui/shop/tubeList";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
export const ShopScreenEvent = Object.freeze({
    BackToScene: "backToScene",
});

export class ShopScreen extends UIScreen {
    constructor() {
        super(GameConstant.SHOP_SCREEN);
    }

    create() {
        super.create();

        this._initBackground();
        this._initBackBtn();
        this._initShopName();
        this._initCoinInfor();
        this._initTubeShopBtn();
        this._initThemeShopBtn();
        this._initBuyBtn();
        this._initAdsBtn();
        this._initTubeShopList();
        this.resize();
    }

    reset() {
        super.reset();

        this.tubeShopBtn.onSelected();
        this.themeShopBtn.onUnselected();
    }

    resize() {
        super.resize();
        let boxWidth = this.tubeShopList.width;
        let scrollX = GameResizer.width / 2 - boxWidth / 2;
        let scrollY = GameResizer.height * 0.26;
        this.tubeShopList.resize();
        this.tubeShopList.position.set(scrollX, scrollY);
    }

    _initBackground() {
        this.bg = new FakeBackground(1);
        this.addChild(this.bg);
    }

    _initBackBtn() {
        this.backBtn = new PureButton(
            Texture.from("btn_back"),
            () => this._onClickBackBtn(),
            new PureTransform({
                alignment: Alignment.TOP_LEFT,
                useOriginalSize: true,
                x: 40,
                y: 40
            }));
        this.addChild(this.backBtn.displayObject);
    }

    _initShopName() {
        this.shopName = new ShopName();
        this.addChild(this.shopName);
    }

    _initCoinInfor() {
        this.coinInfor = new CoinInfor();
        this.addChild(this.coinInfor);
    }

    _initTubeShopBtn() {
        this.tubeShopBtn = new ShopBtn(
            Texture.from("btn_tube_shop"),
            Texture.from("btn_tube_shop_selected"),
            () => this._onClickTubeShopBtn(),
        );
        this.tubeShopBtn.position.set(-180, -360);
        this.addChild(this.tubeShopBtn);
    }

    _initThemeShopBtn() {
        this.themeShopBtn = new ShopBtn(
            Texture.from("btn_theme_shop"),
            Texture.from("btn_theme_shop_selected"),
            () => this._onClickThemeShopBtn(),
        );
        this.themeShopBtn.position.set(180, -360);
        this.addChild(this.themeShopBtn);
    }

    _initBuyBtn() {
        this.buyBtn = new PureButton(Texture.from("btn_random_buy"), () => this._onClickBuyBtn(), new PureTransform({
            alignment: Alignment.BOTTOM_CENTER,
            useOriginalSize: true,
            x: -180,
            y: -160,
        }));
        this.addChild(this.buyBtn.displayObject);
    }

    _initAdsBtn() {
        this.adsBtn = new PureButton(Texture.from("btn_ads_get_coins"), () => this._onClickAdsBtn(), new PureTransform({
            alignment: Alignment.BOTTOM_CENTER,
            useOriginalSize: true,
            x: 180,
            y: -160,
        }));
        this.addChild(this.adsBtn.displayObject);
    }

    _initTubeShopList() {
        this.tubeShopList = new TubeList();
        this.addChild(this.tubeShopList);
    }

    _onClickBackBtn() {
        this.emit(ShopScreenEvent.BackToScene);
    }

    _onClickTubeShopBtn() {
        this.tubeShopBtn.onSelected();
        this.themeShopBtn.onUnselected();
    }

    _onClickThemeShopBtn() {
        this.tubeShopBtn.onUnselected();
        this.themeShopBtn.onSelected();
    }

    _onClickBuyBtn() {
        Data.change(DataType.Coin, -GameConstant.COINS_PER_BUY_RANDOM);
    }

    _onClickAdsBtn() { 
        Data.change(DataType.Coin, GameConstant.COINS_PER_ADS);
    }
}