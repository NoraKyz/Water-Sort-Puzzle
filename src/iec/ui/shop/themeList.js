import { ThemeItem } from "./themeItem";
import { ItemList } from "./itemList";
import { UserData } from "../../data/userData";

export class ThemeList extends ItemList {
    constructor() {
        super();

        this.hide();
    }

    _initProperties() {
        this.background.alpha = 0;
        this.dataList = UserData.listThemeSkin;
    }

    _initSkinCards() {
        this.dataList.forEach((skin) => { 
            let skinCard = new ThemeItem(skin);
            this.addItem(skinCard);
        });
    }
}