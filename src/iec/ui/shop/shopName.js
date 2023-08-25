import { Container } from "pixi.js";
import { GameConstant } from "../../../gameConstant";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";

export class ShopName extends Container {
    constructor() {
        super();
        this._create();
    }

    _create(){
        this.shopName = new PureText(
            GameConstant.TUBE_SHOP_NAME,
            new PureTransform({
                alignment: Alignment.CUSTOM,
                useOriginalSize: true,
                anchorX: 0.5,
                anchorY: 0.05,
                pivotX: 0.5,
                pivotY: 0,
            }), {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 65,
                fontWeight: "bolder"
            });
        this.addChild(this.shopName.displayObject);
    }
}