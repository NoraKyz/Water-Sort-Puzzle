import { GameConstant } from "../../gameConstant";
import { Debug } from "../../helpers/debug";
import { DataManager } from "./dataManager";
import { UserData } from "./userData";

export const DataLocalEvent = Object.freeze({
  Initialize: "initialized",
});

export const DataLocalState = Object.freeze({
  Loaded: "loaded",
  Loading: "loading",
  Unloaded: "unloaded",
});

export class DataLocal {
  static init() {
    if (!window.indexedDB) {
      Debug.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      return;
    }
    this.state = DataLocalState.Unloaded;
    this.dbName = GameConstant.INDEXEDDB_NAME;
    this.dbVersion = GameConstant.INDEXEDDB_VERSION;
    this.db = null;
    this.totalLoad = 0;
    this.totalData = 8;
    var request = window.indexedDB.open(this.dbName, this.dbVersion);
    request.onupgradeneeded = (event) => {
      this.db = event.target.result;
      if (!this.db.objectStoreNames.contains(GameConstant.INDEXEDDB_STORE_NAME)) {
        this.db.createObjectStore(GameConstant.INDEXEDDB_STORE_NAME);
      }
    };
    this.state = DataLocalState.Loading;
    request.onsuccess = (event) => {
      this.db = event.target.result;
      this.getCoins();
      this.getScore();
      this.getAddTubeTimes();
      this.getUndoTimes();
      this.getCurrentLevel();
      this.getListUnlockedLevels();
      this.getListThemeSkin();
      this.getListTubeSkin();
    };
    request.onerror = (event) => {
      Debug.error("error: ", event);
    };
  }

  static checkLoad() {
    this.totalLoad++;
    if (this.totalLoad >= this.totalData) {
      this.state = DataLocalState.Loaded;
      DataManager.init();
    }
  }

  static getCoins() {
    this.getData(GameConstant.INDEXEDDB_COIN_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.coins = GameConstant.PLAYER_DEFAULT_COIN;
        this.addData(GameConstant.INDEXEDDB_COIN_KEY, this.coins);
      }
      else {
        this.coins = value;
      }
      this.checkLoad();
    }).catch((error) => {
      console.error(error);
    });
  }

  static getScore() {
    this.getData(GameConstant.INDEXEDDB_SCORE_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.score = GameConstant.PLAYER_DEFAULT_SCORE;
        this.addData(GameConstant.INDEXEDDB_SCORE_KEY, this.score);
      }
      else {
        this.score = value;
      }
      this.checkLoad();
    }).catch((error) => {
      console.error(error);
    });
  }

  static getAddTubeTimes() {
    this.getData(GameConstant.INDEXEDDB_ADD_TUBE_TIMES_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.addTubeTimes = GameConstant.PLAYER_DEFAULT_ADD_TUBE_TIMES;
        this.addData(GameConstant.INDEXEDDB_ADD_TUBE_TIMES_KEY, this.addTubeTimes);
      }
      else {
        this.addTubeTimes = value;
      }
      this.checkLoad();
    }).catch((error) => {
      console.error(error);
    });
  }

  static getUndoTimes() {
    this.getData(GameConstant.INDEXEDDB_UNDO_TIMES_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.undoTimes = GameConstant.PLAYER_DEFAULT_UNDO_TIMES;
        this.addData(GameConstant.INDEXEDDB_UNDO_TIMES_KEY, this.undoTimes);
      }
      else {
        this.undoTimes = value;
      }
      this.checkLoad();
    }).catch((error) => {
      console.error(error);
    });
  }

  static getCurrentLevel() {
    this.getData(GameConstant.INDEXEDDB_CURRENT_LEVEL_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.currentLevel = GameConstant.PLAYER_DEFAULT_CURRENT_LEVEL;
        this.addData(GameConstant.INDEXEDDB_CURRENT_LEVEL_KEY, this.currentLevel);
      }
      else {
        this.currentLevel = value;
      }
      this.checkLoad();
    }).catch((error) => {
      console.error(error);
    });
  }

  static getListUnlockedLevels() {
    this.getData(GameConstant.INDEXEDDB_LIST_UNLOCKED_LEVEL_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.listUnlockedLevels = GameConstant.PLAYER_DEFAULT_UNLOCKED_LEVEL_LIST;
        this.addData(GameConstant.INDEXEDDB_LIST_UNLOCKED_LEVEL_KEY, this.listUnlockedLevels);
      }
      else {
        this.listUnlockedLevels = value;
      }
      this.checkLoad();
    }).catch((error) => {
      console.error(error);
    });
  }

  static getListThemeSkin() {
    this.getData(GameConstant.INDEXEDDB_LIST_THEME_SKIN_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.listThemeSkin = GameConstant.PLAYER_DEFAULT_THEME_SKIN_LIST;
        this.addData(GameConstant.INDEXEDDB_LIST_THEME_SKIN_KEY, this.listThemeSkin);
      }
      else {
        this.listThemeSkin = value;
      }
      this.checkLoad();
    }).catch((error) => {
      console.error(error);
    });
  }

  static getListTubeSkin() {
    this.getData(GameConstant.INDEXEDDB_LIST_TUBE_SKIN_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.listTubeSkin = GameConstant.PLAYER_DEFAULT_TUBE_SKIN_LIST;
        this.addData(GameConstant.INDEXEDDB_LIST_TUBE_SKIN_KEY, this.listTubeSkin);
      }
      else {
        this.listTubeSkin = value;
      }
      this.checkLoad();
    }).catch((error) => {
      console.error(error);
    });
  }

  static addData(key, value) {
    const userData = this.db.transaction(GameConstant.INDEXEDDB_STORE_NAME, "readwrite").objectStore(GameConstant.INDEXEDDB_STORE_NAME);
    var request = userData.add(value, key);
    request.onsuccess = () => {
      Debug.log("add success");
    };
    request.onerror = (err) => {
      Debug.error("add error", err);
    };
  }

  static getData(key) {
    return new Promise((resolve, reject) => {
      const userData = this.db.transaction(GameConstant.INDEXEDDB_STORE_NAME, "readwrite").objectStore(GameConstant.INDEXEDDB_STORE_NAME);
      let request = userData.get(key);
      request.onsuccess = (event) => {
        if (GameConstant.SAVE_DATA_ENABLED === true) {
          resolve(event.target.result);
        } else {
          resolve(undefined);
        }
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  static updateDataByKey(key, value) {
    if (GameConstant.SAVE_DATA_ENABLED === false) {
      return;
    }

    const userData = this.db.transaction(GameConstant.INDEXEDDB_STORE_NAME, "readwrite").objectStore(GameConstant.INDEXEDDB_STORE_NAME);
    const request = userData.get(key);

    request.onsuccess = (event) => {
      var data = event.target.result;
      data = value;
      const requestUpdate = userData.put(data, key);
      requestUpdate.onsuccess = () => {
        this[key] = data;
        Debug.log(`update ${key} success`);
      };
      requestUpdate.onerror = (err) => {
        Debug.error(`update ${key} error`, err);
      };
    };

    request.onerror = (event) => {
      Debug.error("error: ", event);
    };
  }
}
