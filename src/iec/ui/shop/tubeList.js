import { ScrollBox } from "@pixi/ui";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";
import { SkinManager } from "../../object/skin/skinManager";
import { TubeItem } from "./tubeItem";

export class TubeList extends ScrollBox {
    constructor() {
        super({
            width: 585, // 585 = (item width + elementsMargin + horPadding / 2) * 2
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
        this.tubeData = SkinManager.TubeData;
    }

    _initSkinCards() {
        this.tubeData.forEach((skin) => {
            let skinCard = new TubeItem(skin);
            this.addItem(skinCard);
        });
    }
}