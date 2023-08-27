import { Sprite, Texture } from "pixi.js";
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
        this.spr = new Sprite(Texture.from(this.texture));
        this.spr.position.set(110, 40);
        this.spr.scale.set(0.7);
        this.addChild(this.spr);
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