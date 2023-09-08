import { Container, Text, Texture } from "pixi.js";
import { Alignment, MaintainAspectRatioType } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { GameConstant } from "../../../gameConstant";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { LevelEvent } from "../../level/levelEvent";
import { DataManager } from "../../data/dataManager";
import { UserData } from "../../data/userData";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { AdsManager, AdsType } from "../../../../sdk/adsManager";
import { ButtonManager } from "../buttonManager";

export class UndoButton extends Container {
    constructor() {
        super();

        this._initProperties();
        this._initElements();
        this._initEvents();
        this._onInit();
    }

    _initProperties() {
        this.pTransform = new PureTransform({
            alignment: Alignment.TOP_CENTER,
            usePercent: true,
            maintainAspectRatioType: MaintainAspectRatioType.MIN,
            height: 0.12,
            width: 0.14,
            x: 120,
            y: 40,
        });

        this.lTransform = new PureTransform({
            alignment: Alignment.TOP_CENTER,
            usePercent: true,
            maintainAspectRatioType: MaintainAspectRatioType.MIN,
            height: 0.06,
            width: 0.12,
            x: 120,
            y: 70,
        });
    }

    _initElements() {
        this._initUndoBtn();
        this._initAdsBtn();
    }

    _initUndoBtn() {
        this.undoBtn = new PureButton(
            Texture.from("spr_undo_btn"),
            () => this._onClickUndoBtn(),
            this.pTransform,
            this.lTransform
        );
        this.addChild(this.undoBtn.displayObject);

        this.textUndoBtn = new Text(
            UserData.undoTimes,
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 50,
                fontWeight: "bolder"
            });
        this.textUndoBtn.position.set(this.undoBtn.displayObject.width * 0.2, 10);
        this.undoBtn.displayObject.addChild(this.textUndoBtn);
    }

    _initAdsBtn() {
        this.adsBtn = new PureButton(
            Texture.from("spr_ads_get_undo_btn"),
            () => this._onClickAdsBtn(),
            this.pTransform,
            this.lTransform
        );
        this.addChild(this.adsBtn.displayObject);

        this.textAdsBtn = new Text(
            GameConstant.UNDO_NUMBER_GET_BY_ADS.toString(),
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 45,
                fontWeight: "bolder"
            });
        this.textAdsBtn.position.set(this.adsBtn.displayObject.width * 0.25, 8);
        this.adsBtn.displayObject.addChild(this.textAdsBtn);
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
        ButtonManager.disableAll();
        AdsManager.showVideo(
            AdsType.REWARDED,
            () => {
                ButtonManager.enableAll();
            },
            () => {
                DataManager.updateUndoTimes(+GameConstant.UNDO_NUMBER_GET_BY_ADS);
                this._setStateBtn();
            },
            () => {
                ButtonManager.enableAll();
            }
        )
    }
}