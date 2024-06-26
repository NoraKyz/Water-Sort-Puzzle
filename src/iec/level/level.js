/* eslint-disable max-depth */
import { LevelEvent } from "./levelEvent";
import { Container } from "@pixi/display";
import TubePosPortraitData from "@../../../assets/jsons/tubePosPortraitData.json";
import TubePosLandscapeData from "@../../../assets/jsons/tubePosLandscapeData.json";
import { TubeFactory } from "../object/tube/tubeFactory";
import { TubeManager } from "../object/tube/tubeManager";
import { GameConstant } from "../../gameConstant";
import { Sprite, Texture } from "pixi.js";
import { Solver } from "../solver/solve";
import { Tween } from "../../systems/tween/tween";
import { TimeOut, TimeOutEvent } from "../basic/timeOut";
import { DataManager } from "../data/dataManager";
import { DataObserver, EventData } from "../data/dataObserver";
import { UserData } from "../data/userData";
import { GameResizer, Orientation } from "../../pureDynamic/systems/gameResizer";

export class Level extends Container {
  constructor() {
    super();

    this.data = DataManager.getLevelData();
    this.skin = DataManager.getTubeSkinData();
    
    if(GameResizer.orientation === Orientation.Portrait) {
      this.tubePosData = TubePosPortraitData;
    } else {
      this.tubePosData = TubePosLandscapeData;
    }

    this._initComponents();
    this._initEvents();
  }

  _initComponents() {
    this._initTubeManager();
    this._initTubeFactory();
    this._enableHint();
  }

  _initTubeManager() {
    this.tubeManager = new TubeManager(this.data, this.skin);
    this.tubeManager.on("win", this.complete, this);
    this.tubeManager.on("spawnConfetti", this._onSpawnConfetti, this);
    this.tubeManager.on("tubeTap", this._onTubeTap, this);
    this.tubeManager.on("move", this._onMove, this);
    this.addChild(this.tubeManager);
  }

  _initTubeFactory() {
    this.tubeFactory = new TubeFactory();
  }

  _enableHint() {
    this.timeOut = new TimeOut(GameConstant.HINT_TIME);
    this.timeOut.on(TimeOutEvent.TimeOut, this.showHint, this);
    this.timeOut.initTimeout();
  }

  showHint() {  
    if(!this.data.enableHint) {
      return;
    }

    if (this.isCompleted) {
      return;
    }
    
    if (!this.curSolution) {
      this.curSolution = this.getSolution();
      this.curSolutionIndex = 0;
    }

    this._initHint(this.curSolution[this.curSolutionIndex]);
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
      duration: 0.5,
      repeat: 1,
      yoyo: true,
      onComplete: () => {
        this.tween3.start();
      },
      easing: Tween.Easing.Sinusoidal.Out
      ,
    }).start();
    this.tween3 = Tween.createTween(this.hand, { position: { x: tube2.x, y: tube2.y + 180 } }, {
      duration: 0.5,
      onComplete: () => {
        this.tween2 = Tween.createTween(this.hand, { position: { y: this.hand.y + 20 } }, {
          duration: 0.5,
          repeat: 1,
          yoyo: true,
          onComplete: () => {
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

  _resetHint() {
    this.curSolution = null;
    this.isCompleted = false;
    this._offHint();
    this.timeOut.initTimeout();
  }

  autoCompleted() {
    if (this.data.autoCompelted) {
      let solution = this.getSolution();
      this.tubeManager.startAutoPour(solution);
    }
  }

  getSolution() {
    let stacks = this.tubeManager.getCurrentStacks();
    let solution = Solver.solve(new Solver(stacks));
    return solution;
  }

  _offHint() {
    if (this.hand) {
      this.hand.visible = false;
      this.tween1?.stop();
      this.tween2?.stop();
      this.tween3?.stop();
    }
  }

  onFail() {
    this.emit(LevelEvent.Fail, this);
  }

  complete() {
    this.isCompleted = true;
    this.emit(LevelEvent.Complete, this);
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
      duration: 0.5,
      repeat: Infinity,
      yoyo: true,
      easing: Tween.Easing.Sinusoidal.Out
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
    this.on(LevelEvent.Replay, () => this._onResetLevel());
    this.on(LevelEvent.AddTube, () => this._onAddTube());
    this.on(LevelEvent.SpeedUp, () => this.tubeManager.emit(LevelEvent.SpeedUp));
    this.on(LevelEvent.SpeedDown, () => this.tubeManager.emit(LevelEvent.SpeedDown));
    this.on(LevelEvent.Hint, () => this._onEnableHint());

    DataObserver.addObserver(this);
    this.on(EventData.TubeSelected, () => this._onDataChanged());
  }

  _onUndoLevel() {
    this.tubeManager.emit("undo");
    this._resetHint();
  }

  _onResetLevel() {
    let numberStacks = this.data.stacks.length;
    this.data = DataManager.getLevelData();
    while (this.data.stacks.length < numberStacks) {
      this.data.stacks.push([]);
    }

    this.tubeManager.emit("reset");
    this.resetTube();
    this._resetHint();
  }

  _onAddTube() {
    if (this.data.tubeNumber < GameConstant.MAX_TUBE_NUMBER) {
      DataManager.updateAddTubeTimes(-1);

      this.data.stacks = this.tubeManager.getPourData();
      this.data.stacks.push([]);
      this.data.tubeNumber++;
      

      this.tubeManager.emit("addTube");
      this.resetTube();
      this._resetHint();
    }
  }

  startLevel(id) {
    DataManager.startLevel(id);
    this.tubeManager.emit("reset");
    this.data = DataManager.getLevelData(id); 
    this.resetTube();
    this._resetHint();
  }

  nextLevel() {
    DataManager.nextLevel();
    DataManager.updateUndoTimes(5 - GameConstant.UNDO_NUMBER_PER_LEVEL);
    DataManager.updateCoins(+50);
    this.tubeManager.emit("reset");
    this.startLevel(UserData.currentLevel);
  }

  resetTube() {
    this.data.stacks.forEach((data, index) => {
      let tube = this.tubeFactory.getTube(this.skin.id);
      for (let i = 0; i < data.length; i++) {
        tube.addLiquid(data[i], this.skin.liquidHeight, 100);
      }

      tube.position.x = tube.originalX = this.tubePosData[this.data.tubeNumber.toString()][index].pos[0];
      tube.position.y = tube.originalY = this.tubePosData[this.data.tubeNumber.toString()][index].pos[1];
      tube.direction = this.tubePosData[this.data.tubeNumber.toString()][index].dirention;

      tube.index = index;
      this.tubeManager.addTube(tube);
    });
  }

  _onEnableHint() {
    this.data.enableHint = true;
    this.timeOut.initTimeout();
  }

  _onDataChanged() {
    this.skin = DataManager.getTubeSkinData();
    
    this.data.stacks = this.tubeManager.getPourData();
    this.tubeManager.emit("reset");
    this.resetTube();
  }
}
