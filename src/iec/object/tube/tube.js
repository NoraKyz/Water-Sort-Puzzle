/* eslint-disable max-depth */
import { Container, Point, SimpleRope, Sprite, Texture } from "pixi.js";
import { Util } from "../../../helpers/utils";
import { GameResizer } from "../../../pureDynamic/systems/gameResizer";
import { Tween } from "../../../systems/tween/tween";
import { ColorCode } from "../colorCode/colorCode";
import { Liquid } from "../liquid/liquid";

export const TubeState = Object.freeze({
  Pouring   : "pouring",
  BeingPour : "beingPour",
  Free      : "free",
});

export class Tube extends Container {
  constructor(tubeData, colorCode) {
    super();
    this.colorCode = colorCode;
    this.tubeData = tubeData;
    this.state = TubeState.Free;
    this.eventMode = "static";
    let texTube = Texture.from(this.tubeData.tubeSprite);
    this.tube = new Sprite(texTube);
    this.tube.anchor.set(0.5);
    this.addChild(this.tube);
    this.tubeWidth = this.tube.width;

    this.vertexLeft = new Sprite(Texture.WHITE);
    this.vertexLeft.anchor.set(0.5);
    this.vertexLeft.alpha = 0;
    this.vertexLeft.x = -(this.tube.width / 2 + this.tubeData.vertexOffsetX);
    this.vertexLeft.y = -this.tube.height / 2 + this.tubeData.vertexOffsetY;
    this.tube.addChild(this.vertexLeft);

    this.vertexRight = new Sprite(Texture.WHITE);
    this.vertexRight.anchor.set(0.5);
    this.vertexRight.alpha = 0;
    this.vertexRight.x = (this.tube.width / 2 + this.tubeData.vertexOffsetX);
    this.vertexRight.y = -this.tube.height / 2 + this.tubeData.vertexOffsetY;
    this.tube.addChild(this.vertexRight);

    this.maskContainer = new Container();
    this.addChildAt(this.maskContainer, 0);
    this.maskSprite = new Sprite(Texture.from(this.tubeData.tubeMaskSprite));
    this.maskSprite.anchor.set(0.5);
    this.maskContainer.mask = this.maskSprite;
    this.tube.addChild(this.maskSprite);

    this._initWaterSurface();

    this.liquidContainer = new Container();
    this.liquidContainer.y = this.tube.height / 2;
    this.maskContainer.addChild(this.liquidContainer);

    this.shadow = new Sprite();
    this.shadow.anchor.set(0.5);
    this.shadow.eventMode = "static";
    // this.addChild(this.shadow);
    /*
     * this.temp = new Sprite(Texture.WHITE);
     * this.addChild(this.temp);
     */
  }

  _initWaterSurface() {
    this.ropeLength = 18;
    this.count = 0;

    this.points = [];

    for (let i = 0; i < 50; i++) {
      this.points.push(new Point(i * this.ropeLength, 0));
    }

    this.strip = new SimpleRope(Texture.WHITE, this.points);
    this.waterSurface = new Container();
    this.waterSurface.addChild(this.strip);
    this.waterSurface.scale.set(0.5, 2);
    this.waterSurface.y = this.tube.height / 2 + 50;
    this.maskContainer.addChild(this.waterSurface);
    this.waterSurface.pivot.set(this.waterSurface.width, this.waterSurface.height / 4);
    this.waterSurface.visible = false;

    /*
     * this.changePivotTo(this.vertexRight);
     * Tween.createTween(this.tube, { rotation: Util.toRadian(90) }, {
     *   duration : 1,
     *   onUpdate : () => {
     *     // this.tube.rotation += 0.01;
     *     this.updateLiquidContainer();
     *   },
     * }).start();
     */

  }

  addLiquid(code, heihgt, percent) {
    /*
     * let temp = new Liquid(code, heihgt, percent);
     * this.liquidContainer.addChildAt(temp, 0);
     * this.updateLiquidContainer();
     * return temp;
     */
    let color = parseInt(this.colorCode[code - 1], 16);
    let temp = new Liquid(color, code, heihgt, percent);
    temp.y = -this.liquidContainer.height;
    this.liquidContainer.addChildAt(temp, 0);
    this.updateLiquidContainer();
    // this.liquidContainer.visible= false;
    return temp;
  }

  removeLiquid(liquid) {
    this.liquidContainer.removeChild(liquid);
  }

  changePivotTo(point) {
    this.tube.position.x += point.x - this.tube.pivot.x;
    this.tube.position.y += point.y - this.tube.pivot.y;
    this.tube.pivot.x = point.x;
    this.tube.pivot.y = point.y;
    this.shadow.position.x = this.tube.position.x;
    this.shadow.position.y = this.tube.position.y;
    this.shadow.pivot.x = point.x;
    this.shadow.pivot.y = point.y;
  }

  setToSetupPivot() {
    this.tube.position.x += -this.tube.pivot.x;
    this.tube.position.y += -this.tube.pivot.y;
    this.tube.pivot.x = 0;
    this.tube.pivot.y = 0;
    this.shadow.position.x = this.tube.position.x;
    this.shadow.position.y = this.tube.position.y;
    this.shadow.pivot.x = 0;
    this.shadow.pivot.y = 0;
  }

  update() {
    /*
     * this.maskContainer.y = this.tube.getBounds().height / 2;
     * this.temp.y = this.tube.getBounds().height / 2;
     * console.log(this.tube.getBounds().height);
     */
    this.updateLiquidContainer();
  }

  getCurStack() {
    let res = "";
    this.liquidContainer.children.forEach((child) => {
      if (child.isPouring) {
        return;
      }
      res = child.code.toString() + res;
    });
    return res;
  }

  getTopLiquid() {
    let res = {
      arr: [],
    };
    if (this.liquidContainer.children[0]) {
      res.length = this.liquidContainer.children.length;
      res.arr.push(this.liquidContainer.children[0]);
      res.code = this.liquidContainer.children[0].code;
      let index = 1;
      while (this.liquidContainer.children[index]) {
        let liquid = this.liquidContainer.children[index++];
        if (liquid.code === res.code) {
          res.arr.push(liquid);
        }
        else {
          break;
        }
      }
    }
    return res;
  }

  updateLiquidContainer() {
    let curHeight = 0;
    if (this.tube.pivot.x !== 0) {
      this.liquidContainer.y = this.tube.getBounds().y - GameResizer.height / 2 + this.tube.getBounds().height - this.y;
    }
    let ratio = 1.8;
    this.shadow.rotation = this.tube.rotation;
    for (let i = this.liquidContainer.children.length - 1; i >= 0; i--) {
      let liquid = this.liquidContainer.children[i];
      liquid.update(this.tube.rotation / ratio);
      if (ratio === 1.8) {
        ratio -= 0.4;
      }
      liquid.y = -curHeight;
      curHeight += liquid.height;
      /*
       * liquid.y = -liquid.trueWidth() - curHeight;
       * curHeight += liquid.trueWidth();
       * liquid.updateAnlge(-angle);
       */
    }
    // // this.waterSurface.rotation = -this.rotation;
    this.waterSurface.y = this.liquidContainer.y + 25 - curHeight;
    this.waterSurface.x = this.tube.getBounds().x - GameResizer.width / 2 + this.tube.getBounds().width / 2 - this.x;
  }

  setInWaterLine(direction, code) {
    let waterLine1 = new Sprite(Texture.WHITE);
    waterLine1.anchor.set(0.5);
    waterLine1.width = 10;
    waterLine1.height = 500;
    waterLine1.mask = this.maskSprite;
    waterLine1.visible = false;
    this.addChildAt(waterLine1, 0);
    let waterLine2 = new Sprite(Texture.WHITE);
    waterLine2.anchor.set(0.5);
    waterLine2.y = this.tubeData.waterLine2y;
    waterLine2.width = 10;
    waterLine2.height = 180;
    waterLine2.visible = false;
    this.addChildAt(waterLine2, 0);
    if (direction === "l") {
      waterLine1.x = -this.tubeData.waterLineX;
      waterLine2.x = -this.tubeData.waterLineX;
      waterLine1.visible = true;
      waterLine2.visible = true;
    }
    else {
      waterLine1.x = this.tubeData.waterLineX;
      waterLine2.x = this.tubeData.waterLineX;
      waterLine1.visible = true;
      waterLine2.visible = true;
    }
    let color = parseInt(this.colorCode[code - 1], 16);
    waterLine1.tint = color;
    waterLine2.tint = color;
    return [waterLine1, waterLine2];
  }

  offInWaterLine(waterLines) {
    waterLines[0].destroy();
    waterLines[1].destroy();
  }

  setWaterSurface(colorCode, direction) {
    let color = parseInt(this.colorCode[colorCode - 1], 16);
    this.strip.tint = color;
    this.waterSurface.visible = true;
    this.waterSurfaceTween?.stop();
    this.waterSurfaceTween2?.stop();
    this.waterSurfaceTween = Tween.createTween(this, {}, {
      duration : 2,
      onUpdate : () => {
        this.updateWaterSurface(direction);
      },
    }).start();
  }

  offWaterSurface(direction) {
    this.waterSurfaceTween?.stop();
    this.waterSurfaceTween2?.stop();
    this.waterSurfaceTween2 = Tween.createTween(this.waterSurface, { y: "+15" }, {
      duration : 0.2,
      onUpdate : () => {
        this.updateWaterSurface(direction);
      },
      onComplete: () => {
        this.waterSurface.visible = false;
      },
    }).start();
  }

  updateWaterSurface(direction) {
    this.count -= 0.15 * (2 - Math.cos(this.tube.rotation));
    if (direction === "l") {
      for (let i = 0; i < this.points.length; i++) {
        this.points[i].y = Math.sin((i * 0.5) + this.count) * 5 * Math.cos(this.tube.rotation / 2) * (1 - (i / this.points.length));
      }
    }
    else {
      for (let i = 0, n = this.points.length; i < n; i++) {
        this.points[i].y = Math.sin(((n - 1 - i) * 0.5) + this.count) * 5 * Math.cos(this.tube.rotation / 2) * (1 - (n - 1 - i) / n);
      }
    }
  }

  checkResult() {
    if (this.getTopLiquid().arr.length === 4) {
      for (var i = 0; i < this.liquidContainer.children.length; i++) {
        if (this.liquidContainer.children[i].percent < 100) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  getTrueLength() {
    let res = 0;
    this.liquidContainer.children.forEach((child) => {
      if (child.isPouring) {
        return;
      }
      res++;
    });
    return res;
  }
}
