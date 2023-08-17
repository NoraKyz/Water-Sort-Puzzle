import { Container, Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";

export const ItemState = Object.freeze({
    Locked: "locked",
    Unlocked: "unlocked",
    Selected: "selected",
});

export class ItemShop extends Container {
    constructor(data) {
        super();

        this.data = data;

        this._initProperties();
        this._create();
    }

    _initProperties() {
        this.id = this.data.id;
        this.state = this.data.state;
    }

    _create() {
        this._initLockedCard();
        this._initUnlockedCard();
        this._initSelectedCard();
        this._initSpr();
        this._initEvents();
        this._setState(this.state);
    }

    _initLockedCard() {
        this.lockedCard = new PureSprite(Texture.from("spr_item_locked"), new PureTransform({
            useOriginalSize: true,
        }));
        this.addChild(this.lockedCard.displayObject);
    }

    _initUnlockedCard() {
        this.unlockedCard = new PureButton(Texture.from("spr_item_unlocked"), () => this._onSelectedItem(), new PureTransform({
            useOriginalSize: true,
        }));
        this.addChild(this.unlockedCard.displayObject);
    }

    _initSelectedCard() {
        this.selectedCard = new PureSprite(Texture.from("spr_item_selected"), new PureTransform({
            useOriginalSize: true,
        }));
        this.addChild(this.selectedCard.displayObject);
    }

    _initSpr() {
        this.spr = new PureSprite(Texture.from(this.texture), new PureTransform({
            useOriginalSize: true,
            x: 100,
            y: 40
        }));
        this.spr.displayObject.scale.set(0.6);
        this.addChild(this.spr.displayObject);
    }

    _initEvents() {
        this.on(ItemState.Locked, () => {
            this.unlockedCard.visible = false;
            this.selectedCard.visible = false;
            this.lockedCard.visible = true;
            this.spr.visible = false;
        });
        this.on(ItemState.Unlocked, () => {
            this.lockedCard.visible = false;          
            this.selectedCard.visible = false;
            this.unlockedCard.visible = true;
            this.spr.visible = true;
        });
        this.on(ItemState.Selected, () => {
            this.unlockedCard.visible = false;
            this.lockedCard.visible = false;
            this.selectedCard.visible = true;
            this.spr.visible = true;
        });
    }

    _setState(state) {
        this.state = state;
        this.emit(state);
    }

    _onSelectedItem() {
        this.setState(ItemState.Selected);
    }
}