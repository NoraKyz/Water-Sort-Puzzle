import TubeData from "../../../../assets/jsons/tubeData.json";
import ThemeData from "../../../../assets/jsons/backgroundData.json";
import { Data } from "../../../dataTest";
import { ItemState } from "../../ui/shop/itemShop";

export class SkinManager {

    static init() {
        this.observers = [];
        this._currTubeSkin = TubeData[0];
        this._currThemeSkin = ThemeData[0];
    }

    static get currTubeSkin() {
        return this._currTubeSkin;
    }

    static get currThemeSkin() {
        return this._currThemeSkin;
    }

    // static observerRegister(observer) {
    //     this.observers.push(observer);
    // }

    // static observerUnregister(observer) {
    //     this.observers = this.observers.filter(item => item !== observer);
    // }

    // static _notify(id, state) {
    //     this.observers.forEach(observer => {
    //         if(observer.id === id) observer.emit(state);
    //     });
    // }

    static set Tube(id) {
        this._currTubeSkin.state = "unlocked";
        this._currTubeSkin = ThemeData[id - 1];
        this._currTubeSkin.state = "selected";
    }

    static set Theme(id) {
        this._currThemeSkin.state = "unlocked";
        this._currThemeSkin = TubeData[id - 1];
        this._currThemeSkin.state = "selected";
    }

    static buy(item) {
        item.onUnlocked();
        item.setState(ItemState.Unlocked);
    }

    static set(item) {
        item.setState(ItemState.Selected);
    }

    static get tubeData() {
        return TubeData;
    }

    static get themeData() {
        return ThemeData;
    }
}