import { Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { ItemShop } from "./itemShop";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";

export class ThemeItem extends ItemShop {
    constructor(data) {
        super(data);
    }

    _initProperties() {
        super._initProperties();
        this.texture = this.data.bgSprite;
    }

    _initSpr() {
        this.spr = new PureSprite(Texture.from(this.texture), new PureTransform({
            width : 250,
            height: 250,
            x: 10,
            y: 10,
        }));
        this.addChild(this.spr.displayObject);
    }

    _onSelectedItem() {
        super._onSelectedItem();
        
    }
}