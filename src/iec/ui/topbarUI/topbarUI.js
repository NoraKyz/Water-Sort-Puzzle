import { Container, Texture } from "pixi.js";
import { PureText } from "../../../pureDynamic/PixiWrapper/pureText";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { UndoButton } from "./undoBtn";
import { AddTubeButton } from "./addTubeBtn";
import { ReplayButton } from "./replayBtn";
import { MenuButton } from "./menuBtn";
import { Data } from "../../../dataTest";
import { ButtonManager } from "../buttonManager";
import { GameConstant } from "../../../gameConstant";

export class TopbarUI extends Container {
    constructor(levelManager) {
        super();
        this._initProperties(levelManager);
        this._initComponents();
    }

    _initProperties() {
        
    }

    _initComponents() {
        this._initTitleLevel();
        this._initMenuButton();
        this._initReplayButton();
        this._initUndoButton();
        this._initAddTubeButton();
    }

    _initTitleLevel() {
        this.titleLevel = new PureText(
            "Level " + (Data.currentLevel + 1),
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

    _initMenuButton() {
        this.menuBtn = new MenuButton();
        ButtonManager.addButton(GameConstant.MENU_BUTTON, this.menuBtn);
        this.addChild(this.menuBtn);
    }

    _initReplayButton() {
        this.replayBtn = new ReplayButton();
        ButtonManager.addButton(GameConstant.REPLAY_BUTTON, this.replayBtn);
        this.addChild(this.replayBtn);
    }

    _initUndoButton() {
        this.undoBtn = new UndoButton();
        ButtonManager.addButton(GameConstant.UNDO_BUTTON, this.undoBtn);
        this.addChild(this.undoBtn);
    }

    _initAddTubeButton() {
        this.addTubeBtn = new AddTubeButton();
        ButtonManager.addButton(GameConstant.ADD_TUBE_BUTTON, this.addTubeBtn);
        this.addChild(this.addTubeBtn);
    }

    _updateTextLevel() {
        this.titleLevel.displayObject.text = "Level " + (Data.currentLevel + 1);
    }

    onNextLevel() {
        this._updateTextLevel();
    }
}