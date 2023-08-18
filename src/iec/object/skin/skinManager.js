import TubeData from "../../../../assets/jsons/tubeData.json";
import ThemeData from "../../../../assets/jsons/backgroundData.json";
import { Data } from "../../../dataTest";
import { ItemState, ItemType } from "../../ui/shop/itemShop";

export class SkinManager {

    static init() {
        this.observers = [];
        this._currTubeSkin = TubeData[Data.tubeSkinId-1];
        this._currThemeSkin = ThemeData[Data.themeSkinId-1];
    }

    static get currTubeSkin() {
        return this._currTubeSkin;
    }

    static get currThemeSkin() {
        return this._currThemeSkin;
    }

    static addObserver(observer) {
        this.observers.push(observer);
    }

    static _notify() {
        this.observers.forEach(observer => {
            observer.emit("dataChange");
        });
    }

    static setState(id, type, state) {     
        if(type === ItemType.Tube) {
            TubeData[id-1].state = state;
        } else if (type === ItemType.Theme) {
            ThemeData[id-1].state = state;
        }
    }

    static buy(item) {
        item.onUnlocked();
        item.setState(ItemState.Unlocked);
        this.setState(item.id, item.type, ItemState.Unlocked);
    }

    static set(item) {
        item.setState(ItemState.Selected);    
        
        if(item.type == ItemType.Tube) {
            this.setState(Data.tubeSkinId, item.type, ItemState.Unlocked);
            Data.tubeSkinId = item.id;        
        } else if(item.type == ItemType.Theme) {
            this.setState(Data.themeSkinId, item.type, ItemState.Unlocked);
            Data.themeSkinId = item.id;
        }

        this.setState(item.id, item.type, ItemState.Selected);
        this._currTubeSkin = TubeData[Data.tubeSkinId-1];
        this._currThemeSkin = ThemeData[Data.themeSkinId-1];

        this._notify();
    }

    static get tubeData() {
        return TubeData;
    }

    static get themeData() {
        return ThemeData;
    }
}