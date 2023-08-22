import { Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { ItemShop, ItemType } from "./itemShop";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { EventData } from "../../data/dataObserver";

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

    _initEvents() {
        super._initEvents();
        this.on(EventData.TubeUnlocked, () => this._onDataChanged());
        this.on(EventData.TubeSelected, () => this._onDataChanged());
    }

    _onDataChanged() {
        super._onDataChanged();
    }
}