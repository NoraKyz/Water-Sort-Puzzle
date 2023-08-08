import { Container, Sprite } from "pixi.js";

export class WinUI extends Container {
    constructor() {
        super();
    }

    _initComponents() {
        this._initConcefetti();
        this._initNextButton();
    }

    _initConcefetti() {
        this.banner = new Sprite.from("confetti_banner");
        this.addChild(this.banner);
    }

    _initNextButton() {

    }
}