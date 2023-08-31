import { Container, Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";

export class CoinAdded extends Container {
    constructor() {
        super();

        this._create();
    }

    _create() {
        this._initSpr();
    }

    _initSpr() {
        this.spr = new PureSprite(Texture.from("spr_coins_added"), new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            width: 200,
            height: 103,
            y: -120
        }));

        this.addChild(this.spr.displayObject);
    }
}