import { TubeItem } from "./tubeItem";
import {ItemList } from "./itemList";
import { UserData } from "../../data/userData";

export class TubeList extends ItemList {
    constructor() {
        super();
    }

    _initProperties() {
        this.background.alpha = 0;
        this.dataList = UserData.listTubeSkin;
    }

    _initSkinCards() {
        this.dataList.forEach((skin) => {
            let skinCard = new TubeItem(skin);
            this.addItem(skinCard);
        });
    }
}