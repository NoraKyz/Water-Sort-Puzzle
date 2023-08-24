import { Container, Texture } from "pixi.js";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { LevelEvent } from "../../level/levelEvent";

export class SpeedButton extends Container {
    constructor() {
        super(); 

        this._create();
        this._initEvents();
    }

    _create() {
        this._initSpeed1();
        this._initSpeed2();
    }

    _initSpeed1() {
        this.btn1 = new PureSprite(
            Texture.from("spr_btn_speed_1"),
            new PureTransform({
                alignment: Alignment.TOP_CENTER,
                useOriginalSize: true,
                x: 280,
                y: 200
            })
        );
        this.addChild(this.btn1.displayObject);
    }

    _initSpeed2() {
        this.btn2 = new PureSprite(
            Texture.from("spr_btn_speed_2"),
            new PureTransform({
                alignment: Alignment.TOP_CENTER,
                useOriginalSize: true,
                x: 280,
                y: 200
            })
        );
        this.addChild(this.btn2.displayObject);
        this.btn2.visible = false;
    }

    _initEvents() {
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on("pointertap", () => this._onClickSpeedBtn());
    }

    _onClickSpeedBtn() {
        this.btn1.visible = !this.btn1.visible;
        this.btn2.visible = !this.btn2.visible;

        if(this.btn1.visible) {
            this.parent.emit(LevelEvent.SpeedDown);
        } else {
            this.parent.emit(LevelEvent.SpeedUp);
        }
    }
}