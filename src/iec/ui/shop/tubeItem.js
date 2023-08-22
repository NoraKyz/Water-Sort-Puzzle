import { Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { ItemShop, ItemType } from "./itemShop";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";

export class TubeItem extends ItemShop {
    constructor(data) {
        super(data);
    }

    _initProperties() {
        super._initProperties();
        this.texture = this.data.tubeSprite;
        this.type = ItemType.Tube;
    }

    _initSpr() {
        this.spr = new PureSprite(Texture.from(this.texture), new PureTransform({
            useOriginalSize: true,
            x: 105,
            y: 40
        }));
        this.spr.displayObject.scale.set(0.6);
        this.addChild(this.spr.displayObject);     
    }

    _onSelectedItem() {
          
    }
}