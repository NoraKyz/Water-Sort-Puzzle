import { Container } from "pixi.js";
import { TitleLevel } from "./titleLevel";

export class TopbarUI extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
    }

    _initProperties() {

    }

    _initComponents() {
        this._initTitleLevel();
    }

    _initTitleLevel() {
        this.titleLevel = new TitleLevel(1);
        this.titleLevel.y = -400;
        this.addChild(this.titleLevel);
    }

    onReset() {
        
    }
}