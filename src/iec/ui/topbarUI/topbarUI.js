import { Container } from "pixi.js";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";

export class TopbarUI extends Container {
    constructor(levelManager) {
        super();
        this._initProperties(levelManager);
        this._initComponents();
    }

    _initProperties(levelManager) {
        this.levelManager = levelManager;
    }

    _initComponents() {
        this._initTitleLevel();
    }

    _initTitleLevel() {
        this.titleLevel = new PureText(
            "Level " + (this.levelManager.currLevelIndex + 1),
            new PureTransform({
                alignment: Alignment.TOP_CENTER,
                useOriginalSize: true,
                y: 200,
            }),
            {
                fill: "#ffebef",
                fontFamily: "Comic Sans MS",
                fontSize: 64,
                fontWeight: "bolder"
            });
        this.addChild(this.titleLevel.displayObject);
    }


    _updateTextLevel() {
        this.titleLevel.displayObject.text = "Level " + (this.levelManager.currLevelIndex + 1);
    }

    onNextLevel() {
        this._updateTextLevel();
    }
}