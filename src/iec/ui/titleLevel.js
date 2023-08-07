import { Text } from "pixi.js";

export class TitleLevel extends Text {
  constructor() {
    super("Level: 1", {
      fontFamily: "Arial",
      fontSize: 24,
      fill: "white",
      align: "center",
    });
    this.anchor.set(0.5);
    this.position.set(100, 50);
  }
}