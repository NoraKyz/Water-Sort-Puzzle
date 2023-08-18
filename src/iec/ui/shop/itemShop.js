import { Container, Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { SkinManager } from "../../object/skin/skinManager";

export const ItemState = Object.freeze({
    Locked: "locked",
    Unlocked: "unlocked",
    Selected: "selected",
});

export const ItemType = Object.freeze({
    Tube: "tube",
    Theme: "theme",
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
        SkinManager.addObserver(this);

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
        this.setState(this.state);
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

        this.on("dataChange", () => {
            this.setState(this.data.state);
        });
    }



    setState(state) {
        this.state = state;
        this.emit(state);
    }

    onUnlocked() {
        this.on("pointertap", () => this._onSelectedItem());
        this.eventMode = "static";
        this.cursor = "pointer";
    }

    _onSelectedItem() {
        SkinManager.set(this);
    }
}