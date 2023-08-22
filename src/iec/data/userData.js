import { DataLocal } from "./dataLocal";
export class UserData {
    static init() {
        this.coins = DataLocal.coins;
        this.score = DataLocal.score;     
        this.addTubeTimes = DataLocal.addTubeTimes;
        this.undoTimes = DataLocal.undoTimes;
        this.listUnlockedLevels = DataLocal.listUnlockedLevels;
        this.listThemeSkin = DataLocal.listThemeSkin,
        this.listTubeSkin = DataLocal.listTubeSkin;
        this.currentLevel = DataLocal.currentLevel;
        this.currentThemeSkin = this._getCurrentThemeSkin();
        this.currentTubeSkin = this._getCurrentTubeSkin();
    }

    static _getCurrentThemeSkin() {
        let skin =  this.listThemeSkin.find(skin =>  skin.state === "selected" );
        return skin.id;
    }

    static _getCurrentTubeSkin() {
        let skin =  this.listTubeSkin.find(skin =>  skin.state === "selected" );
        return skin.id;
    }
}