import { Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { ItemShop, ItemType } from "./itemShop";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { EventData } from "../../data/dataObserver";

export class ThemeItem extends ItemShop {
    constructor(data) {
        super(data);
    }

    _initProperties() {
        super._initProperties();
        this.texture = this.data.bgSprite;
        this.type = ItemType.Theme;
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

    _initEvents() {
        super._initEvents();
        this.on(EventData.ThemeUnlocked, () => this._onDataChanged());
        this.on(EventData.ThemeSelected, () => this._onDataChanged());
    }

    _onDataChanged() {
        super._onDataChanged();
    }
}