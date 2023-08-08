import { Container, Texture } from "pixi.js";
import { PureButton } from "../../../pureDynamic/PixiWrapper/pureButton";
import { PureTransform } from "../../../pureDynamic/core/pureTransform";
import { Alignment } from "../../../pureDynamic/core/pureTransformConfig";

export class TopbarButtons extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
    };

    _initProperties() {
    }

    _initComponents() {
        this._initUndoButton();
    }

    _initUndoButton() {
        this.undoBtn = new PureButton(Texture.from("spr_undo_btn"), () => this._onClickUndoButton(), new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            x: 15
            y: 72,
        }))
        this.addChild(this.undoBtn.displayObject);
    }

    _initAddTubeButton() {
        this.addTubeBtn = new Container();
        
        this.addChild(this.addTubeBtn);
    }

    _initReplayButton() {
        this.replayBtn = new PureButton(Texture.from("spr_undo_btn"), () => this._onClickUndoButton(), new PureTransform({
            alignment: Alignment.TOP_CENTER,
            useOriginalSize: true,
            y: 72,
        }))
    }

    _onClickUndoButton() {
        this.emit("undo");
    }
}