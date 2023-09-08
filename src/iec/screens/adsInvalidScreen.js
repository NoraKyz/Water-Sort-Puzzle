import { Container, Sprite, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { UIScreen } from "../../pureDynamic/PixiWrapper/screen/uiScreen";
import { FakeBackground } from "../ui/utils/fakeBackground";
import { Tween } from "../../systems/tween/tween"
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment } from "../../pureDynamic/core/pureTransformConfig";


export class AdsInvalidScreen extends UIScreen {
    constructor() {
        super(GameConstant.ADS_INVALID_SCREEN);
    }

    create() {
        super.create();

        this._initBackground();
        this._initNotify();

        this._initEffects();
    }

    _initBackground() {
        this.bg = new FakeBackground(0);
        this.addChild(this.bg);
    }

    _initNotify() {
        this.notifyBg = new PureSprite(Texture.from("ads_invalid_bg"), new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            useOriginalSize: true,
        }));
        this.notifyBg.displayObject.alpha = 0.8;
        this.addChild(this.notifyBg.displayObject);

        this.notifyText = new Sprite(Texture.from("ads_invalid_text"));
        this.notifyText.anchor.set(0.5);
        this.notifyBg.displayObject.addChild(this.notifyText);
    }

    show() {
        super.show();
        this.tweenFadeIn.start();
    }

    hide() {
        this.tweenFadeOut.start();
    }

    _initEffects() {
        this.notifyBg.displayObject.scale.set(0);

        this.tweenFadeIn = Tween.createCountTween({
            duration: 0.2,
            onUpdate: (target) => {
                this.notifyBg.displayObject.scale.set(target.percent);
            },
            onComplete: () => {
                this.tweenDelay.start();
            }
        });

        this.tweenDelay = Tween.createCountTween({
            duration: 1,
            onComplete: () => {
                this.tweenFadeOut.start();
            }
        });

        this.tweenFadeOut = Tween.createCountTween({
            duration: 0.2,
            onUpdate: (target) => {
                this.notifyBg.displayObject.scale.set(1 - target.percent);
            },
            onComplete: () => {
                super.hide();
            }
        });
    }
}