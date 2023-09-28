import { Container, Texture } from "pixi.js";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment, MaintainAspectRatioType } from "../../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { LevelEvent } from "../../level/levelEvent";
import { AdsManager, AdsType } from "../../../../sdk/adsManager";
import { ButtonManager } from "../buttonManager";
import { Tween } from "../../../systems/tween/tween";

export class HintButton extends Container {
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
            x: -280,
            y: 120
        });

        this.lTransform = new PureTransform({
            alignment: Alignment.TOP_CENTER,
            usePercent: true,
            maintainAspectRatioType: MaintainAspectRatioType.MIN,
            height: 0.06,
            width: 0.12,
            x: -280,
            y: 200
        });
    }

    _create() {
        this._initSpr();
    }

    _initSpr() {
        this.btn1 = new PureSprite(
            Texture.from("spr_ads_get_hints_btn"),
            this.pTransform,
            this.lTransform
        );
        this.addChild(this.btn1.displayObject);
    }

    _initEvents() {
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on("pointertap", () => this._onClickHintBtn());
    }

    _onClickHintBtn() {
        ButtonManager.enableAllAfterDelay(1);
        AdsManager.showVideo(
            AdsType.REWARDED,
            () => {
                ButtonManager.enableAll();
            },
            () => {
                this.emit(LevelEvent.Hint);
            },
            () => {
                ButtonManager.enableAll();
            }
        );
    }
}