import { Container, Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { MaintainAspectRatioType } from "../../../pureDynamic/core/pureTransformConfig";

export class FakeBackground extends Container {
    constructor() {
        super();
        this._create();
    }

    _create() {
        this.bg = new PureSprite(Texture.WHITE, new PureTransform({
            usePercent: true,
            height: 1,
            width: 1,
            pivotX: 0.5,
            pivotY: 0.5,
            anchorX: 0.5,
            anchorY: 0.5,
            maintainAspectRatioType: MaintainAspectRatioType.MAX,
        }));
        this.bg.displayObject.eventMode = "static";
        this.bg.displayObject.tint = 0x000000;
        this.bg.displayObject.alpha = 0.9;
        this.addChild(this.bg.displayObject);
    }
}