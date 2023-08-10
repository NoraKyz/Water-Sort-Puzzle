import { Container, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Data } from "../../../../src/dataTest";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";

export class AddTubeButton extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
        this._initEvents();
        this._onInit();
    }

    _initProperties() {
        
    }

    _initComponents() {
        this._initAddBtn();
        this._initAdsBtn();
    }

    _initAddBtn() {
        this.addBtn = new Container();
        this.addChild(this.addBtn);

        this.icAddBtn = new PureButton(Texture.from("spr_add_tube_btn"), () => { }, new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: 260,
            y: 72,
        }));
        this.addBtn.addChild(this.icAddBtn.displayObject);

        this.textAddTubeBtn = new PureText(
            Data.addTubeTimes.toString(),
            new PureTransform({
                alignment: Alignment.TOP_CENTER,
                useOriginalSize: true,
                x: 285,
                y: 78,
            }),
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 50,
                fontWeight: "bolder"
            });
        this.addBtn.addChild(this.textAddTubeBtn.displayObject);
    }

    _initAdsBtn() {
        this.adsBtn = new PureButton(Texture.from("spr_ads_get_tube_btn"), () => { }, new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: 260,
            y: 72,
        }));
        this.addChild(this.adsBtn.displayObject);
    }

    _initEvents() {
        this.on("unableAddTube", () => {
            this.addBtn.visible = false;
            this.adsBtn.visible = true;
        });

        this.on("ableAddTube", () => {
            this.addBtn.visible = true;
            this.adsBtn.visible = false;
        });
    }

    _onInit() {
        if (Data.addTubeTimes > 0) {
            this.emit("ableAddTube");
        } else {
            this.emit("unableAddTube");
        }
    }
}