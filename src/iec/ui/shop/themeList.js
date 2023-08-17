import { ScrollBox } from "@pixi/ui";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";
import { SkinManager } from "../../object/skin/skinManager";
import { ThemeItem } from "./themeItem";

export class ThemeList extends ScrollBox {
    constructor() {
        super({
            width: GameResizer.width,
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
        this.background.alpha = 0;
        this.themeData = SkinManager.ThemeData;
    }

    _initSkinCards() {
        this.themeData.forEach((skin) => {
            let skinCard = new ThemeItem(skin);
            this.addItem(skinCard);
        });
    }
}