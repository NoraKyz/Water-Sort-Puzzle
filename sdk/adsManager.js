import { Debug } from "../src/helpers/debug.js";
import { EventEmitter } from "events";
import { Game } from "../src/game.js";

export const AdEvent = Object.freeze({
    AD_STARTED: "adStarted",
    AD_COMPLETED: "adCompleted",
    AD_ERROR: "adError",
});

export const AdBannerSize = Object.freeze({
    SIZE1: "300x250",
    SIZE2: "320x50",
    SIZE3: "728x90",
    SIZE4: "320x100",
    SIZE5: "468x60",
});

export class AdsManager {
    static init() {
        this.emitter = new EventEmitter();  
        this.abiGameSDK = window.AbigamesSdk;
        console.log(this.abiGameSDK);
    }

    static showBanner(elementId, bannerSize = AdBannerSize.SIZE4) {
        console.log(elementId);
        this.abiGameSDK.ads.displayBannerAds('300x250', elementId);
    }

    static hasAdblock(callback) {
        let hasAdblock = false;
        this.abiGameSDK.ads.hasAdblock().then((prm) => {
            hasAdblock = prm;
        }).catch((err) => {
            Debug.error("AdsManager", err);
        }).finally(() => {
            Debug.log("AdsManager", "hasAdblock: ", hasAdblock);
            callback && callback(hasAdblock);
        });
    }

    static showVideo(onStart, onFinished, onError) {
        this.abiGameSDK.ads.displayVideoAds({
            adStarted: () => {
                onStart && onStart();
                this.onAdStarted();
            },
            adFinished: () => {
                onFinished && onFinished();
                this.onAdFinished();
            },
            adError: () => {
                onError && onError();
                this.onAdError();
            },
        });
    }

    static onAdStarted() {
        Game.pause();
        this.emitter.emit(AdEvent.AD_STARTED);
    }

    static onAdFinished() {
        Game.resume();
        this.emitter.emit(AdEvent.AD_COMPLETED);
    }

    static onAdError(err) {
        console.error("AdsManager", err);
        this.emitter.emit(AdEvent.AD_ERROR, err);
    }
}