import { Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { PureButton } from "../../pureDynamic/PixiWrapper/pureButton";
import { UIScreen } from "../../pureDynamic/PixiWrapper/screen/uiScreen";
import { FakeBackground } from "../ui/utils/fakeBackground";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../pureDynamic/core/pureTransformConfig";
import { ShopName } from "../ui/shop/shopName";
import { CoinInfor } from "../ui/shop/coinInfor";
import { ShopBtn } from "../ui/shop/shopBtn";
import { TubeList } from "../ui/shop/tubeList";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";
import { ThemeList } from "../ui/shop/themeList";
import { DataManager } from "../data/dataManager";
import { UserData } from "../data/userData";

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
        this._initThemeShopList();

        this.resize();
    }

    reset() {
        super.reset();

        this.tubeShopBtn.onSelected();
        this.themeShopBtn.onUnselected();
        this.tubeShopList.show();
        this.themeShopList.hide();
    }

    resize() {
        super.resize();
        let boxWidth = this.tubeShopList.width;
        let scrollX = GameResizer.width / 2 - boxWidth / 2;
        let scrollY = GameResizer.height * 0.25;
        this.themeShopList.resize();
        this.tubeShopList.resize();
        this.tubeShopList.position.set(scrollX, scrollY);
        this.themeShopList.position.set(scrollX, scrollY);
    }

    _initBackground() {
        this.bg = new FakeBackground(1);
        this.addChild(this.bg);
    }

    _initBackBtn() {
        let pTransform = new PureTransform({
            alignment: Alignment.TOP_LEFT,
            usePercent: true,
            maintainAspectRatioType: MaintainAspectRatioType.MIN,
            height: 0.05,
            width: 0.1,
            x: 40,
            y: 30
        });
        let lTransform = new PureTransform({
            alignment: Alignment.TOP_LEFT,
            usePercent: true,
            maintainAspectRatioType: MaintainAspectRatioType.MIN,
            height: 0.07,
            width: 0.1,
            x: 40,
            y: 20
        });
        this.backBtn = new PureButton(
            Texture.from("btn_back"),
            () => this._onClickBackBtn(),
            pTransform,
            lTransform
        );
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
            { x: -180, y: 0 }
        );
        this.addChild(this.tubeShopBtn);
    }

    _initThemeShopBtn() {
        this.themeShopBtn = new ShopBtn(
            Texture.from("btn_theme_shop"),
            Texture.from("btn_theme_shop_selected"),
            () => this._onClickThemeShopBtn(),
            { x: 180, y: 0 }
        );
        this.addChild(this.themeShopBtn);
    }

    _initBuyBtn() {
        this.buyBtn = new PureButton(Texture.from("btn_random_buy"), () => this._onClickBuyBtn(), new PureTransform({
            alignment: Alignment.CUSTOM,
            useOriginalSize: true,
            x: -180,
            anchorX: 0.5,
            pivotX: 0.5,
            anchorY: 0.8,
            pivotY: 0,
        }));
        this.addChild(this.buyBtn.displayObject);
    }

    _initAdsBtn() {
        this.adsBtn = new PureButton(Texture.from("btn_ads_get_coins"), () => this._onClickAdsBtn(), new PureTransform({
            alignment: Alignment.CUSTOM,
            useOriginalSize: true,
            x: 180,
            anchorX: 0.5,
            pivotX: 0.5,
            anchorY: 0.8,
            pivotY: 0,
        }));
        this.addChild(this.adsBtn.displayObject);
    }

    _initTubeShopList() {
        this.tubeShopList = new TubeList();
        this.addChild(this.tubeShopList);
    }

    _initThemeShopList() {
        this.themeShopList = new ThemeList();
        this.addChild(this.themeShopList);
    }

    _onClickBackBtn() {
        this.emit(ShopScreenEvent.BackToScene);
    }

    _onClickTubeShopBtn() {
        this.tubeShopList.show();
        this.themeShopList.hide();
        this.tubeShopBtn.onSelected();
        this.themeShopBtn.onUnselected();
    }

    _onClickThemeShopBtn() {
        this.tubeShopList.hide();
        this.themeShopList.show();
        this.tubeShopBtn.onUnselected();
        this.themeShopBtn.onSelected();
    }

    _onClickBuyBtn() {
        if (UserData.coins < GameConstant.COINS_PER_BUY_RANDOM) {
            return;
        }

        let randomItem = null, currList = null;

        if (this.tubeShopList.visible) {
            currList = this.tubeShopList;
        } else {
            currList = this.themeShopList;
        }

        randomItem = currList.getRandomItem();

        if (randomItem === null) {
            return;
        }

        currList.scrollTo(randomItem.id - 1);
        randomItem.onUnlocked();
        DataManager.unlockSkin(randomItem);
        DataManager.updateCoins(- GameConstant.COINS_PER_BUY_RANDOM)
    }

    _onClickAdsBtn() {
        DataManager.updateCoins(+ GameConstant.COINS_PER_ADS)
    }
}