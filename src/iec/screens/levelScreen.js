import { Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant"
import { UIScreen } from "../../pureDynamic/PixiWrapper/screen/uiScreen"
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../pureDynamic/core/pureTransformConfig";
import { PureButton } from "../../pureDynamic/PixiWrapper/pureButton";
import { FakeBackground } from "../ui/utils/fakeBackground";
import { Tween } from "../../systems/tween/tween";
import { LevelList } from "../ui/level/levelList";
import { GameResizer } from "../../pureDynamic/systems/gameResizer";

export const LevelScreenEvent = Object.freeze({
    Close: "Close",
    LevelSelected: "LevelSelected"
});

export class LevelScreen extends UIScreen {
    constructor() {
        super(GameConstant.LEVEL_SCREEN);
    }

    create() {
        super.create();

        this._initBackground();
        this._initListLevel();
        this._initCloseBtn();

        this._initEffects();
        this.resize();
    }

    resize() {
        super.resize();
        let boxWidth = this.listLevel.width;
        let scrollX = GameResizer.width / 2 - boxWidth / 2;
        let scrollY = GameResizer.height * 0.25;
        this.listLevel.resize();
        this.listLevel.position.set(scrollX, scrollY);
    }

    _initBackground() {
        this.bg = new FakeBackground();
        this.addChild(this.bg);
    }

    _initListLevel() {
        this.listLevel = new LevelList(600, GameResizer.height * 0.53);
        this.addChild(this.listLevel);
    }
    
    _initCloseBtn() {
        this.closeBtn = new PureButton(Texture.from("btn_close"), () => this._onCloseMenu(), new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            x: 300,
            y: -320,
            uuseOriginalSize: true,
        }));
        this.addChild(this.closeBtn.displayObject);
    }

    _onCloseMenu() {
        this.emit(LevelScreenEvent.Close);
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

        this.tweenFadeOut = Tween.createTween(this, { alpha: 0  }, {
            duration: 0.2,
            onComplete: () => {
                super.hide();
            }
        });
    }
}