import { Container } from "pixi.js";
import { TitleLevel } from "./titleLevel";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";

export class TopbarUI extends Container {
    constructor() {
        super();
        this._initProperties();
        this._initComponents();
    }

    _initProperties() {
        console.log(this.position);
    }

    _initComponents() {
        this._initTitleLevel();
    }

    _initTitleLevel() {
        this.titleLevel = new TitleLevel("1");
        this.titleLevel.y = -420;
        this.addChild(this.titleLevel);
    }
}