import { Container, Texture } from "pixi.js";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { GameConstant } from "../../../gameConstant";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { LevelEvent } from "../../level/levelEvent";
import { DataManager } from "../../data/dataManager";
import { UserData } from "../../data/userData";

export class UndoButton extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initElements();
        this._initEvents();
        this._onInit();
    }

    _initProperties() {

    }

    _initElements() {
        this._initUndoBtn();
        this._initAdsBtn();
    }

    _initUndoBtn() {
        this.undoBtn = new Container();
        this.undoBtn.eventMode = 'static';
        this.undoBtn.cursor = 'pointer';
        this.undoBtn.on("pointertap", () => this._onClickUndoBtn());
        this.addChild(this.undoBtn);

        this.icUndoBtn = new PureSprite(Texture.from("spr_undo_btn"), new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: 120,
            y: 72,
        }));
        this.undoBtn.addChild(this.icUndoBtn.displayObject);

        this.textUndoBtn = new PureText(
            UserData.undoTimes,
            new PureTransform({
                alignment: Alignment.TOP_CENTER,
                useOriginalSize: true,
                x: 145,
                y: 78,
            }),
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 50,
                fontWeight: "bolder"
            });
        this.undoBtn.addChild(this.textUndoBtn.displayObject);
    }

    _initAdsBtn() {
        this.adsBtn = new Container();
        this.adsBtn.eventMode = 'static';
        this.adsBtn.cursor = 'pointer';
        this.adsBtn.on("pointertap", () => this._onClickAdsBtn());
        this.addChild(this.adsBtn);

        this.icAdsBtn = new PureSprite(Texture.from("spr_ads_get_undo_btn"), new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: 120,
            y: 72,
        }));
        this.adsBtn.addChild(this.icAdsBtn.displayObject);

        this.textAdsBtn = new PureText(
            GameConstant.UNDO_NUMBER_GET_BY_ADS.toString(),
            new PureTransform({
                alignment: Alignment.TOP_CENTER,
                useOriginalSize: true,
                x: 160,
                y: 80,
            }),
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 45,
                fontWeight: "bolder"
            });
        this.adsBtn.addChild(this.textAdsBtn.displayObject);
    }

    _initEvents() {
        this.on("unableUndo", () => {      
            this.undoBtn.visible = false;
            this.adsBtn.visible = true;
        });

        this.on("ableUndo", () => {
            this.undoBtn.visible = true;
            this.adsBtn.visible = false;
        });
    }

    _onInit() {
        this._setStateBtn();
    }

    _setStateBtn() {
        this._updateUndoBtn();

        if (UserData.undoTimes > 0) {
            this.emit("ableUndo");         
        } else {
            this.emit("unableUndo");
        }
    }

    _updateUndoBtn() {
        this.textUndoBtn.text = UserData.undoTimes;
    }

    _onClickUndoBtn() {
        this.emit(LevelEvent.Undo);
        this._setStateBtn();
    }

    _onClickAdsBtn() {
        DataManager.updateUndoTimes(+GameConstant.UNDO_NUMBER_GET_BY_ADS);
        this._setStateBtn();
    }
}