import { ItemShop } from "./itemShop";

export class ThemeItem extends ItemShop {
    constructor(data) {
        super(data);
    }

    _initProperties() {
        super._initProperties();
        this.texture = this.data.bgSprite;
    }

    _onSelectedItem() {
        super._onSelectedItem();
        
    }
}