import { Container, Sprite, Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../../pureDynamic/core/pureTransformConfig";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";

export class WinUI extends Container {
    constructor() {
        super();
        this._initComponents();
    }

    _initComponents() {
        this._initFakeBackground();
        this._initConcefetti();
        this._initNextButton();
    }

    _initFakeBackground() {
        this.fakeBg = new PureSprite(Texture.WHITE, new PureTransform({
            usePercent: true,
            height: 1,
            width: 1,
            pivotX: 0.5,
            pivotY: 0.5,
            anchorX: 0.5,
            anchorY: 0.5,
            maintainAspectRatioType: MaintainAspectRatioType.MAX,
        }));
        this.fakeBg.displayObject.tint = 0x000000;
        this.fakeBg.displayObject.alpha = 0.5;
        this.addChild(this.fakeBg.displayObject);
    }

    _initConcefetti() {
        this.concefettiBanner = new PureSprite(Texture.from("spr_completed"), new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            useOriginalSize: true,
            y: -80,
        }));
        this.addChild(this.concefettiBanner.displayObject);
    }

    _initNextButton() {
        this.nextButton = new PureButton(this, Texture.from("spr_next_level"), () => {}, new PureTransform({
            alignment: Alignment.BOTTOM_CENTER,
            useOriginalSize: true,
        }));
        this.addChild(this.nextButton.displayObject);
    }

    _onClickNextBtn() {
        this.emit("nextLevel");
    }
}