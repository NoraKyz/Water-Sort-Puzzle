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

export class WinScreen extends UIScreen {
    constructor() {
        super(GameConstant.WIN_SCREEN);
    }

    create() {
        super.create();

        this._initBackground();
        this._initConcefetti();
        this._initNextButton();
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

    _onClickNextBtn() {
        this.emit(LevelEvent.NextLevel);
    }
}