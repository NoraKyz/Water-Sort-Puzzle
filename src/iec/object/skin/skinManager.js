import TubeData from "../../../../assets/jsons/tubeData.json";

export class SkinManager {
    static _currentSkin = TubeData[0];

    static get currentSkin() {
        return this._currentSkin;
    }

    static setSkin(skinData) {
        this._currentSkin = value;
    }
}