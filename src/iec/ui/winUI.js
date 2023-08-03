import { Container, Sprite, Texture } from "pixi.js";
import { AssetManager } from "../../assetManager";
import { Game } from "../../game";
import { Util } from "../../helpers/utils";
import { Collider } from "../../physics/aabb/collider";
import { CollisionTag } from "../../physics/aabb/collisionTag";
import { PureTransform } from "../../pureDynamic/core/pureTransform";
import { Alignment } from "../../pureDynamic/core/pureTransformConfig";
import { PureSpine } from "../../pureDynamic/PixiWrapper/pureSpine";
import { PureSprite } from "../../pureDynamic/PixiWrapper/pureSprite";
import { GameState, GameStateManager } from "../../pureDynamic/systems/gameStateManager";
import { Tween } from "../../systems/tween/tween";
import { ObjectFactory } from "../objectFactory";
import { VelocityBullet } from "../objects/bullets/velocityBullet";
import { IntervalWeapon } from "../objects/weapons/intervalWeapon";

export class WinUI extends Container {
  constructor() {
    super();
    this.weapons = [];
    this._initBackground();
    this._initShip();
    this._initBoss();
    this._initEnemies();
    this._initTextContinue();
    Game.app.ticker.add(this.update, this);
  }

  update() {
    // TODO: Rework weapon updating
    if (GameStateManager.isState(GameState.Win, GameState.Lose)) {
      this.dt = Game.app.ticker.deltaMS / 1000;
      this.weapons.forEach((weapon) => weapon.updateInterval(this.dt));
    }
  }

  show() {
    this.weapons.forEach((weapon) => weapon.enabled = true);
    this.visible = true;
    this.ship.collider.enabled = true;
  }

  hide() {
    this.weapons.forEach((weapon) => weapon.enabled = false);
    this.visible = false;
    this.ship.collider.enabled = false;
  }

  _initShip() {
    this.ship = new PureSprite(Texture.from("ship_green_base"), new PureTransform({
      pivotX  : 0.5,
      pivotY  : 0.5,
      anchorX : 0.5,
      anchorY : 0.8,
    }));
    this.addChild(this.ship.displayObject);
    this._addSmoke(32, 48, 1, 0.6, 0.6);
    this._addSmoke(-32, 48, 1, 0.6, 0.6);

    let collider = new Collider(CollisionTag.Ship);
    this.ship.displayObject.addChild(collider);
    collider.enabled = false;
    this.ship.collider = collider;
    collider.y = -100;
  }

  _addSmoke(x = 0, y = 0, scaleX = 1, scaleY = 1, alpha = 1) {
    let smoke = new Sprite(Texture.from("smoke_blue"));
    this.ship.displayObject.addChild(smoke);
    smoke.anchor.set(0.5, 0);
    smoke.alpha = alpha;
    smoke.x = x;
    smoke.y = y;
    smoke.scale.set(scaleX, scaleY);

    smoke.tween = Tween.createTween(smoke.scale, { y: scaleY / 2 }, {
      duration : 0.03,
      loop     : true,
      yoyo     : true,
    }).start();

    return smoke;
  }

  _initEnemies() {
    let anchorRange = 0.55;
    this.addEnemy(-anchorRange, -anchorRange);
    this.addEnemy(anchorRange, -anchorRange);
    this.addEnemy(-anchorRange, anchorRange);
    this.addEnemy(anchorRange, anchorRange);
  }

  addEnemy(anchorX = 0, anchorY = 0) {
    let enemy = new PureSpine(this, AssetManager.spines.enemyYellow, new PureTransform({
      container: this.boss,
      anchorX,
      anchorY,
    }));
    enemy.play({ name: "Yellow_Idle", loop: true });
    return enemy;
  }

  _initBoss() {
    this.boss = new PureSpine(this, AssetManager.spines.boss, new PureTransform({
      anchorX : 0.5,
      anchorY : 0.1,
      pivotY  : -0.5,
    }));
    this.boss.play({ name: "Idle", loop: true });

    let bullet1 = Texture.from("boss_bullet_1");
    let bullet2 = Texture.from("boss_bullet_2");
    let bullet3 = Texture.from("boss_bullet_3");
    let bullet4 = Texture.from("boss_bullet_4");
    this._addBossWeapon(bullet1, -134, 270, 0, 1000, 0.25);
    this._addBossWeapon(bullet1, 134, 270, 0, 1000, 0.25);
    this._addBossWeapon(bullet2, 0, 270, 0, 1000, 0.3);
    this._addBossWeapon(bullet3, 0, 300, 0, 1000, 0.4);
    this._addBossWeapon(bullet4, 0, 270, 0, 1000, 0.5);
  }

  // eslint-disable-next-line max-params
  _addBossWeapon(texture, x = 0, y = 0, velX = 0, velY = 0, interval = 1) {
    let collider = new Collider(CollisionTag.EnemyBullet);
    collider.enabled = false;
    collider.y = 50;

    let bullet = new VelocityBullet(texture, collider);
    bullet.anchor.set(0.5, 0);
    bullet.init();
    bullet.velocity.set(velX, velY);
    this.addChild(bullet);

    let weapon = new IntervalWeapon(bullet);
    weapon.enabled = false;
    weapon.interval = interval;
    weapon.x = x;
    weapon.y = y;
    this.boss.displayObject.addChild(weapon);
    this.weapons.push(weapon);
    return weapon;
  }

  _initTextContinue() {
    this.txtContinue = new PureSprite(Texture.from("txt_continue"), new PureTransform({
      alignment : Alignment.MIDDLE_CENTER,
      y         : 100,
    }));
    this.addChild(this.txtContinue.displayObject);
  }

  _initBackground() {
    this.bg = ObjectFactory.createBackground("bg");
    this.addChild(this.bg.displayObject);
    Util.registerOnPointerDown(this.bg.displayObject, () => Game.onCTAClick());
  }
}
