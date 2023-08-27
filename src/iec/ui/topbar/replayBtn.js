import { Container, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { Alignment, MaintainAspectRatioType } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { LevelEvent } from "../../level/levelEvent";

export class ReplayButton extends Container {
    constructor() {
        super();
        this._create();
    }

    _create() {
        let pTransform = new PureTransform({
            alignment: Alignment.TOP_CENTER,
            usePercent: true,
            maintainAspectRatioType: MaintainAspectRatioType.MIN,
            height: 0.12,
            width: 0.14,
            x: -120,
            y: 40,
        });
        let lTransform = new PureTransform({
            alignment: Alignment.TOP_CENTER,
            usePercent: true,
            maintainAspectRatioType: MaintainAspectRatioType.MIN,
            height: 0.06,
            width: 0.12,
            x: -120,
            y: 70
        });

        this.btn = new PureButton(
            Texture.from("spr_replay_level_btn"), 
            () => this._onClickReplayBtn(), 
            pTransform,
            lTransform
        );
        this.addChild(this.btn.displayObject);
    }

    _onClickReplayBtn() {
        this.emit(LevelEvent.Replay);
    }
}