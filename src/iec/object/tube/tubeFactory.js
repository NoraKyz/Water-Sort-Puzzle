import { Spawner } from "../../../spawners/spawner";
import { UserData } from "../../data/userData";
import { Tube } from "./tube";

export class TubeFactory { 
    constructor() {
        this.data = UserData.listTubeSkin;
        this.spawners = {};
        this._initSpanwers();
    }

    _initSpanwers() {
        this.data.forEach(skin => {
            let spawner = new Spawner();
            spawner.init(() => {
                return new Tube(skin);
            }, 10);
            this.spawners[skin.id] = spawner; 
        });
    }

    getTube(id) {
        let spawner = this.spawners[id];
        return spawner.spawn();
    }
}