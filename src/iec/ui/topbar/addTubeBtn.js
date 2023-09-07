import { Container, Text, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { Alignment, MaintainAspectRatioType } from "../../../pureDynamic/core/pureTransformConfig";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { LevelEvent } from "../../level/levelEvent";
import { GameConstant } from "../../../gameConstant";
import { PureSprite } from "../../../pureDynamic/PixiWrapper/pureSprite";
import { DataManager } from "../../data/dataManager";
import { UserData } from "../../data/userData";
import { AdsManager, AdsType } from "../../../../sdk/adsManager";

export class AddTubeButton extends Container {
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
            x: 280,
            y: 40,
        });

        this.lTransform = new PureTransform({
            alignment: Alignment.TOP_CENTER,
            usePercent: true,
            maintainAspectRatioType: MaintainAspectRatioType.MIN,
            height: 0.06,
            width: 0.12,
            x: 280,
            y: 70,
        });
    }

    _initElements() {
        this._initAddBtn();
        this._initAdsBtn();
    }

    _initAddBtn() {
        this.addBtn = new PureButton(
            Texture.from("spr_add_tube_btn"),
            () => this._onClickAddBtn(),
            this.pTransform,
            this.lTransform
        );
        this.addChild(this.addBtn.displayObject);

        this.textAddBtn = new Text(
            UserData.undoTimes,
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 50,
                fontWeight: "bolder"
            });
        this.textAddBtn.position.set(this.addBtn.displayObject.width * 0.2, 10);
        this.addBtn.displayObject.addChild(this.textAddBtn);
    }

    _initAdsBtn() {
        this.adsBtn = new PureButton(
            Texture.from("spr_ads_get_tube_btn"),
            () => this._onClickAdsBtn(),
            this.pTransform,
            this.lTransform
        );
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

    _setStateBtn() {
        this._updateAddBtn();

        if (UserData.addTubeTimes > 0) {
            this.emit("ableAddTube");
        } else {
            this.emit("unableAddTube");
        }
    }

    _updateAddBtn() {
        this.textAddBtn.text = UserData.addTubeTimes;
    }

    _onClickAddBtn() {
        this.emit(LevelEvent.AddTube);
        this._setStateBtn();
    }

    _onClickAdsBtn() {
        AdsManager.showVideo(AdsType.REWARDED ,() => { }, () => {
            DataManager.updateAddTubeTimes(+ GameConstant.TUBE_NUMBER_GET_BY_ADS);
            this._setStateBtn();
        })
    }
}