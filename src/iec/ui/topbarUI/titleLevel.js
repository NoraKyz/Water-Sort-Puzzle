import { Text } from "pixi.js";

export class TitleLevel extends Text {
  constructor(idLevel) {
    super("Level: " + idLevel, {
      fill: "#ffebef",
      fontFamily: "Comic Sans MS",
      fontSize: 64,
      fontWeight: "bolder"
    });

    this.anchor.set(0.5);
  }

  _setText(idLevel) {
    this.text = "Level: " + idLevel;
  }
}