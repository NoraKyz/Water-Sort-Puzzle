import { Container, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Data } from "../../../../src/dataTest";

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
        this.addBtn = new PureButton(Texture.from("spr_add_tube_btn"), () => { }, new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: 260,
            y: 72,
        }));
        this.addChild(this.addBtn.displayObject);
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
            this.addBtn.displayObject.visible = false;
            this.adsBtn.displayObject.visible = true;
        });

        this.on("ableAddTube", () => {
            this.addBtn.displayObject.visible = true;
            this.adsBtn.displayObject.visible = false;
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