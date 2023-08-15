import { Container } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";

export class ItemMenu extends Container {
    constructor(texture, text) {
        super();

        this._initProperties(texture, text);
        this._create();
    }

    _initProperties(texture, text) {
        this.texture = texture;
        this.text = text;
        this.cursor = "pointer";
        this.eventMode = "static";
    }

    _create() {
        this._initIconBtn();
        this._initNameBtn();
    }

    _initIconBtn() {
        this.icon = new PureSprite(this.texture, new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            width: 50,
            height: 50
        }));
        this.addChild(this.icon.displayObject);
    }

    _initNameBtn() {
        this.nameBtn = new PureText(
            this.text,
            new PureTransform({
                alignment: Alignment.MIDDLE_CENTER,
                useOriginalSize: true,
                x: 100,
            }),
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 45,
                fontWeight: "bolder"
            });
        this.addChild(this.nameBtn.displayObject);
    }
}