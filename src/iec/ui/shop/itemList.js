import { ScrollBox } from "@pixi/ui";
import { ItemState } from "./itemShop";
import { Util } from "../../../helpers/utils";

export class ItemList extends ScrollBox {
    constructor(width, height) {
        super({
            width: width, // 585 = (item width + elementsMargin + horPadding / 2) * columns
            height: height,
            background: 0xFFFFFF,
            elementsMargin: 20,
            vertPadding: 0,
            horPadding: 10,
            disableDynamicRendering: true,
        });

        this._initProperties();
        this._initSkinCards();
    }

    _initProperties() {
        this.itemList = [];
    }

    _initSkinCards() {
        
    }

    getRandomItem() {
        let item = null;
        
        let arrRandom = [];
        this.items.forEach((item) => {
            if(item.state == ItemState.Locked){
                arrRandom.push(item);
            }
        });

        if(arrRandom.length > 0){
            item = Util.randomFromList(arrRandom);
        }

        return item;
    }

    show() {
        this.visible = true;
        this.scrollTop();
    }

    hide() {
        this.visible = false;
    }
}