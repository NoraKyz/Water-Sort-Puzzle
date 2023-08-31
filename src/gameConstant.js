import themeData from "../assets/jsons/themeData.json"
import tubeData from "../assets/jsons/tubeData.json"

export const GameConstant = Object.freeze({
  PLATFORM_ANDROID : "Android",
  PLATFORM_IOS     : "iOS",

  GAME_WIDTH              : 720,
  GAME_HEIGHT: 1280,
  MAX_FPS: 60, // lock 60FPS or 30FPS
  ANIMATION_FAIL_DURATION : 1,

  PLAY_SCENE  : "PlayScene",
  LOADING_SCENE: "LoadingScene",

  TOPBAR_SCREEN: "TopbarScreen",
  WIN_SCREEN   : "WinScreen",
  MENU_SCREEN  : "MenuScreen",
  SHOP_SCREEN  : "ShopScreen",
  LOADING_SCREEN: "LoadingScreen",
  LEVEL_SCREEN: "LevelScreen",

  DEBUG_ON            : true,
  DEBUG_DRAW_COLLIDER : false,
  SOUND_ENABLED       : true,
  SHOW_GAME_TAG       : false,
  SHOW_LIST_LEVEl    : true,
  SAVE_DATA_ENABLED   : true,

  LEVEL_OFFSET  : 1,
  HINT_TIME     : 3,
  UNDO_NUMBER_PER_LEVEL   : 5,
  UNDO_NUMBER_GET_BY_ADS  : 5,
  TUBE_NUMBER_GET_BY_ADS  : 1,
  MAX_TUBE_NUMBER         : 14,
  MAX_LEVEL               : 500,
  MAX_COIN                : 99999,
  COINS_PER_LEVEL         : 50,
  COINS_PER_ADS           : 500,
  COINS_PER_BUY_RANDOM    : 1200,

  REPLAY_BUTTON     : "ReplayButton",
  UNDO_BUTTON       : "UndoButton",
  MENU_BUTTON       : "MenuButton",
  ADD_TUBE_BUTTON   : "AddTubeButton",
  NEXT_LEVEL_BUTTON : "NextLevelButton",
  HINT_BUTTON       : "HintButton",
  SPEED_BUTTON      : "SpeedButton",

  TUBE_SHOP_NAME    : "Tube",
  THEME_SHOP_NAME   : "Theme",

  INDEXEDDB_NAME                          : "water_sort_puzzle",
  INDEXEDDB_VERSION                       : 1,
  INDEXEDDB_STORE_NAME                    : "userData",
  INDEXEDDB_COIN_KEY                      : "coins",
  INDEXEDDB_SCORE_KEY                     : "score",
  INDEXEDDB_ADD_TUBE_TIMES_KEY            : "addTubeTimes",
  INDEXEDDB_UNDO_TIMES_KEY                : "undoTimes",
  INDEXEDDB_CURRENT_LEVEL_KEY             : "currentLevel",
  INDEXEDDB_LIST_UNLOCKED_LEVEL_KEY       : "listUnlockedLevel",
  INDEXEDDB_LIST_THEME_SKIN_KEY           : "listThemeSkin", 
  INDEXEDDB_LIST_TUBE_SKIN_KEY            : "listTubeSkin", 
  
  PLAYER_DEFAULT_COIN                     : 10000,
  PLAYER_DEFAULT_SCORE                    : 0,
  PLAYER_DEFAULT_ADD_TUBE_TIMES           : 2,
  PLAYER_DEFAULT_UNDO_TIMES               : 5,
  PLAYER_DEFAULT_CURRENT_LEVEL            : 1,
  PLAYER_DEFAULT_UNLOCKED_LEVEL_LIST      : [1],
  PLAYER_DEFAULT_THEME_SKIN_LIST          : themeData,
  PLAYER_DEFAULT_TUBE_SKIN_LIST           : tubeData,
});
