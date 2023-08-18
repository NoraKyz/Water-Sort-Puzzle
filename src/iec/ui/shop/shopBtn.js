import { Container } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";

export class ShopBtn extends Container {
    constructor(texture1, texture2, onClick, pos) {
        super();

        this.texture1 = texture1;
        this.texture2 = texture2;
        this.onClick = onClick;
        this.pos = pos;

        this._create();
    }

    _create() {
        this._initBtn();
        this._initBtnSelected();
    }

    _initBtn() {
        this.btn = new PureButton(this.texture1, this.onClick, new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: this.pos.x,
            y: this.pos.y,
        }));
        this.addChild(this.btn.displayObject);
    }

    _initBtnSelected() {
        this.btnSelected = new PureSprite(this.texture2, new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: this.pos.x,
            y: this.pos.y,
        }));
        this.addChild(this.btnSelected.displayObject);
    }

    onSelected() {
        this.btn.visible = false;
        this.btnSelected.visible = true;
    }

    onUnselected() {
        this.btn.visible = true;
        this.btnSelected.visible = false;
    }
}