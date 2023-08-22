import { DataLocal } from "./dataLocal";
import { UserData } from "./userData";
import LevelData from "../../../assets/jsons/levelData.json"
import { GameConstant } from "../../gameConstant";
import { DataObserver } from "./dataObserver";

export class DataManager {
    static init() {
        
        UserData.init();
        DataObserver.init();
    }

    static getLevelData(id = UserData.currentLevel) {
        return LevelData[id - 1];
    }

    static getTubeSkinData(id = UserData.currentTubeSkin) {
        return UserData.listTubeSkin[id - 1];
    }

    static getThemeSkinData(id = UserData.currentThemeSkin) {
        return UserData.listThemeSkin[id - 1];
    }

    static updateTubeData() {
        this.listTubeSkin.forEach((skin) => {
            let tubeData = this.getTubeSkinData(skin.id);
            if(skin.enabled) {
                tubeData.state = "selected";
            } else {
                tubeData.state = "unlocked";
            }
        });
    }

    static updateThemeData() {
        this.listThemeSkin.forEach((skin) => {
            let themeData = this.getThemeSkinData(skin.id);
            if(skin.enabled) {
                themeData.state = "selected";
            } else {
                themeData.state = "unlocked";
            }
        });
    }

    static nextLevel() {
        UserData.currentLevel += 1;
        UserData.listUnlockedLevels.push(UserData.currentLevel)

        DataLocal.updateDataByKey(GameConstant.INDEXEDDB_CURRENT_LEVEL_KEY, UserData.currentLevel);
        DataLocal.updateDataByKey(
            GameConstant.INDEXEDDB_LIST_UNLOCKED_LEVEL_KEY,
            UserData.listUnlockedLevels
        )
        DataObserver.notify();
    }

    static updateCoins(value) {
        UserData.coins += value;

        if (UserData.coins > GameConstant.MAX_COIN) {
            UserData.coins = GameConstant.MAX_COIN;
        }

        DataLocal.updateDataByKey(GameConstant.INDEXEDDB_COIN_KEY, UserData.coins);
        DataObserver.notify();
    }

    static unlockSkin(id, type) {
        let listSkin;

        if (type === GameConstant.TUBE_SHOP_NAME) {
            listSkin = this.listTubeSkin;
        } else if (type === GameConstant.THEME_SHOP_NAME) {
            listSkin = this.listThemeSkin;
        };

        listSkin.push({ id: id, enabled: false });

        this.updateToStorage();
        this._notify();
    }

    static skinSelected(id, type) {
        let currentSkin, listSkin;

        if (type === GameConstant.TUBE_SHOP_NAME) {
            currentSkin = this.currentTubeSkin;
            listSkin = this.listTubeSkin;
        } else if (type === GameConstant.THEME_SHOP_NAME) {
            currentSkin = this.currentThemeSkin;
            listSkin = this.listThemeSkin;
        };

        currentSkin.enabled = false;
        currentSkin = listSkin.find((skin) => skin.id === id);
        console.log(currentSkin);
        currentSkin.enabled = true;

        this.updateToStorage();
        this._notify();
    }

    static updateAddTubeTimes(value) {
        UserData.addTubeTimes += value;
        DataLocal.updateDataByKey(GameConstant.INDEXEDDB_ADD_TUBE_TIMES_KEY, UserData.addTubeTimes);
        DataObserver.notify();
    }

    static updateUndoTimes(value) {
        UserData.undoTimes += value;
        DataLocal.updateDataByKey(GameConstant.INDEXEDDB_UNDO_TIMES_KEY, UserData.undoTimes);
        DataObserver.notify();
    }
}
