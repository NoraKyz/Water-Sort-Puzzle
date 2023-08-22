import { GameConstant } from "../../gameConstant"
import { PureText } from "../../pureDynamic/PixiWrapper/pureText";
import { UIScreen } from "../../pureDynamic/PixiWrapper/screen/uiScreen"
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment } from "../../pureDynamic/core/pureTransformConfig";
import { LevelEvent } from "../level/levelEvent";
import { ButtonManager } from "../ui/buttonManager";
import { AddTubeButton } from "../ui/topbar/addTubeBtn";
import { MenuButton } from "../ui/topbar/menuBtn";
import { ReplayButton } from "../ui/topbar/replayBtn";
import { UndoButton } from "../ui/topbar/undoBtn";
import { DataObserver, EventData } from "../data/dataObserver";
import { UserData } from "../data/userData";

export const TopbarScreenEvent = Object.freeze({
    OpenMenu: "OpenMenu",
});

export class TopbarScreen extends UIScreen {
    constructor() {
        super(GameConstant.TOPBAR_SCREEN);
    }

    create() {
        super.create();

        this._initTitleLevel();
        this._initMenuButton();
        this._initReplayButton();
        this._initUndoButton();
        this._initAddTubeButton();

        this._initEvents();
    }

    _initEvents() {
        DataObserver.addObserver(this);
        this.on(EventData.DataChanged, () => this._onDataChanged());

        this.menuBtn.on("openMenu", () => {
            this.emit(TopbarScreenEvent.OpenMenu);
        });
        
        this.replayBtn.on(LevelEvent.Replay, () => {
            this.emit(LevelEvent.Replay);
        });

        this.undoBtn.on(LevelEvent.Undo, () => {
            this.emit(LevelEvent.Undo);
        });

        this.addTubeBtn.on(LevelEvent.AddTube, () => {
            this.emit(LevelEvent.AddTube);
        }); 
    }

    _initTitleLevel() {
        this.titleLevel = new PureText(
            "Level " + UserData.currentLevel,
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

    _onDataChanged() {
        this.titleLevel.text = "Level " + UserData.currentLevel;
    }
}