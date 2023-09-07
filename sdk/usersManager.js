import { Debug } from "../src/helpers/debug.js";
import { EventEmitter } from "events";

export class UsersManager {
    static init() {
        this.emitter = new EventEmitter();
        this.abiGameSDK = window.AbigamesSdk;
    }

    static getUser() {
        const callback = (user, error) => {
            if (error) {
                Debug.error("UsersManager", error);
            } else {
                Debug.log("UsersManager", user);
            }
        };

        this.abiGameSDK.user.getUser(callback);
    }

    static getSystemInfor() {
        const callback = (data, error) => {
            if (error) {
                Debug.error("UsersManager", error);
            } else {
                Debug.log("UsersManager", data);
            }
        };
        
        this.abiGameSDK.user.getSystemInfo(callback);
    }

    static pushGameRank(score) {
        const callback = (data, error) => {
            if (error) {
                Debug.error("UsersManager", error);
            } else {
                Debug.log("UsersManager", data);
            }
        };
        this.abiGameSDK.user.pushGameRank(score, callback);
    }
}