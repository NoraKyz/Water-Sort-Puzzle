import { Container, Texture } from "pixi.js";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { DataObserver, EventData } from "../../data/dataObserver";
import { UserData } from "../../data/userData";

export class CoinInfor extends Container {
    constructor() {
        super();
        this._create();
    }

    _create() {     
        this._initText();
        this._initCoinIcon();
        this._initEvents();
    }

    _initText() {
        this.text = new PureText(
            UserData.coins,
            new PureTransform({
                alignment: Alignment.TOP_RIGHT,
                useOriginalSize: true,
                x: -30,
                y: 40
            }),
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 60,
                fontWeight: "bolder"
            });
        this.addChild(this.text.displayObject);
    }

    _initCoinIcon() {
        this.ic = new PureSprite(Texture.from("spr_coin"), new PureTransform({
            alignment: Alignment.TOP_RIGHT,
            useOriginalSize: true,
            x: -this.text.displayObject.width * 1.1 - 30 ,
            y: 48
        }));
        this.addChild(this.ic.displayObject);
    }

    _initEvents() {
        DataObserver.addObserver(this);
        this.on(EventData.CoinsChanged, () => this.onDataChanged());
    }

    onDataChanged() {
        this.text.text = UserData.coins;
    }
}