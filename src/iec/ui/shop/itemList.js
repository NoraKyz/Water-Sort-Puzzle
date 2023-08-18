import { ScrollBox } from "@pixi/ui";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";
import { SkinManager } from "../../object/skin/skinManager";
import { TubeItem } from "./tubeItem";
import { ItemState } from "./itemShop";
import { Util } from "../../../helpers/utils";

export class ItemList extends ScrollBox {
    constructor() {
        super({
            width: 585, // 585 = (item width + elementsMargin + horPadding / 2) * columns
            height: GameResizer.height * 0.53,
            background: 0xFFFFFF,
            elementsMargin: 20,
            vertPadding: 0,
            horPadding: 10         
        });

        this._initProperties();
        this._initSkinCards();
    }

    _initProperties() {
        
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