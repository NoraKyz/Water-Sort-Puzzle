import { Container, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Data } from "../../../../src/dataTest";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { LevelEvent } from "../../level/levelEvent";
import { GameConstant } from "../../../gameConstant";

export class UndoButton extends Container {
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
        this._initUndoBtn();
        this._initAdsBtn();
        this._initText();
    }

    _initUndoBtn() {
        this.undoBtn = new PureButton(Texture.from("spr_undo_btn"), () => this._onClickUndoBtn(), new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: 90,
            y: 72,
        }));
        this.addChild(this.undoBtn.displayObject);
    }

    _initAdsBtn() {
        this.adsBtn = new PureButton(Texture.from("spr_ads_get_undo_btn"), () => { }, new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: 90,
            y: 72,
        }));
        this.addChild(this.adsBtn.displayObject);
    }

    _initText() {
        this.textUndoBtn = new PureText(
            Data.undoTimes.toString(),
            new PureTransform({
                alignment: Alignment.TOP_CENTER,
                useOriginalSize: true,
                x: 130,
                y: 78,
            }),
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 50,
                fontWeight: "bolder"
            });
        this.addChild(this.textUndoBtn.displayObject);
    }

    _initEvents() {
        this.on("unableUndo", () => {
            this.undoBtn.visible = false;
            this.adsBtn.visible = true;
            this._setText(GameConstant.UNDO_NUMBER_GET_BY_ADS.toString());         
        });

        this.on("ableUndo", () => {
            this.undoBtn.visible = true;
            this.adsBtn.visible = false;
            this._setText(Data.undoTimes.toString());
        });
    }

    _onInit() {
        this._setStateBtn();
    }

    _setStateBtn() {
        if (Data.undoTimes > 0) {
            this.emit("ableUndo");
            
        } else {
            this.emit("unableUndo");       
        }
    }

    _setText(text) {
        this.textUndoBtn.text = text;
    }

    _onClickUndoBtn() {
        this.parent.emit(LevelEvent.Undo);
        this._setStateBtn();
    }
}