export const GameConstant = Object.freeze({
  PLATFORM_ANDROID : "Android",
  PLATFORM_IOS     : "iOS",

  GAME_WIDTH              : 720,
  GAME_HEIGHT             : 1280,
  ANIMATION_FAIL_DURATION : 1,

  PLAY_SCENE  : "PlayScene",

  TOPBAR_SCREEN: "TopbarScreen",
  WIN_SCREEN   : "WinScreen",
  MENU_SCREEN  : "MenuScreen",
  SHOP_SCREEN  : "ShopScreen",

  DEBUG_ON            : true,
  DEBUG_DRAW_COLLIDER : false,
  SOUND_ENABLED       : true,
  SHOW_GAME_TAG       : false,

  LEVEL_OFFSET  : 1,
  LIQUID_HEIGHT : 70,
  HINT_TIME     : 3,
  UNDO_NUMBER_PER_LEVEL   : 5,
  UNDO_NUMBER_GET_BY_ADS  : 5,
  TUBE_NUMBER_GET_BY_ADS  : 1,
  MAX_TUBE_NUMBER         : 14,
  MAX_LEVEL               : 100,
  MAX_COIN                : 99999,
  COINS_PER_LEVEL         : 50,
  COINS_PER_ADS           : 500,
  COINS_PER_BUY_RANDOM    : 1200,

  REPLAY_BUTTON     : "ReplayButton",
  UNDO_BUTTON       : "UndoButton",
  MENU_BUTTON       : "MenuButton",
  ADD_TUBE_BUTTON   : "AddTubeButton",
  NEXT_LEVEL_BUTTON : "NextLevelButton",

  TUBE_SHOP_NAME    : "Tube",
  THEME_SHOP_NAME   : "Theme",

  INDEXEDDB_NAME                          : "water_sort_puzzle",
  INDEXEDDB_VERSION                       : 1,
  INDEXEDDB_STORE_NAME                    : "userData",
  INDEXEDDB_COIN_KEY                      : "coin",
  INDEXEDDB_SCORE_KEY                     : "score",
  INDEXEDDB_LIST_GAMEPLAY_PARAMS_KEY      : "listGameplayParams",
  INDEXEDDB_ADD_TUBE_TIMES_KEY            : "addTubeTimes",
  INDEXEDDB_UNDO_TIMES_KEY                : "undoTimes",
  INDEXEDDB_LIST_LEVEL_KEY                : "listLevel", // Unlocked
  INDEXEDDB_LIST_THEME_SKIN_KEY           : "listThemeSkin", // Unlocked
  INDEXEDDB_LIST_TUBE_SKIN_KEY            : "listTubeSkin", // Unlocked
  
  PLAYER_DEFAULT_COIN                     : { value : 10000 },
  PLAYER_DEFAULT_SCORE                    : { value : 0 },
  PLAYER_DEFAULT_ADD_TUBE_TIMES           : { value : 2 },
  PLAYER_DEFAULT_UNDO_TIMES               : { value : 5 },
  PLAYER_DEFAULT_LEVEL                    : { id: 1, enabled : true },
  PLAYER_DEFAULT_THEME_SKIN               : { id: 1, enabled : true },
  PLAYER_DEFAULT_TUBE_SKIN                : { id: 1, enabled : true },
});
