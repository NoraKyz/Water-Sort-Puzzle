import { GameConstant } from "./gameConstant";

export const DataType = Object.freeze({
    Coin: "coin",
});

export class Data {
    static init() {
        this.observes = [];
        this.addTubeTimes = 2;
        this.undoTimes = 5;
        this.currentLevel = 0;
        this.coin = 10000;
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

    static _notify() {
        this.observes.forEach(observe => {
            observe.emit("dataChange");
        });
    }

    static change(type, value) {
        switch (type) {
            case DataType.Coin: {
                this.coin += value;

                if (this.coin < 0) {
                    this.coin = 0;
                } else if (this.coin > GameConstant.MAX_COIN) {
                    this.coin = GameConstant.MAX_COIN;
                }
            }
        }

        this._notify();
    }
}