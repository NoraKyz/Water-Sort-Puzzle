import { TubeItem } from "./tubeItem";
import {ItemList } from "./itemList";
import { UserData } from "../../data/userData";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";

export class TubeList extends ItemList {
    constructor() {
        super(585, GameResizer.height * 0.53);
    }

    _initProperties() {
        super._initProperties();
        this.background.alpha = 0;
        this.dataList = UserData.listTubeSkin;
    }

    _initSkinCards() {
        this.dataList.forEach((skin) => {
            let skinCard = new TubeItem(skin);
            this.itemList.push(skinCard);
            this.addItem(skinCard);
        });
    }
}