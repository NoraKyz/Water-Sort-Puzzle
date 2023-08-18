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
    this.totalData = 4;
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
      this.getCurrentLevel();
      this.getAddTubeTimes();
      this.getUndoTimes();
      this.getCoins();
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
      // Game.emit(DataLocalEvent.Initialize);
    }
  }

  static getCurrentLevel() {
    this.getData(GameConstant.INDEXEDDB_CURRENT_LEVEL_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.currentLevel = GameConstant.PLAYER_DEFAULT_LEVEL;
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

  static getCoins() {
    this.getData(GameConstant.INDEXEDDB_COIN_KEY).then((value) => {
      if (typeof (value) === "undefined") {
        this.coin = GameConstant.PLAYER_DEFAULT_COIN;
        this.addData(GameConstant.INDEXEDDB_COIN_KEY, this.coin);
      }
      else {
        this.coin = value;
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
      data = parseFloat(value.toFixed(1));
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
}
