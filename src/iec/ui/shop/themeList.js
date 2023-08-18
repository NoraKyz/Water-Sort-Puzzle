import { ScrollBox } from "@pixi/ui";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";
import { SkinManager } from "../../object/skin/skinManager";
import { ThemeItem } from "./themeItem";
import { ItemState } from "./itemShop";
import { Util } from "../../../helpers/utils";
import { ItemList } from "./itemList";

export class ThemeList extends ItemList {
    constructor() {
        super();

        this.hide();
    }

    _initProperties() {
        this.background.alpha = 0;
        this.dataList = SkinManager.themeData;
    }

    _initSkinCards() {
        this.dataList.forEach((skin) => {
            let skinCard = new ThemeItem(skin);
            this.addItem(skinCard);
        });
    }
}