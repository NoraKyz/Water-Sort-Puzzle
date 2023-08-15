import { Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { PureButton } from "../../pureDynamic/PixiWrapper/pureButton";
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { UIScreen } from "../../pureDynamic/PixiWrapper/screen/uiScreen";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../pureDynamic/core/pureTransformConfig";
import { ButtonManager } from "../ui/buttonManager";
import { LevelEvent } from "../level/levelEvent";

export class WinScreen extends UIScreen {
    constructor() {
        super(GameConstant.WIN_SCREEN);
    }

    create() {
        super.create();

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
        this.fakeBg.displayObject.alpha = 0.7;
        this.addChild(this.fakeBg.displayObject);
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

    _onClickNextBtn() {
        this.emit(LevelEvent.NextLevel);
    }
}