import { TextureAtlas } from "@pixi-spine/base";
import { AtlasAttachmentLoader, SkeletonJson } from "@pixi-spine/runtime-3.8";
import { BaseTexture, Texture } from "pixi.js";
import assetData from "../dist/assetData.json";
import { Debug } from "./helpers/debug";
import { sound } from "@pixi/sound";
import { Assets } from '@pixi/assets';

export class AssetManager {
  static load(onLoaded) {
    this.loaded = false;
    this._onLoaded = onLoaded;
    this._loadTextures();
    this._loadSpines();
    this._loadAudios();
  }

  static _onOneAtlasLoaded(name) {
    Debug.log("AssetManager", "Loaded Atlas:", name);
    this._loadedAtlases++;
    if (this._loadedAtlases >= this.TOTAL_ATLASES) {
      this._allAtlasesLoaded = true;
      this._checkLoad();
    }
  }

  static _loadTextures() {
    let keys = Object.keys(assetData.textures);
    this._allTexturesLoaded = false;
    this.TOTAL_TEXTURES = keys.length;
    if (this.TOTAL_TEXTURES <= 0) {
      this._allTexturesLoaded = true;
      this._checkLoad();
    }

    this._loadedTextures = 0;
    keys.forEach((key) => {
      Assets.add(key, assetData.textures[key]);
    });
    var loader = Assets.load(keys);
    loader.then(textures => {
      Object.keys(textures).forEach(key => {
        this._onOneTextureLoaded();
      });
    });
  }

  static _onOneTextureLoaded() {
    this._loadedTextures++;
    if (this._loadedTextures >= this.TOTAL_TEXTURES) {
      this._allTexturesLoaded = true;
      this._checkLoad();
    }
  }

  static _loadTexture(key, data, onLoad) {
    let img = new Image();
    img.onload = () => {
      var baseTexture = new BaseTexture(img);
      var texture = new Texture(baseTexture);
      Texture.addToCache(texture, key);
      onLoad();
    };
    img.src = data;
  }

  static _onTextureImageLoaded(img, key) {
    var baseTexture = new BaseTexture(img);
    var texture = Texture.from(baseTexture);
    Texture.addToCache(texture, key);

  }

  static _loadSpines() {
    this.spines = {};
    this._allSpinesLoaded = false;
    let keys = Object.keys(assetData.spines);
    this.TOTAL_SPINES = keys.length;
    if (this.TOTAL_SPINES <= 0) {
      this._onSpineLoaded();
    }

    this._loadedSpines = 0;
    keys.forEach((key) => this._loadSpine(key, this._onOneSpineLoaded.bind(this)));
  }

  static _onOneSpineLoaded() {
    this._loadedSpines++;
    if (this._loadedSpines >= this.TOTAL_SPINES) {
      this._onSpineLoaded();
    }
  }

  static _onSpineLoaded() {
    this._allSpinesLoaded = true;
    this._checkLoad();
  }

  static _loadSpine(key, onLoad) {
    var rawSpineData = assetData.spines[key];
    this._loadTexture(key, rawSpineData.tex, () => {
      // eslint-disable-next-line no-undef
      var atlas = new TextureAtlas(rawSpineData.txt, function (path, callback) {
        callback(Texture.from(key));
      });
      // eslint-disable-next-line no-undef
      var spineAtlasLoader = new AtlasAttachmentLoader(atlas);
      // eslint-disable-next-line no-undef
      var spineJsonParser = new SkeletonJson(spineAtlasLoader);
      var spineData = spineJsonParser.readSkeletonData(rawSpineData.json);
      this.spines[key] = spineData;
      onLoad && onLoad();
    });
  }

  static _loadAudios() {
    let audios = {};
    this._allSoundLoaded = false;
    this._soundLoad = 0;
    this.totalSound = Object.values(assetData.audios).length;
    Object.entries(assetData.audios).forEach((sound) => {
      this._soundLoad += 1;
      if (this._soundLoad >= this.totalSound) {
        this._allSoundLoaded = true;
      }
      audios[`${sound[0]}`] = sound[1];
      this._checkLoad();
    });
    sound.add(audios);
  }

  static _checkLoad() {
    Debug.debug("AssetManager", "Check Load", this._allTexturesLoaded, this._allSoundLoaded, this._allSpinesLoaded);
    if (this._allTexturesLoaded && this._allSoundLoaded && this._allSpinesLoaded) {
      this.loaded = true;
      this._onLoaded && this._onLoaded();
    }
  }
}
