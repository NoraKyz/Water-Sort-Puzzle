import { Container } from "pixi.js";
import { Background } from "./background";
import BackgroundData from "../../../../assets/jsons/backgroundData.json";

export class BackgroundManager extends Container {
    constructor() {
        super();

        this._initProperties();
        this._create();
    }

    _initProperties() {
        this.currentBg = null;
        this.bgList = [];
    }

    _create() {
        this._load(BackgroundData);
        this.set(this.bgList[0]); 
        this.addChild(this.currentBg.displayObject);       
    }

    _load(bgData) {
        bgData.forEach(data => {
            let bg = new Background(data);
            this.bgList.push(bg);
        });
    }

    set(bg) {
        if (bg.unlock) {
            this.currentBg = bg;
        }
    } 
}