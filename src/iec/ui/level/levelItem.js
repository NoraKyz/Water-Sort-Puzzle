import { Container, Text } from "pixi.js";
import { LevelScreenEvent } from "../../screens/levelScreen";

export class LevelItem extends Container {
    constructor(data) {
        super();
        this.data = data;

        this._create();
        this._initEvents();
    }

    _create() {
        this.text = new Text(
            this.data,
            {
                fill: "#000000",
                fontFamily: "Comic Sans MS",
                fontSize: 45,
                fontWeight: "bolder"
            });
        this.addChild(this.text);
    }

    _initEvents() {
        this.eventMode = 'static'
        this.cursor = 'pointer';
        this.on('pointertap', () => {
            this.parent.parent.parent.emit(LevelScreenEvent.LevelSelected, this.data);
        });
    }
}