/* eslint-disable max-depth */
import { Container } from "pixi.js";
import { GameConstant } from "../../../gameConstant";
import { Util } from "../../../helpers/utils";
import { SoundManager } from "../../../soundManager";
import { Tween } from "../../../systems/tween/tween";
import { TubeState } from "./tube";
import { Data } from "../../../dataTest";
import { ButtonManager } from "../../ui/buttonManager";

export class TubeManager extends Container {
  constructor(levelData, skin) {
    super();

    this._initProperties(levelData, skin);
    this._initEvents();
  }

  _initProperties(levelData, skin) {
    this.levelData = levelData;
    this.skin = skin;
    this.activeTube = null;
    this.tubeArray = [];
    this.tubeUndoDataArray = [];
    this.tubeUndoDataQueue = [];
    this.isPouring = false;
  }

  addTube(tube) {
    this.addChild(tube);
    this.tubeArray.push(tube);
    tube.on("pointerdown", this._onTubeTap, this);
  }

  getTubePosition(index) {
    return this.tubeArray[index];
  }

  getCurrentStacks() {
    let stacks = [];
    for (let i = 0; i < this.tubeArray.length; i++) {
      let tube = this.tubeArray[i];
      stacks.push(tube.getCurStack());
    }
    return stacks;
  }

  _onTubeTap(event) {
    this.emit("tubeTap");
    if (this.isAutoCompleted) {
      return;
    }
    let tube = event.target;
    if (this.activeTube === null) {
      if (this.tutorial) {
        if (tube === this.tubeArray[this.tutorialNextMove[0]]) {
          this.emit("move1");
        }
        else {
          return;
        }
      }
      this.setActiveTube(tube);
    }
    else {
      if (this.activeTube === tube) {
        if (this.tutorial) {
          return;
        }
        this.unActiveTube(tube);
      }
      else {
        if (this.tutorial) {
          if (tube === this.tubeArray[this.tutorialNextMove[1]]) {
            this.emit("move2");
          }
          else {
            return;
          }
        }
        this.check(this.activeTube, tube);
      }
    }
  }

  setActiveTube(tube) {
    if (tube.state === TubeState.BeingPour) {
      return;
    }
    let liquids = tube.getTopLiquid();
    if (liquids.arr.length !== 0) {
      this.activeTube = tube;
      Tween.createTween(tube, { position: { y: tube.originalY - 50 } }, {
        duration: 0.1,
      }).start();
    }
  }

  unActiveTube(tube) {
    this.activeTube = null;
    Tween.createTween(tube, { position: { y: tube.originalY } }, {
      duration: 0.1,
    }).start();
  }

  check(tube1, tube2) {
    if (this.canPour(tube1, tube2)) {
      this.preparePour(tube1, tube2);
    }
    else {
      if (this.activeTube) {
        this.unActiveTube(this.activeTube);
      }
    }
  }

  canPour(tube1, tube2) {
    let liquids1 = tube1.getTopLiquid();
    let liquids2 = tube2.getTopLiquid();
    if (liquids2.arr.length === 0) {
      return true;
    }
    if (liquids2.length === 4) {
      return false;
    }
    if (liquids1.code === liquids2.code) {
      return true;
    }
    return false;
  }

  preparePour(tube1, tube2, callback = () => { }) {

    let pourDirection = null;
    this.activeTube = null;
    tube1.state = TubeState.Pouring;
    tube1.eventMode = "static";
    let liquids = tube1.getTopLiquid();
    this.setChildIndex(tube1, this.children.length - 1);
    tube2.state = TubeState.BeingPour;
    let pourPoint = {};
    if (tube2.direction === "l" || (tube2.direction === "b" && tube2.position.x > tube1.position.x)) {
      tube1.changePivotTo(tube1.vertexRight);
      pourDirection = "l";
      pourPoint.angle = this.skin.pourData[4 - liquids.length];

      pourPoint.x = -7;
      pourPoint.y = -250;
    }
    else {
      pourDirection = "r";
      tube1.changePivotTo(tube1.vertexLeft);
      pourPoint.angle = -this.skin.pourData[4 - liquids.length];
      pourPoint.x = 7;
      pourPoint.y = -250;
    }
    let point1 = tube1.tube.getGlobalPosition();
    let point2 = tube2.getGlobalPosition();
    let gap = {};
    gap.x = point2.x - point1.x + pourPoint.x;
    gap.y = point2.y - point1.y + pourPoint.y;
    if (gap.x >= 0) {
      gap.x = `+${gap.x}`;
    }
    else {
      gap.x = gap.x.toString();
    }
    if (gap.y >= 0) {
      gap.y = `+${gap.y}`;
    }
    else {
      gap.y = gap.y.toString();
    }
    Tween.createTween(tube1, {
      position: {
        x: gap.x,
        y: gap.y,
      },
    }, {
      duration: 0.2,
    }).start();
    Tween.createTween(tube1.tube, { rotation: Util.toRadian(pourPoint.angle) }, {
      duration: 0.2,
      onUpdate: () => {
        tube1.update();
      },
      onComplete: () => {
        this.startPour(tube1, tube2, pourDirection, callback);
      },
    }).start();
  }

  startPour(tube1, tube2, pourDirection, callback = () => { }, recursive = false) {
    // Only do something once time when recursive
    if (recursive === false) {
      recursive = true;
      SoundManager.play("sfx_pourWater", 1, false);
      ButtonManager.disableAll();
      if(this.isPouring) {
        
      }
    }
    let liquids1 = tube1.getTopLiquid();
    let liquids2 = tube2.getTopLiquid();
    let duration = Math.min(liquids1.arr.length, 4 - liquids2.arr.length) * 0.5;
    tube1.setWaterSurface(liquids1.code, pourDirection);
    tube2.setWaterSurface(liquids1.code, pourDirection);
    let waterLines = tube2.setInWaterLine(pourDirection, liquids1.code);
    let sourceLiquid = liquids1.arr[0];
    sourceLiquid.isPouring = true;
    let pourAngle;
    if (pourDirection === "l") {
      pourAngle = Util.toRadian(this.skin.pourData[4 - liquids1.length + 1]);
    }
    else {
      pourAngle = -Util.toRadian(this.skin.pourData[4 - liquids1.length + 1]);
    }
    let targetLiquid = tube2.addLiquid(liquids1.code, GameConstant.LIQUID_HEIGHT, 0);
    let p = {
      p: 100,
    };
    /*
     * if (!tube1.rolateTween) {
     *   tube1.rolateTween = Tween.createTween(tube1.tube, { rotation: tube1StartAngel + pourAngle }, {
     *     duration : duration,
     *     // easing   : Tween.Easing.Sinusoidal.Out,
     *   }).start();
     * }
     */
    Tween.createTween(tube1.tube, { rotation: pourAngle }, {
      duration: 0.65,
    }).start();
    Tween.createTween(p, { p: 0 }, {
      duration: 0.65,
      onUpdate: () => {
        this.isPouring = true;
        targetLiquid.setPercent(100 - p.p);
        sourceLiquid.setPercent(p.p);
        tube1.updateLiquidContainer();
        tube2.updateLiquidContainer();
      },
      onComplete: () => {
        tube1.removeLiquid(sourceLiquid);
        tube2.offInWaterLine(waterLines);
        if (this.canPour(tube1, tube2)) {
          this.startPour(tube1, tube2, pourDirection, callback, recursive);
        }
        else {
          this.isPouring = false;
          if (this.isPouring === false) {
            ButtonManager.enableAll();
          }
          tube1.offWaterSurface(pourDirection);
          tube2.offWaterSurface(pourDirection);
          if (tube2.checkResult()) {
            this.emit("spawnConfetti", tube2);
          }
          tube2.state = TubeState.Free;
          SoundManager.stop("sfx_pourWater");
          this.emit("move", [tube1.index, tube2.index]);
          this.returnToOriginalPos(tube1, callback);
        }
      },
    }).start();
  }

  returnToOriginalPos(tube, callback = () => { }) {
    Tween.createTween(tube, {
      position: {
        x: tube.originalX + tube.pivot.x,
        y: tube.originalY + tube.pivot.y,
      },
    }, {
      duration: 0.2,
    }).start();
    Tween.createTween(tube.tube, { rotation: 0 }, {
      duration: 0.2,
      onUpdate: () => {
        tube.updateLiquidContainer();
      },
      onComplete: () => {
        tube.setToSetupPivot();
        tube.eventMode = "static";
        tube.state = TubeState.Free;
        callback();
        this.checkWin();
      },
    }).start();
  }

  checkWin() {
    for (let i = 0; i < this.children.length; i++) {
      let liquids = this.children[i].getTopLiquid();
      for (let j = 0; j < liquids.arr.length; j++) {
        if (liquids.arr[j].percent < 100) {
          return;
        }
      }
      if (liquids.arr.length < 4 && liquids.arr.length !== 0) {
        return;
      }
    }
    this.emit("win");
  }

  checkCompleted() {
    for (let i = 0; i < this.children.length; i++) {
      let length = this.children[i].getTrueLength();
      if (length < 4 && length !== 0) {
        return false;
      }
    }
    return true;
  }

  startAutoPour(solution) {
    let index = -1;
    this.isAutoCompleted = true;
    let pourFunc = () => {
      index++;
      if (index >= solution.length) {
        this.emit("autoPourCompleted");
        return;
      }
      this.pourByIndex(solution[index][0], solution[index][1], pourFunc);
    };
    pourFunc();
  }

  pourByIndex(i, j, callback = () => { }) {
    this.preparePour(this.tubeArray[i], this.tubeArray[j], callback);
  }

  getPourData() {
    let pourData = [];
    this.tubeArray.forEach((tube) => {
      pourData.push(tube.getCurStack().reverse());
    });
    return pourData;
  }

  _initEvents() {
    this.on("undo", () => this._onUndoPour());
    this.on("reset", () => this._onReset());
  }

  _onUndoPour() {
    if (this.tubeUndoDataArray.length > 0) {
      Data.undoTimes--;

      let undoData = this.tubeUndoDataArray.pop();
      this.tubeArray.forEach((tube, id) => {
        tube.liquidContainer.removeChildren();
        undoData[id].forEach((data) => {
          tube.addLiquid(data, GameConstant.LIQUID_HEIGHT, 100);
        });
      });
    }
  }

  _onReset() {
    this.activeTube = null;
    this.tubeArray = [];
    this.tubeUndoDataArray = [];
    this.isPouring = false;
    this.removeChildren();
  }
}
