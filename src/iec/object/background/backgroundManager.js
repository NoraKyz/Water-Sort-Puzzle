import { Container } from "pixi.js";
import { Background } from "./background";
import BackgroundData from "../../../../assets/jsons/backgroundData.json";
import { Data } from "../../../dataTest";
import { SkinManager } from "../skin/skinManager";

export class BackgroundManager extends Container {
    constructor() {
        super();

        this._initProperties();
        this._create();
        this._initEvents();
    }

    _initProperties() {
        this.currentBg = null;
        this.bgList = [];
        SkinManager.addObserver(this);
    }

    _create() {
        this._load(BackgroundData);
        this.set(Data.themeSkinId);
        this.addChild(this.currentBg.displayObject);
    }

    _load(bgData) {
        bgData.forEach(data => {
            let bg = new Background(data);
            this.bgList.push(bg);
        });
    }

    set(id) {
        if(this.currentBg) {
            this.removeChild(this.currentBg.displayObject);
        }

        this.currentBg = this.bgList[id - 1];
        this.addChild(this.currentBg.displayObject);
    }

    _initEvents() {
        this.on("dataChange", () => {
            this.set(Data.themeSkinId);
        });
    }
}