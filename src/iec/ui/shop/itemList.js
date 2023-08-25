import { ItemState } from "./itemShop";
import { Util } from "../../../helpers/utils";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";
import { ScrollView } from "../../../pureDynamic/core/scollView/scrollView";

export class ItemList extends ScrollView {
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

        GameResizer.registerOnResizedCallback(this.onResize, this);
    }

    onResize() {
        this.lastHeight = GameResizer.height * 0.53;
        this.height = GameResizer.height * 0.53;
        this.resize();
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