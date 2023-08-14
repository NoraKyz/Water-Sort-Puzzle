import { Container, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";

export class MenuButton extends Container {
    constructor() {
        super();
        this._create();
    }

    _create() {
        this.btn = new PureButton(Texture.from("spr_menu_btn"), () => { }, new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: -250,
            y: 72,
        }))
        this.addChild(this.btn.displayObject);
    }
}