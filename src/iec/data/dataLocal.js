import { GameConstant } from "../../gameConstant";
import { Debug } from "../../helpers/debug";
import { DataManager } from "./dataManager";
import { UserData } from "./userData";

export const DataLocalEvent = Object.freeze({
  Initialize: "initialized",
});

export const DataLocalState = Object.freeze({
  Loaded   : "loaded",
  Loading  : "loading",
  Unloaded : "unloaded",
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
    this.totalData = 6;
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
      this.getListGameplayParams();
      this.getListLevels();
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

  static getListGameplayParams() {
    this.getData(GameConstant.INDEXEDDB_LIST_GAMEPLAY_PARAMS_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.listGameplayParams = {};
        this.listGameplayParams[GameConstant.INDEXEDDB_ADD_TUBE_TIMES_KEY] = GameConstant.PLAYER_DEFAULT_ADD_TUBE_TIMES;
        this.listGameplayParams[GameConstant.INDEXEDDB_UNDO_TIMES_KEY] = GameConstant.PLAYER_DEFAULT_UNDO_TIMES;

        this.addData(GameConstant.INDEXEDDB_LIST_GAMEPLAY_PARAMS_KEY, this.listGameplayParams);
      }
      else {
        this.listGameplayParams = value;
      }
      this.checkLoad();
    }).catch((error) => {
      console.error(error);
    });
  }

  static getListLevels() {
    this.getData(GameConstant.INDEXEDDB_LIST_LEVEL_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.listLevels = [GameConstant.PLAYER_DEFAULT_LEVEL];
        this.addData(GameConstant.INDEXEDDB_LIST_LEVEL_KEY, this.listLevels);
      }
      else {
        this.listLevels = value;
      }
      this.checkLoad();
    }).catch((error) => {
      console.error(error);
    });
  }

  static getListThemeSkin() {
    this.getData(GameConstant.INDEXEDDB_LIST_THEME_SKIN_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.listThemeSkin = [GameConstant.PLAYER_DEFAULT_THEME_SKIN];
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
        this.listTubeSkin = [GameConstant.PLAYER_DEFAULT_TUBE_SKIN];
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
        resolve(event.target.result);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  static updateDataByKey(key, value) {
    const userData = this.db.transaction(GameConstant.INDEXEDDB_STORE_NAME, "readwrite").objectStore(GameConstant.INDEXEDDB_STORE_NAME);
    var request = userData.get(key);
    request.onsuccess = (event) => {
      var data = event.target.result;
      data = value;
      var requestUpdate = userData.put(data, key);
      requestUpdate.onsuccess = () => {
        Debug.log(`update ${ key } success`);
      };
      requestUpdate.onerror = (err) => {
        Debug.error(`update ${ key } error`, err);
      };
    };
    request.onerror = (event) => {
      Debug.error("error: ", event);
    };
  }

  static updateAllData() {
    this.updateDataByKey(GameConstant.INDEXEDDB_COIN_KEY, this.coins);
    this.updateDataByKey(GameConstant.INDEXEDDB_SCORE_KEY, this.score);
    this.updateDataByKey(GameConstant.INDEXEDDB_LIST_LEVEL_KEY, this.listLevels);
    this.updateDataByKey(GameConstant.INDEXEDDB_LIST_GAMEPLAY_PARAMS_KEY, this.listGameplayParams);
    this.updateDataByKey(GameConstant.INDEXEDDB_LIST_THEME_SKIN_KEY, this.listThemeSkin);
    this.updateDataByKey(GameConstant.INDEXEDDB_LIST_TUBE_SKIN_KEY, this.listTubeSkin);
  }
}
