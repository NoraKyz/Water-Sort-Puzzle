import { Tween } from "../../systems/tween/tween"

export class ButtonManager {
    static init() {
        this.listButton = {};
    }

    static addButton(buttonName, button) {
        this.listButton[buttonName] = button;
    }

    static enable(buttonName) {
        this.listButton[buttonName].eventMode = "static";
    }

    static disable(buttonName) {
        this.listButton[buttonName].eventMode = "none";
    }

    static disableAll() {
        for (let buttonName in this.listButton) {
            this.disable(buttonName);
        }
    }

    static enableAll() {
        for (let buttonName in this.listButton) {
            this.enable(buttonName);
        }
    }

    static enableAllAfterDelay(timeSecond) {
        this.delay = Tween.createCountTween({
            duration: timeSecond,
            onStart: () => {
                this.disableAll();
            },
            onComplete: () => {
                this.enableAll();
            }
        });

        this.delay.start();
    }

}
