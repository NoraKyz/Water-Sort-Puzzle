import { Sprite } from "js";
import { Point, Texture } from "pixi.js";
import { GameConstant } from "../../gameConstant";
import { CollisionDetector } from "./collisionDetector";
import { CollisionTag } from "./collisionTag";

export class Collider extends Sprite {
  constructor(tag = CollisionTag.Default) {
    super();
    this.enabled = true;
    this.width = 100;
    this.height = 100;
    this.anchor.set(0.5);
    this.visible = false;
    this.tag = tag;
    this.collideData = {};
    CollisionDetector.instance.add(this);

    if (GameConstant.DEBUG_DRAW_COLLIDER) {
      this.visible = true;
      this.texture = Texture.from("spr_blank");
    }
  }

  destroy() {
    super.destroy();
    this.enabled = false;
    CollisionDetector.instance.remove(this);
  }

  getPosition() {
    if (this._tmpPos) {
      this.getGlobalPosition(this._tmpPos, true);
    }
    else {
      this._tmpPos = new Point();
      this.getGlobalPosition(this._tmpPos);
    }

    this._tmpPos.x -= this.width * this.anchor.x;
    this._tmpPos.y -= this.height * this.anchor.y;
    return this._tmpPos;
  }

  clone() {
    let collider = new Collider(this.tag, this.collideTag);
    collider.x = this.x;
    collider.y = this.y;
    collider.width = this.width;
    collider.height = this.height;
    collider.enabled = this.enabled;
    collider.anchor.set(this.anchor.x, this.anchor.y);
    return collider;
  }
}
