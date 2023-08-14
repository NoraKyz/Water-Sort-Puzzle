import { Container, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Data } from "../../../dataTest";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { LevelEvent } from "../../level/levelEvent";
import { GameConstant } from "../../../gameConstant";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";

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
        this.addBtn.eventMode = 'static';
        this.addBtn.cursor = 'pointer';
        this.addBtn.on("pointertap", () => this._onClickAddBtn());
        this.addChild(this.addBtn);

        this.icAddBtn = new PureSprite(Texture.from("spr_add_tube_btn"), new PureTransform({
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
        this.adsBtn = new PureSprite(Texture.from("spr_ads_get_tube_btn"), new PureTransform({
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
        this._setStateBtn();
    }

    _setStateBtn(){
        this._updateAddBtn();
        
        if (Data.addTubeTimes > 0) {
            this.emit("ableAddTube");      
        } else {
            this.emit("unableAddTube");
        }
    }

    _updateAddBtn() {
        this.textAddTubeBtn.text = Data.addTubeTimes.toString();
    }

    _onClickAddBtn() {
        this.parent.emit(LevelEvent.AddTube);
        this._setStateBtn();
    }

    _onClickAdsBtn() {
        Data.addTubeTimes += GameConstant.TUBE_NUMBER_GET_BY_ADS;
        this._setStateBtn();
    }
}