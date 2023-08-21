import { DataLocal } from "./dataLocal";
export class UserData {
    static init() {
        this.coins = DataLocal.coins;
        this.score = DataLocal.score;
        this.listLevels = DataLocal.listLevels;
        this.listGameplayParams = DataLocal.listGameplayParams;
        this.listThemeSkin = DataLocal.listThemeSkin,
        this.listTubeSkin = DataLocal.listTubeSkin;

        this.currentLevel = this.getEnabledElement(this.listLevels);
        this.currentThemeSkin = this.getEnabledElement(this.listThemeSkin);
        this.currentTubeSkin = this.getEnabledElement(this.listTubeSkin);
    }

    static getEnabledElement(list) {
        return list.find(element => element.enabled);
    }
}