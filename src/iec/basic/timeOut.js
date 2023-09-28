import { Container } from "pixi.js";
import { Game } from "../../game";
import { Time } from "../../systems/time/time";

export const TimeOutEvent = Object.freeze({
  TimeOut: "timeOut",
});

export class TimeOut extends Container {
  constructor(time) {
    super();
    this.time = time;
    Game.app.ticker.add(this.update, this);
  }

  initTimeout() {
    this.isExecution = true;
    this.curTime = 0;
  }

  off() {
    this.isExecution = false;
  }

  update() {
    
    if (this.isExecution) {
      this.curTime += Time.dt;
      if (this.curTime > this.time) {
        this.curTime = 0;
        this.isExecution = false;
        this.emit(TimeOutEvent.TimeOut);
      }
    }
  }
}
