import { ItemShop } from "./itemShop";

export class TubeItem extends ItemShop {
    constructor(data) {
        super(data);
    }

    _initProperties() {
        super._initProperties();
        this.texture = this.data.tubeSprite;
    }

    _onSelectedItem() {
        super._onSelectedItem();  
    }
}