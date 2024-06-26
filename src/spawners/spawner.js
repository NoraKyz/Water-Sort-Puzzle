export class Spawner {
  constructor() {
    this.pool = [];
  }

  init(createObjectCallback, size = 1) {
    this.createObject = createObjectCallback;
    for (let i = 0; i < size; i++) {
      this.pool.push(this.createObject());
    }
  }

  despawn(obj) {
    this.pool.push(obj);
    obj.off("selfDespawn");
  }

  spawn() {
    let obj = this.pool.pop();
    if (!obj) {
      obj = this.createObject();
    }
    obj.on("selfDespawn", () => this.despawn(obj));
    return obj;
  }
}
