import TubeData from "../../../../assets/jsons/tubeData.json";
import ThemeData from "../../../../assets/jsons/backgroundData.json";
import { Data } from "../../../dataTest";

export class SkinManager {
    static _currTubeSkin = TubeData[Data.tubeSkinId-1];
    static _currThemeSkin = ThemeData[Data.themeSkinId-1];
    

    static get Tube() {
        return this._currTubeSkin;
    }

    static get Theme() {
        return this._currThemeSkin;
    }

    static set Tube(id) {
        this._currTubeSkin.state = "unlocked";
        this._currTubeSkin = ThemeData[id-1];
        this._currTubeSkin.state = "selected";
    }

    static set Theme(id) {
        this._currThemeSkin.state = "unlocked";
        this._currThemeSkin = TubeData[id-1];
        this._currThemeSkin.state = "selected";     
    }

    static get TubeData() {
        return TubeData;
    }

    static get ThemeData() {
        return ThemeData;
    }
}