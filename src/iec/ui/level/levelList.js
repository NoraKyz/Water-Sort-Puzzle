import { GameResizer } from "../../../pureDynamic/systems/gameResizer";
import { ScrollView } from "../../../pureDynamic/core/scollView/scrollView";
import { LevelItem } from "./levelItem";
import { LevelScreenEvent } from "../../screens/levelScreen";

export class LevelList extends ScrollView {
    constructor(width, height) {
        super({
            width: width, // 585 = (item width + elementsMargin + horPadding / 2) * columns
            height: height,
            background: 0xFFFFFF,
            elementsMargin: 20,
            vertPadding: 0,
            horPadding: 40,
            disableDynamicRendering: true,
        });
        this._initCards();

        GameResizer.registerOnResizedCallback(this.onResize, this);
    }

    onResize() {
        this.lastHeight = GameResizer.height * 0.53;
        this.height = GameResizer.height * 0.53;
        this.resize();
    }

    _initCards() {
        for(let i = 1; i <= 500; i++) {
            let levelCard = new LevelItem(i);
            this.addItem(levelCard);
        }
    }

    show() {
        this.visible = true;
        this.scrollTop();
    }

    hide() {
        this.visible = false;
    }
}