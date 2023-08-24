import { Container, Texture } from "pixi.js";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { SoundManager } from "../../../soundManager";

export class SoundButton extends Container {
    constructor() {
        super();

        this._create();
        this._initEvents();
    }

    _create() {
        this._soundOn();
        this._soundOff();
    }

    _soundOn() {
        this.btn1 = new PureSprite(
            Texture.from("spr_sound_on"),
            new PureTransform({
                alignment: Alignment.MIDDLE_CENTER,
                useOriginalSize: true,
                x: 0,
                y: -105
            })
        );
        this.addChild(this.btn1.displayObject);
    }

    _soundOff() {
        this.btn2 = new PureSprite(
            Texture.from("spr_sound_off"),
            new PureTransform({
                alignment: Alignment.MIDDLE_CENTER,
                useOriginalSize: true,
                x: 0,
                y: -105
            })
        );
        this.addChild(this.btn2.displayObject);
        this.btn2.visible = false;
    }

    _initEvents() {
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on("pointertap", () => this._onClickSoundBtn());
    }

    _onClickSoundBtn() {
        this.btn1.visible = !this.btn1.visible;
        this.btn2.visible = !this.btn2.visible;

        if (this.btn1.visible) {
            SoundManager.unMuteAll();
        } else {
            SoundManager.muteAll();
        }
    }
}