import { DataLocal } from "./dataLocal";
import { UserData } from "./userData";
import LevelData from "../../../assets/jsons/levelData.json"
import { GameConstant } from "../../gameConstant";
import { DataObserver, EventData } from "./dataObserver";
import { ItemType } from "../ui/shop/itemShop";

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

    static startLevel(id) {
        UserData.currentLevel = id;
        DataLocal.updateDataByKey(GameConstant.INDEXEDDB_CURRENT_LEVEL_KEY, UserData.currentLevel);

        if (UserData.listUnlockedLevels.find((level) => level === id) === undefined) {
            UserData.listUnlockedLevels.push(UserData.currentLevel)
            DataLocal.updateDataByKey(
                GameConstant.INDEXEDDB_LIST_UNLOCKED_LEVEL_KEY,
                UserData.listUnlockedLevels
            )
        }

        DataObserver.notify(EventData.CurrentLevelChanged);
    }

    static nextLevel() {
        UserData.currentLevel += 1;
        if(UserData.currentLevel > GameConstant.MAX_LEVEL) {
            UserData.currentLevel = GameConstant.MAX_LEVEL;
        }
        DataLocal.updateDataByKey(GameConstant.INDEXEDDB_CURRENT_LEVEL_KEY, UserData.currentLevel);
        
        if (UserData.listUnlockedLevels.find((level) => level === UserData.currentLevel) === undefined) {
            UserData.listUnlockedLevels.push(UserData.currentLevel)
            DataLocal.updateDataByKey(
                GameConstant.INDEXEDDB_LIST_UNLOCKED_LEVEL_KEY,
                UserData.listUnlockedLevels
            )
        }

        DataObserver.notify(EventData.CurrentLevelChanged);
    }

    static updateCoins(value) {
        UserData.coins += value;

        if (UserData.coins > GameConstant.MAX_COIN) {
            UserData.coins = GameConstant.MAX_COIN;
        }

        DataLocal.updateDataByKey(GameConstant.INDEXEDDB_COIN_KEY, UserData.coins);
        DataObserver.notify(EventData.CoinsChanged);
    }

    static unlockSkin(item) {
        if (item.type === ItemType.Tube) {
            UserData.listTubeSkin.find((skin) => skin.id === item.id).state = "unlocked";
            DataLocal.updateDataByKey(
                GameConstant.INDEXEDDB_LIST_TUBE_SKIN_KEY,
                UserData.listTubeSkin
            );
            DataObserver.notify(EventData.TubeUnlocked);
        } else if (item.type === ItemType.Theme) {
            UserData.listThemeSkin.find((skin) => skin.id === item.id).state = "unlocked";
            DataLocal.updateDataByKey(
                GameConstant.INDEXEDDB_LIST_THEME_SKIN_KEY,
                UserData.listThemeSkin
            );
            DataObserver.notify(EventData.ThemeUnlocked);
        }
    }

    static skinSelected(item) {
        if (item.type === ItemType.Tube) {
            UserData.listTubeSkin[UserData.currentTubeSkin - 1].state = "unlocked";
            UserData.currentTubeSkin = item.id;
            UserData.listTubeSkin.find((skin) => skin.id === item.id).state = "selected";
            DataLocal.updateDataByKey(
                GameConstant.INDEXEDDB_LIST_TUBE_SKIN_KEY,
                UserData.listTubeSkin
            );
            DataObserver.notify(EventData.TubeSelected);
        } else if (item.type === ItemType.Theme) {
            UserData.listThemeSkin[UserData.currentThemeSkin - 1].state = "unlocked";
            UserData.currentThemeSkin = item.id;
            UserData.listThemeSkin.find((skin) => skin.id === item.id).state = "selected";
            DataLocal.updateDataByKey(
                GameConstant.INDEXEDDB_LIST_THEME_SKIN_KEY,
                UserData.listThemeSkin
            );
            DataObserver.notify(EventData.ThemeSelected);
        }
    }

    static updateAddTubeTimes(value) {
        UserData.addTubeTimes += value;
        DataLocal.updateDataByKey(GameConstant.INDEXEDDB_ADD_TUBE_TIMES_KEY, UserData.addTubeTimes);
        DataObserver.notify(EventData.GamePlayParamsChanged);
    }

    static updateUndoTimes(value) {
        UserData.undoTimes += value;
        DataLocal.updateDataByKey(GameConstant.INDEXEDDB_UNDO_TIMES_KEY, UserData.undoTimes);
        DataObserver.notify(EventData.GamePlayParamsChanged);
    }
}
