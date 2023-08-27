import { Container, Texture } from "pixi.js";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { LevelEvent } from "../../level/levelEvent";

export class SpeedButton extends Container {
    constructor() {
        super(); 

        this._initProperties();
        this._create();
        this._initEvents();      
    }

    _initProperties() {
        this.pTransform = new PureTransform({
            alignment: Alignment.TOP_CENTER,
            usePercent: true,
            maintainAspectRatioType: MaintainAspectRatioType.MIN,
            height: 0.12,
            width: 0.14,
            x: 280,
            y: 120
        });

        this.lTransform = new PureTransform({
            alignment: Alignment.TOP_CENTER,
            usePercent: true,
            maintainAspectRatioType: MaintainAspectRatioType.MIN,
            height: 0.06,
            width: 0.12,
            x: 280,
            y: 200
        });
    }

    _create() {
        this._initSpeed1();
        this._initSpeed2();
    }

    _initSpeed1() {
        this.btn1 = new PureSprite(
            Texture.from("spr_btn_speed_1"),
            this.pTransform,
            this.lTransform
        );
        this.addChild(this.btn1.displayObject);
    }

    _initSpeed2() {
        this.btn2 = new PureSprite(
            Texture.from("spr_btn_speed_2"),
            this.pTransform,
            this.lTransform
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