import { ThemeItem } from "./themeItem";
import { ItemList } from "./itemList";
import { UserData } from "../../data/userData";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";

export class ThemeList extends ItemList {
    constructor() {
        super(585, GameResizer.height * 0.53);

        this.hide();
    }

    _initProperties() {
        super._initProperties();
        this.background.alpha = 0;
        this.dataList = UserData.listThemeSkin;
    }

    _initSkinCards() {
        this.dataList.forEach((skin) => { 
            let skinCard = new ThemeItem(skin);
            this.itemList.push(skinCard);
            this.addItem(skinCard);
        });
    }
}