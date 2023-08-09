import { Container, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Data } from "../../../../src/dataTest";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { LevelEvent } from "../../level/levelEvent";

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
    }

    _initUndoBtn() {
        this.undoBtn = new Container();
        this.addChild(this.undoBtn);

        this.icUndoBtn = new PureButton(Texture.from("spr_undo_btn"), () => this._onClickUndoBtn(), new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: 90,
            y: 72,
        }));
        this.undoBtn.addChild(this.icUndoBtn.displayObject);

        this.textUndoBtn = new PureText(
            Data.undoTimes.toString(),
            new PureTransform({
                alignment: Alignment.TOP_CENTER,
                useOriginalSize: true,
                x: 115,
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
        this.adsBtn = new PureButton(Texture.from("spr_ads_get_undo_btn"), () => { }, new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: 90,
            y: 72,
        }));
        this.addChild(this.adsBtn.displayObject);
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
        if (Data.undoTimes > 0) {
            this.emit("ableUndo");
            this._updateUndoBtn();
        } else {
            this.emit("unableUndo");
        }
    }

    _updateUndoBtn() {
        this.textUndoBtn.text = Data.undoTimes.toString();
    }

    _onClickUndoBtn() {
        this.parent.emit(LevelEvent.Undo);
        this._setStateBtn();
    }
}