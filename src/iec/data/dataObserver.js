
export const EventData = Object.freeze({
    DataChanged: "dataChanged",
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

    static notify(...args) {
        this.observes.forEach(observe => {
            observe.emit(EventData.DataChanged, ...args);
        });
    }
}