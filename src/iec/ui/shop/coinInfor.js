import { Container, Sprite, Texture } from "pixi.js";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
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
        let pTransform = new PureTransform({
            alignment: Alignment.TOP_RIGHT,
            useOriginalSize: true,
            x: -30,
            y: 18
        });
        this.text = new PureText(
            UserData.coins,
            pTransform,
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 45,
                fontWeight: "bolder"
            });
        this.addChild(this.text.displayObject);
    }

    _initCoinIcon() {
        this.ic = new Sprite(Texture.from("spr_coin"));
        this.ic.anchor.set(1, 0);
        this.ic.scale.set(0.75);
        this.ic.x = - this.text.displayObject.width - 20;
        this.ic.y = 7.5;
        this.text.displayObject.addChild(this.ic);
    }

    _initEvents() {
        DataObserver.addObserver(this);
        this.on(EventData.CoinsChanged, () => this.onDataChanged());
    }

    onDataChanged() {
        this.text.text = UserData.coins;  
        this.ic.x = - this.text.displayObject.width - 20;
    }
}