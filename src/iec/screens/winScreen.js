import { Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { PureButton } from "../../pureDynamic/PixiWrapper/pureButton";
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { UIScreen } from "../../pureDynamic/PixiWrapper/screen/uiScreen";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../pureDynamic/core/pureTransformConfig";
import { ButtonManager } from "../ui/buttonManager";
import { LevelEvent } from "../level/levelEvent";
import { FakeBackground } from "../ui/utils/fakeBackground";
import { CoinAdded } from "../ui/win/coinAdded";
import { Tween } from "../../systems/tween/tween"
import { AdsManager, AdsType } from "../../../sdk/adsManager";

export class WinScreen extends UIScreen {
    constructor() {
        super(GameConstant.WIN_SCREEN);

        this.countLevel = 0;
    }

    create() {
        super.create();

        this._initBackground();
        this._initConcefetti();
        this._initNextButton();
        this._initCoinAdded();

        this._initEffects();
    }

    _initBackground() {
        this.bg = new FakeBackground();
        this.addChild(this.bg);
    }

    _initConcefetti() {
        this.concefettiBanner = new PureSprite(Texture.from("spr_completed"), new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            useOriginalSize: true,
            y: -200,
        }));
        this.addChild(this.concefettiBanner.displayObject);
    }

    _initNextButton() {
        this.nextButton = new PureButton(Texture.from("spr_next_level_btn"), () => this._onClickNextBtn(), new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            useOriginalSize: true,
            y: 250
        }));
        ButtonManager.addButton(GameConstant.NEXT_BUTTON, this.nextButton)
        this.addChild(this.nextButton.displayObject);
    }

    _initCoinAdded() {
        this.coinAdded = new CoinAdded();
        this.addChild(this.coinAdded);
    }

    _onClickNextBtn() {
        this.countLevel++;

        if (this.countLevel % 2 == 0) {
            AdsManager.showVideo(AdsType.INTERSTITIAL, () => { }, () => {
                this.emit(LevelEvent.NextLevel);
            });
        } else {
            this.emit(LevelEvent.NextLevel);
        }
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

        this.tweenFadeOut = Tween.createTween(this, { alpha: 0 }, {
            duration: 0.2,
            onComplete: () => {
                super.hide();
            }
        });
    }
}