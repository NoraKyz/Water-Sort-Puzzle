import { Container, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";
import { Data } from "../../../../src/dataTest";
import { AddTubeButton } from "./addTubeBtn";
import { UndoButton } from "./undoBtn";

export class TopbarButtons extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
        this._initEvents();
        this._onInit();
    };

    _initProperties() {

    }

    _initComponents() {
        this._initMenuButton();
        this._initReplayButton();
        this._initUndoButton();
        this._initAddTubeButton();
    }

    _initMenuButton() {
        this.menuBtn = new PureButton(Texture.from("spr_menu_btn"), () => { }, new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: -250,
            y: 72,
        }))
        this.addChild(this.menuBtn.displayObject);
    }

    _initReplayButton() {
        this.replayBtn = new PureButton(Texture.from("spr_replay_level_btn"), () => { }, new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: -80,
            y: 72,
        }))
        this.addChild(this.replayBtn.displayObject);
    }

    _initUndoButton() {
       this.undoBtn = new UndoButton();
         this.addChild(this.undoBtn);
    }

    _initAddTubeButton() {
        this.addTubeBtn = new AddTubeButton();
        this.addChild(this.addTubeBtn); 
    }

    _initEvents() {
        
    }

    _onInit() {
        if (Data.addTubeTimes > 0) {
            this.addTubeBtn.emit("ableAddTube");
        } else {
            this.addTubeBtn.emit("unableAddTube");
        }
    }

    _onClickUndoButton() {
        this.emit("undo");
    }
}