/* eslint-disable max-depth */
import { LevelEvent } from "./levelEvent";
import { Container } from "@pixi/display";
import LevelData from "@../../../assets/jsons/levelData.json";
import TubePosData from "@../../../assets/jsons/tubePosData.json";
import TubeData from "@../../../assets/jsons/tubeData.json";
import { Tube } from "../object/tube/tube";
import { TubeManager } from "../object/tube/tubeManager";
import { GameConstant } from "../../gameConstant";
import { Sprite, Texture } from "pixi.js";
import { Solver } from "../solver/solve";
import { Tween } from "../../systems/tween/tween";
import { TimeOut, TimeOutEvent } from "../basic/timeOut";
import { SkinManager } from "../object/skin/skinManager";

export class Level extends Container {
  static createLevel(index) {
    if (LevelData[index]) {
      return new Level(index);
    }
    else {
      return;
    }
  }

  constructor(index) {
    super();
    this.index = index;
    this.data = LevelData[index];
    this.tubeData = SkinManager.currentSkin;
    // this._initLevelText(index);
    this._initTubeManager();
    this._initTube();
    if (this.data.tutorial) {
      this._initTutorial();
      this.tubeManager.tutorial = true;
      this.tubeManager.tutorialNextMove = [0, 1];
    }
    if (this.data.enableHint) {
      this.enableHint();
      this.showHint();
    }

    this._initEvents();
  }

  onStart() {
    this.emit(LevelEvent.Start, this);
  }

  onSuccess() {
    this.emit(LevelEvent.Success, this);
  }

  onFail() {
    this.emit(LevelEvent.Fail, this);
  }

  complete() {
    this.isCompleted = true;
    this.emit(LevelEvent.Complete, this);
  }

  autoCompleted() {
    if (this.data.autoCompelted) {
      let solution = this.getSolution();
      this.tubeManager.startAutoPour(solution);
    }
  }

  getSolution() {
    let stack = this.tubeManager.getCurrentStacks();
    let solution = Solver.solve(new Solver(stack));
    return solution;
  }

  _initLevelText(index) {
    this.levelText = new Sprite(Texture.from(`spr_text_level_${index + GameConstant.LEVEL_OFFSET}`));
    this.levelText.anchor.set(0.5);
    this.levelText.y = -500;
    this.addChild(this.levelText);
  }

  _initTubeManager() {
    this.tubeManager = new TubeManager(this.data, this.tubeData);
    this.tubeManager.on("win", this.complete, this);
    this.tubeManager.on("spawnConfetti", this._onSpawnConfetti, this);
    this.tubeManager.on("tubeTap", this._onTubeTap, this);
    this.tubeManager.on("move", this._onMove, this);
    this.addChild(this.tubeManager);
  }

  _initTube() {
    this.data.stacks.forEach((data, index) => {
      let tube = new Tube(this.tubeData);
      for (let i = 0; i < data.length; i++) {
        tube.addLiquid(data[i], GameConstant.LIQUID_HEIGHT, 100);
      }

      tube.position.x = tube.originalX = TubePosData[this.data.tubePosData][index].pos[0];
      tube.position.y = tube.originalY = TubePosData[this.data.tubePosData][index].pos[1];
      tube.direction = TubePosData[this.data.tubePosData][index].dirention;
      
      tube.index = index;
      this.tubeManager.addTube(tube);
    });
  }

  enableHint() {
    this.timeOut = new TimeOut(GameConstant.HINT_TIME);
    this.timeOut.on(TimeOutEvent.TimeOut, this.showHint, this);
    this.timeOut.initTimeout();
  }

  showHint() {
    if (this.isCompleted) {
      return;
    }
    if (!this.curSolution) {
      this.curSolution = this.getSolution();
      this.curSolutionIndex = 0;
    }
    this._initHint(this.curSolution[this.curSolutionIndex]);
  }

  _onSpawnConfetti(tube) {
    this.emit("spawnConfetti", tube);
  }

  _onTubeTap() {
    this.emit("tubeTap");
    this.timeOut?.initTimeout();
    this._offHint();
  }

  _onMove(move) {
    this.lastMove = move;
    if (this.curSolution) {
      if (this.lastMove?.toString() === this.curSolution[this.curSolutionIndex]?.toString()) {
        this.curSolutionIndex++;
      }
      else {
        this.curSolution = this.getSolution();
        if (this.curSolution.length === 0 && !this.tubeManager.checkCompleted()) {
          this.onFail();
          return;
        }
        this.curSolutionIndex = 0;
      }
    }
  }

  _initHint(move) {
    if (!move) {
      this.timeOut.initTimeout();
      return;
    }
    if (!this.hand) {
      this.hand = new Sprite(Texture.from("spr_hand"));
      this.addChild(this.hand);
      this.hand.anchor.set(0);
      this.hand.pivot.set(85, 15);
      this.hand.scale.set(0.7);
    }
    let tube1 = this.tubeManager.getTubePosition(move[0]);
    let tube2 = this.tubeManager.getTubePosition(move[1]);
    this.hand.visible = true;
    this.hand.x = tube1.x;
    this.hand.y = tube1.y + 180;
    this.tween1?.stop();
    this.tween2?.stop();
    this.tween3?.stop();
    this.tween1 = Tween.createTween(this.hand, { position: { y: this.hand.y + 20 } }, {
      duration   : 0.5,
      repeat     : 1,
      yoyo       : true,
      onComplete : () => {
        this.tween3.start();
      },
      easing: Tween.Easing.Sinusoidal.Out
      ,
    }).start();
    this.tween3 = Tween.createTween(this.hand, { position: { x: tube2.x, y: tube2.y + 180 } }, {
      duration   : 0.5,
      onComplete : () => {
        this.tween2 = Tween.createTween(this.hand, { position: { y: this.hand.y + 20 } }, {
          duration   : 0.5,
          repeat     : 1,
          yoyo       : true,
          onComplete : () => {
            setTimeout(() => {
              this.hand.x = tube1.x;
              this.hand.y = tube1.y + 180;
              this.tween1.start();
            }, 500);
          },
          easing: Tween.Easing.Sinusoidal.Out
          ,
        }).start();
      },
    });
  }

  _offHint() {
    if (this.hand) {
      this.hand.visible = false;
      this.tween1?.stop();
      this.tween2?.stop();
      this.tween3?.stop();
    }
  }

  _initTutorial() {
    this.showPickUpText();
    this.hand = new Sprite(Texture.from("spr_hand"));
    this.addChild(this.hand);
    this.hand.anchor.set(0);
    this.hand.pivot.set(85, 15);
    this.hand.scale.set(0.7);
    let tube = this.tubeManager.getTubePosition(0);
    this.hand.x = tube.x;
    this.hand.y = tube.y + 180;
    Tween.createTween(this.hand, { position: { y: this.hand.y + 20 } }, {
      duration : 0.5,
      repeat   : Infinity,
      yoyo     : true,
      easing   : Tween.Easing.Sinusoidal.Out
      ,
    }).start();
    this.tubeManager.on("move1", this.onMove1, this);
    this.tubeManager.on("move2", this.onMove2, this);
  }

  onMove1() {
    this.pickupText.visible = false;
    this.showPourText();
    this.hand.visible = true;
    let tube = this.tubeManager.getTubePosition(this.tubeManager.tutorialNextMove[1]);
    Tween.createTween(this.hand, { x: tube.x }, {
      duration: 0.2,
    }).start();
  }

  onMove2() {
    this.hand.visible = false;
    if (this.index === 0) {
      this.pourText.visible = false;
    }
  }

  showPickUpText() {
    if (this.index === 0) {
      this.pickupText = new Sprite(Texture.from("spr_text_pick_up"));
      this.pickupText.anchor.set(0.5);
      this.pickupText.y = 380;
      this.addChild(this.pickupText);
    }
  }

  showPourText() {
    if (this.index === 0) {
      this.pourText = new Sprite(Texture.from("spr_text_pour_water"));
      this.pourText.anchor.set(0.5);
      this.pourText.y = 380;
      this.addChild(this.pourText);
    }
  }

  _initEvents() {
    this.on(LevelEvent.Undo, () => this._onUndoLevel());
  }

  _onUndoLevel() {
    this.tubeManager.emit("undo");
  }
}
