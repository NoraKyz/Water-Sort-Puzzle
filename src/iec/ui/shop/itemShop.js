import { Container, Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { DataManager, DataManagerEvent } from "../../data/dataManager";
import { DataObserver, EventData } from "../../data/dataObserver";

export const ItemState = Object.freeze({
    Locked: "locked",
    Unlocked: "unlocked",
    Selected: "selected",
});

export const ItemType = Object.freeze({
    Tube: "Tube",
    Theme: "Theme",
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

        if(this.state !== ItemState.Locked) {
            this.onUnlocked();
        }
    }

    _create() {
        this._initLockedCard();
        this._initUnlockedCard();    
        this._initSpr();
        this._initSelectedCard();
        this._initEvents();

        this.emit(this.state);
    }

    _initLockedCard() {
        this.lockedCard = new PureSprite(Texture.from("spr_item_locked"), new PureTransform({
            useOriginalSize: true,
        }));
        this.addChild(this.lockedCard.displayObject);
    }

    _initUnlockedCard() {
        this.unlockedCard = new PureSprite(Texture.from("spr_item_unlocked"), new PureTransform({
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
        // TODO: continue when extend this class
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

        DataObserver.addObserver(this);
    }

    onUnlocked() {
        this.on("pointertap", () => this._onSelectedItem());
        this.eventMode = "static";
        this.cursor = "pointer";
    }

    _onSelectedItem() {
        DataManager.skinSelected(this);
    }

    _onDataChanged() {
        this.state = this.data.state;
        this.emit(this.state);
    }
}