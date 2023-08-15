import { Container, Rectangle, Texture } from "pixi.js";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { FakeBackground } from "../utils/fakeBackground";

export class ItemMenu extends Container {
    constructor(texture, text, onClick) {
        super();

        this._initProperties(texture, text, onClick);
        this._create();
    }

    _initProperties(texture, text, onClick) {
        this.texture = texture;
        this.text = text;
        this.cursor = "pointer";
        this.eventMode = "static";
        this.on("pointertap", () => onClick);
    }

    _create() {
        this._initBackground();
        this._initIconBtn();
        this._initNameBtn();
    }

    _initBackground() {
        this.bg = new PureSprite(Texture.WHITE, new PureTransform({
            alignment: Alignment.MIDDLE_CENTER,
            width: 192, 
            height: 173,
            x: -2,
            y: 25
        }));
        this.bg.displayObject.alpha = 0;
        this.addChild(this.bg.displayObject);
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
                y: 60,
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