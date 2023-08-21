import { DataLocal } from "./dataLocal";
import { UserData } from "./userData";
import LevelData from "../../../assets/jsons/levelData.json"
import { GameConstant } from "../../gameConstant";

export const DataManagerEvent = Object.freeze({
    DataChanged: "dataChanged",
});

export class DataManager {
    static init() {
        this.observes = [];
        UserData.init();

        this.coins = UserData.coins;
        this.currentLevel = UserData.currentLevel;
        this.listLevels = UserData.listLevels;      
    }

    static addObserver(observer) {
        this.observes.push(observer);
    }

    static removeObserver(observer) {
        let index = this.observes.indexOf(observer);
        if (index > -1) {
            this.observe.splice(index, 1);
        }
    }

    static _notify() {
        this.observes.forEach(observe => {
            observe.emit(DataManagerEvent.DataChanged);
        });
    }

    static updateToStorage() {
        DataLocal.updateAllData();
    }

    static getLevelData(level = this.currentLevel) {
        return LevelData[level.id - 1];
    }

    static nextLevel() {
        this.currentLevel.enabled = false;

        let nextlevel = {
            id: this.currentLevel.id + 1,
            enabled: true,
        }
        this.listLevels.push(nextlevel);
        this.currentLevel = nextlevel;
          
        this.updateToStorage();
        this._notify();
    }

    static updateCoins(value) {
        this.coins.value += value;

        if (this.coins.value > GameConstant.MAX_COIN) {
            this.coins.value = GameConstant.MAX_COIN;
        }

        this.updateToStorage();
        this._notify();
    }
}
