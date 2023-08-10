
export class ButtonManager {
    static init() {
        this.listButton = {};
    }

    static addButton(buttonName, button) {
        this.listButton[buttonName] = button;
    }

    static enableButton(buttonName) {
        this.listButton[buttonName].eventMode = "static";
    }

    static disableButton(buttonName) {
        this.listButton[buttonName].eventMode = "none";
    }
}
