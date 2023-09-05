import { Debug } from "../src/helpers/debug.js";
import { EventEmitter } from "events";

export class UsersManager {
    static init() {
        this.emitter = new EventEmitter();
        this.abiGameSDK = window.AbigamesSdk;
    }

    static getUser() {

    }

    static getSystemInfor() {

    }

    static pushGameRank() {
        
    }
}