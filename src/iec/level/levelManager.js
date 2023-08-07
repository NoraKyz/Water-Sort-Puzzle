import { Container } from "@pixi/display";
import { Point } from "@pixi/math";
import { Game } from "../../game";
import { Level } from "./level";
import { LevelEvent } from "./levelEvent";

export class LevelManager extends Container {
  constructor() {
    super();
    /** @type {Array<Level>} */
    this.levels = [];
    this.currLevel = null;
    this.currLevelIndex = -1;
    this._tmpPos = new Point();
  }

  addLevel(level) {
    this.levels.push(level);
  }

  start() {
    this.nextLevel();
  }

  nextLevel() {
    this.currLevelIndex++;
    let level = Level.createLevel(this.currLevelIndex);
    if (level) {
      if (this.currLevel) {
        this.removeLevel(this.currLevel);
      }
      this.startLevel(level);
    }
  }

  startLevel(level) {
    this.addChild(level);
    level.on(LevelEvent.Complete, this._onLevelComplete);
    level.on(LevelEvent.Fail, this._onLevelFail, this);
    level.on("spawnConfetti", this._onSpawnConfetti, this);
    level.on("tubeTap", this._onTubeTap, this);
    level.onStart();
    this.currLevel = level;
    this.emit(LevelEvent.Start, level);
  }

  checkAutoCompletedLevel() {
    this.currLevel.autoCompleted();
  }

  _onLevelComplete() {
    setTimeout(() => {
      this.emit(LevelEvent.Complete);
    }, 500);
  }

  _onLevelFail(level) {
    setTimeout(() => {
      this.emit(LevelEvent.Fail, level);
    }, 1000);
  }

  removeLevel(level) {
    level.off(LevelEvent.Complete, this._onLevelComplete, this);
    this.removeChild(level);
  }

  _onSpawnConfetti(tube) {
    this.emit("spawnConfetti", tube);
  }

  _onTubeTap() {
    this.emit("tubeTap");
  }
}
