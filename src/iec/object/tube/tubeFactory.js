import TubeData from "../../../../assets/jsons/tubeData.json";
import { Spawner } from "../../../spawners/spawner";
import { Tube } from "./tube";

export class TubeFactory { 
    constructor() {
        this.data = TubeData;
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