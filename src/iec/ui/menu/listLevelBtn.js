import { Container, Texture } from "pixi.js";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { MenuScreenEvent } from "../../screens/menuScreen";

export class ListLevelButton extends Container {
    constructor() {
        super();

        this._create();
        this._initEvents();
    }

    _create() {
        this._initSpr();
    }

    _initSpr() {
        this.btn = new PureSprite(
            Texture.from("spr_list_level"),
            new PureTransform({
                alignment: Alignment.MIDDLE_CENTER,
                useOriginalSize: true,
                x: 195,
                y: -105
            })
        );
        this.addChild(this.btn.displayObject);
    }

    _initEvents() {
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on("pointertap", () => this._onClickListLevelBtn());
    }

    _onClickListLevelBtn() {
        this.parent.emit(MenuScreenEvent.ListLevelSelected)
    }
}