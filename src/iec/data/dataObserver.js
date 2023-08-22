
export const EventData = Object.freeze({
    CurrentLevelChanged: "currentLevelChanged",
    TubeUnlocked: "skinUnlocked",
    TubeSelected: "skinSelected",
    ThemeUnlocked: "themeUnlocked",
    ThemeSelected: "themeSelected",
    CoinsChanged: "coinsChanged",
    GamePlayParamsChanged: "gamePlayParamsChanged",
});

export class DataObserver {
    static init() {
        this.observes = [];
    }

    static addObserver(observer) {
        this.observes.push(observer);
    }

    static removeObserver(observer) {
        let index = this.observes.indexOf(observer);
        if (index > -1) {
            this.observe.splice(index, 1);
        }
    }

    static notify(event, ...args) {
        this.observes.forEach(observe => {
            observe.emit(event, ...args);
        });
    }
}