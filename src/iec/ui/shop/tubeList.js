import { ScrollBox } from "@pixi/ui";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";
import { SkinManager } from "../../object/skin/skinManager";
import { TubeItem } from "./tubeItem";
import { ItemState } from "./itemShop";
import {ItemList } from "./itemList";
import { Util } from "../../../helpers/utils";

export class TubeList extends ItemList {
    constructor() {
        super();
    }

    _initProperties() {
        this.background.alpha = 0;
        this.dataList = SkinManager.tubeData;
    }

    _initSkinCards() {
        this.dataList.forEach((skin) => {
            let skinCard = new TubeItem(skin);
            this.addItem(skinCard);
        });
    }
}