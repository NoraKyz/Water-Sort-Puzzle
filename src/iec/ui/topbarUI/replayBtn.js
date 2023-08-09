import { Container, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { LevelEvent } from "../../level/levelEvent";

export class ReplayButton extends Container {
    constructor() {
        super();
        this._create();
    }

    _create() {
        this.btn = new PureButton(Texture.from("spr_replay_level_btn"), () => this._onClickReplayBtn(), new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: -80,
            y: 72,
        }))
        this.addChild(this.btn.displayObject);
    }

    _onClickReplayBtn() {
        this.parent.emit(LevelEvent.Replay);
    }
}